import React, { useState, useEffect, useRef } from "react";
import "./UploadTranscription.css";
import Meyda from "meyda";

export default function UploadTranscription() {
  const [audioBlob, setAudioBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [transcription, setTranscription] = useState([]);
  const canvasRef = useRef(null); // Add a ref for the canvas element

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let raf;
    let audioContext;

    if (raf) {
      cancelAnimationFrame(raf);
    }

    const numberOfSides = 512;
    const size = 100;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const lineWidth = 10;
    const lineColor = "#8B4513"; // Light red brownish wood color
    const backgroundColor = "transparent"; // Transparent background
    const audioAmplifier = 100;

    // Set canvas background color
    canvas.style.backgroundColor = backgroundColor;

    /*
     * Draw the Circle Waveform based on the audio buffer from meyda
     */
    function draw(buffer) {
      if (buffer === undefined || buffer === null) {
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        return;
      }

      ctx.beginPath();

      // Create audio-reactive polygons
      for (var i = 0; i < numberOfSides; i++) {
        const audioValue = buffer[i] * audioAmplifier;
        const cos = Math.cos((i * 2 * Math.PI) / numberOfSides);
        const sin = Math.sin((i * 2 * Math.PI) / numberOfSides);
        const x1 = x + size * cos - audioValue; // * (i % 2 === 1 ? -1: 1)
        const y1 = y + size * sin + (i % 2 === 1 ? audioValue : 0);

        if (i === 0) {
          ctx.moveTo(x1, y1);
        } else {
          ctx.lineTo(x1, y1);
        }
      }

      ctx.closePath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    /**
     * Smooth out the audio buffer data
     * @param {Float32Array} buffer - The original audio buffer data
     * @param {number} windowSize - The size of the moving average window
     * @returns {Float32Array} - The smoothed audio buffer data
     */
    function smoothBuffer(buffer, windowSize) {
      const smoothedBuffer = new Float32Array(buffer.length);

      for (let i = 0; i < buffer.length; i++) {
        let sum = 0;
        let count = 0;

        // Calculate the average of nearby samples within the window
        for (
          let j = Math.max(0, i - Math.floor(windowSize / 2));
          j <= Math.min(buffer.length - 1, i + Math.floor(windowSize / 2));
          j++
        ) {
          sum += buffer[j];
          count++;
        }

        // Assign the average value to the smoothed buffer
        smoothedBuffer[i] = sum / count;
      }

      return smoothedBuffer;
    }

    /**
     * - Get the mic input
     * - Setup audioContext to use with Meyda
     * - Create a rAF loop that calls draw()
     */
    (async function () {
      let stream = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
          },
        });
      } catch (err) {
        throw new Error(err);
      }

      if (audioContext) audioContext.close();
      audioContext = new AudioContext({
        latencyHint: "interactive",
      });

      const source = audioContext.createMediaStreamSource(stream);

      const meyda = new Meyda.createMeydaAnalyzer({
        audioContext,
        source,
        bufferSize: numberOfSides,
        windowingFunction: "rect",
      });

      const loop = (delta) => {
        raf = requestAnimationFrame(loop);

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        const buffer = meyda.get("buffer");

        // Smooth out the audio buffer data with a window size of 5
        const smoothedBuffer = smoothBuffer(buffer, 5);

        draw(smoothedBuffer);
      };

      raf = requestAnimationFrame(loop);
    })();
  }, []);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/mp3" });
          setAudioBlob(blob);
        };
        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleUpload = async () => {
    // Handle file upload and transcription
    if (audioBlob) {
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.mp3");
      const resp = await fetch("http://localhost:5000/cases/uploadDrive", {
        method: "POST",
        body: formData,
      });
      const data = await resp.json();
      const transcriptReq = await fetch("http://localhost:8080/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_url: data.directDownloadLink }),
      });
      const transcript = await transcriptReq.json();
      setTranscription(transcript.transcript);
    } else {
      console.error("No audio recorded");
    }
  };

  return (
    <div className="transcriptContainer">
      <div className="audioControls">
        <button onClick={startRecording} disabled={recording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!recording}>
          Stop Recording
        </button>
        <button onClick={handleUpload} disabled={!audioBlob}>
          Transcript
        </button>
        {audioBlob && (
          <div>
            <audio controls>
              <source src={URL.createObjectURL(audioBlob)} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} id="output" width="400" height="400"></canvas>
      {transcription.map((item, index) => (
        <p key={index}>
          <strong>Speaker {item.speaker}: </strong>
          {item.text}
        </p>
      ))}
    </div>
  );
}
