import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleCase.css"; // Make sure the CSS file is imported

const SingleCase = () => {
  const { caseId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [audios, setAudios] = useState([]); // Array to store audio files and dates
  const [audioFile, setAudioFile] = useState(null);
  const [audioDate, setAudioDate] = useState("");
  const [isIdMatch, setIsIdMatch] = useState(false);
  const [transcriptionData, setTranscriptionData] = useState([]);
  const [caseData, setCaseData] = useState({
    plaintiffLawyer: "John Doe",
    defendantLawyer: "Jane Smith",
    plaintiffName: "Alice Johnson",
    defendantName: "Bob Brown",
    judgeName: "Judge Judy",
    typeOfCourt: "Civil Court",
    typeOfCase: "Contract Dispute",
    caseDescription: "Case of breach of contract",
    hearingDate: "15/04/2024",
    caseNumber: "12345ABC",
  });

  const testUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    const resp = await fetch("http://localhost:5000/govt/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Corrected typo here
      },
      body: JSON.stringify({ token: token }), // Pass token as an object property
    });
    const data = await resp.json();
    console.log(data);
    console.log(data.User._id);
    console.log(caseData.ownerId);
    if (data.User._id == caseData.ownerId) {
      setIsIdMatch(true);
      console.log(isIdMatch);
    } else {
      setIsIdMatch(false);
      console.log(isIdMatch);
    }
  };

  const getCase = async () => {
    const resp = await fetch(
      `http://localhost:5000/cases/getCaseById/${caseId}`,
      {
        method: "GET",
      }
    );
    const data = await resp.json();
    console.log(data);
    setCaseData(data);
    setTranscriptionData(data.transcription);
    // console.log(data.transcription);

    const viewresp = await fetch("http://localhost:5000/cases/addViews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ caseId }),
    });

    // summarizeCase()
  }

  const handleDateChange = (event) => {
    setAudioDate(event.target.value);
  };

  const summarizeCase = async () => {
    const allTranscript = []
    if (transcriptionData != null) {
      for (var i = 0; i < transcriptionData.length; i++) {
        var textArr = transcriptionData[i].text;
        for (var j = 0; j < textArr.length; j++) {
          var obj = textArr[j]
          allTranscript.push(obj)
        }
      }
    }

    console.log(allTranscript)

    const resp = await fetch("http://localhost:5000/govt/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transcript: allTranscript
      })
    })

    const data = await resp.json();
    console.log(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`http://localhost:5000/cases/getCaseById/${caseId}`);
      const caseDetails = await resp.json();
      setCaseData(caseDetails);
      setTranscriptionData(caseDetails.transcription || []);

      const viewResponse = await fetch("http://localhost:5000/cases/addViews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caseId }),
      });

      // Assuming this fetch checks user's access rights
      const userResp = await fetch("http://localhost:5000/govt/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem("token")) }),
      });
      const userData = await userResp.json();
      setIsIdMatch(userData.User._id === caseData.ownerId);
    };

    fetchData();
  }, [caseId]);

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAudioData = {
      file: audioFile,
      date: audioDate,
      url: URL.createObjectURL(audioFile),
      summary: "Generated summary of the audio will appear here.", // Placeholder summary
    };
    setAudios([...audios, newAudioData]);
    setAudioFile(null);
    setAudioDate("");
    setEditMode(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="single-case">
      <div className="left-side">
        {/* Left side content: case details and transcriptions */}
        <div className="case-details">
          <h1 className="case-details-title">Case Details</h1>
          {Object.entries(caseData).map(([key, value]) => {
            if (key !== "transcription" && key !== "ownerId" && key !== "_id" && key !== "__v") {
              return (
                <p className="case-detail" key={key}>
                  <strong>{`${key.replace(/([A-Z])/g, ' $1').trim()}:`}</strong> {value}
                </p>
              );
            }
            return null; // Skip rendering for certain keys
          })}
        </div>

        {transcriptionData.map((entry, index) => (
          <div key={index} className="transcript-item" id={`transcription-${index}`}>
            <h2>Transcription for {formatDate(entry.createdAt)}</h2>
            <div>
              {entry.text.map((textItem, textIndex) => (
                <p key={textIndex}>
                  <strong>Speaker:</strong> {textItem.speaker}<br />
                  <strong>Text:</strong> {textItem.text}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Edit mode for uploading new transcriptions */}
        {editMode && (
          <form onSubmit={handleSubmit} className="form-container">
            <label htmlFor="audioUpload">Upload Audio File:</label>
            <input
              type="file"
              id="audioUpload"
              accept="audio/*"
              onChange={handleFileChange}
            />
            <label htmlFor="audioDate">Audio Date:</label>
            <input
              type="date"
              id="audioDate"
              value={audioDate}
              onChange={(e) => setAudioDate(e.target.value)}
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
      </div>
      <div className="right-side">
        {/* Right side content: clickable transcription headings */}
        {transcriptionData.map((entry, index) => (
          <a
            key={index}
            className="transcription-link"
            onClick={() => document.getElementById(`transcription-${index}`).scrollIntoView({ behavior: 'smooth' })}
          >
            Transcription for {formatDate(entry.createdAt)}
          </a>
        ))}
      </div>
    </div>
  );

};

export default SingleCase;
