from flask import Flask, request, jsonify
import assemblyai as aai
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# AssemblyAI API key
aai.settings.api_key = "f43bf3801db444859001ba968f5133c6"

@app.route("/transcribe", methods=["POST"])
def transcribe_audio():
    try:
        data = request.json
        file_url = data.get("file_url")

        if not file_url:
            return jsonify({"error": "File URL is missing"}), 400

        config = aai.TranscriptionConfig(speaker_labels=True)
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(file_url, config=config)

        # Extract speaker labels and text from the transcript
        results = [{"speaker": u.speaker,"text": u.text} for u in transcript.utterances]

        return jsonify({"transcript": results}), 200
    
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500

@app.route("/summarize", methods=["POST"])
def summarize_model():
    try:
        data = request.json  # Get JSON data from the request
        article = data.get("transcript", "")  # Get the transcript text from the JSON data
        if not article:
            return jsonify({"error": "Transcript not provided"}), 400  # Return error if transcript is not provided

        summarizer = pipeline('summarization')
        summary = summarizer(article, max_length=100, min_length=30, do_sample=False)
        return jsonify({"summary": summary})
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(port=8080)