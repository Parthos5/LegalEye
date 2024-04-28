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

@app.route("/summarize",methods=["POST"])
def summarize_model():
    try:
        print("hello")
        article = """
        Plaintiff Lawyer: Your client clearly breached the contract by failing to deliver the agreed-upon goods by the specified deadline.
        Defendant Lawyer: Our client encountered unforeseen circumstances that made it impossible to meet the deadline stipulated in the contract.
        Plaintiff Lawyer: Regardless of the circumstances, the contract explicitly states the timeline for delivery, which your client failed to adhere to.
        Defendant Lawyer: We understand the importance of timelines, but we believe the circumstances constitute force majeure, relieving our client of liability in this instance.
        Plaintiff Lawyer: Your client had a duty to communicate any issues that arose and seek alternative solutions to fulfill their obligations under the contract.
        Defendant Lawyer: Our client did communicate the challenges they faced and made efforts to mitigate the impact on the delivery schedule, but the circumstances were beyond their control.
        Plaintiff Lawyer: Nevertheless, the failure to deliver as agreed has caused significant financial losses to our client, and we expect appropriate compensation to remedy the breach of contract.
        Defendant Lawyer: We sympathize with the losses incurred by your client, but we maintain that the force majeure clause in the contract exempts our client from liability in this situation.
        """
        summarizer = pipeline('summarization')
        return jsonfiy({"summarisation":summarizer(article,max_length=100,min_length=30,do_sample=False)})
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(port=8080)