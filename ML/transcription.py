from flask import Flask, request, jsonify
import assemblyai as aai
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import io
app = Flask(__name__)

# AssemblyAI API key
aai.settings.api_key = "f43bf3801db444859001ba968f5133c6"

@app.route("/transcribe", methods=["POST"])
def transcribe_audio():
    try:
        # data = request.json
        # audio_data = data.get("audio_data")
        print(request.files)
        print(request)
        # print(request.data)
        files = request.files.getlist('file')
    
        for file in files:
        # Print the file name and its content
          print("File name:", file.filename)
        # You can also print other properties like file content type, size, etc.
        # For example:
        # print("Content type:", file.content_type)
        # print("Size:", len(file.read()))
        if 'audio_data' not in request.data:
            return jsonify({"error": "No audio file provided"}), 400

        audio_data = request.data['audio_data']
        if not audio_data:
            return jsonify({"error": "Audio data is missing"}), 400
        
         # Convert the audio data to a bytes-like object
        # audio_bytes = io.BytesIO(audio_data)
        # Upload the audio file to Google Drive
        creds = service_account.Credentials.from_service_account_info(
            {
                {
  "type": "service_account",
  "project_id": "realestate-388609",
  "private_key_id": "40856013d4606a7c7d1d1ece3cae5b8ca7c3646e",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDrn/eVk0eplPey\nv2z7GqfdnuDRjgNEiHRo1vO/aiU5AG3w5p0mfU4sUL4OrkMWNdWsV39CWu40IE/W\nLn8wGbzEp+FfUc//GZLrfXO8NcVoehE1JWbvIdWsJ7DhbaLQECzdZ5vY6r+ChtGp\ncLyTBgta19ndWfmaZ/n4gDtXIZhuug/uiHF1SmFi+CPke9nUu3k2raNU6qGZ/oDG\nj7AimRCCoxER5dNvf3Tf9xp2ESvMaHnZRhSDMV269RMPlRY6pdOB1gj99VeQ0TU8\n6HQPQwo/AzJksfRDzsCkuJMuhFW/13JpWZkGEteXiXUnV1V6nCRT8huUIHjp+OQ6\nRw92Wyw9AgMBAAECggEAaAa6AhmB/Aa+zPXioYIFNr0cOKhgHPO5oUe1WX79bAsa\nfs7x9ro/tyT2o/ifucCO04XVs2/91pmlZcQldxEF3DTaNYEjOVcLHFjIrgF3ZEbw\nLeyTY2Qmt9jWKNCEnyNlC2Lg1YXegzwOeKZDOw3iGXtOvoEox9i77dB/Ylp8t/Uo\ndvocyn1H7rWiU1htyxbCUG4tRE26m5sPXB5Itjlcg3rx09e5u3KvEwVKZMTM7v5+\nVf6HMm+XJsfveNg+7UiP6t/677Ta3t13m5XH3FM3ALGpVmcAB6wbJ5Rj1bk2c5QG\nWlGp0eklAfeWI5c5Pv6roXHyxldTchDSuG6fR8g5qQKBgQD9Zrk5hDttZsgEkbbu\nZiXZKZR6zJ/Onjrc3+799DvkXxpgMhqkt0rKAhpTPL7Hcn7J3dtRiHqeE3ODA6Zg\nN3TxwKDg5iNAFzDm6mrGRdzt3cSPIrumh1H15mzk9E29YcMESsfZVF7EvIjCb/OL\nXyEFBP9M1N4L5xfmE5435PcFBwKBgQDuCpLchYpN5U/FNZ4+uovPPAEqfgmt3UKd\nPKqG/+4yoCZqok5Tw3BL5db/Or6etm4AkBYmMG4l3CPzmCLO8xMto0SSLhVY06zi\nGvNJpbKYtXgYNM+5SIKkT8Ye258xAFxKvkC84mSKzZWWLk8PitbQhvnZM9qXQXKV\nfTIyV4yXmwKBgQDz29ByvoNmNBxW8VfHMvxHcZFXX+aGs5VYDBT1xf2BN9itLGqh\ni1bo8n8dDX9XdyL2549xdlLyHyvxsCiDvbrIECWCaVcRDYBdKMiaiI8lRl8rlDRb\n/Svt5dNzvnu1vggr8D9FMcGFuR4vaAdLX7/qEbYS3WPWto00ODrx9WGXLwKBgFGj\n5LynPEj9Bb/gZNakykCYFtpJAe7UfP1Kij3k1wAb9zEJW43U8NXHDVbaAfiTHuUo\nhcAxSgXIG7h3DDEoIwK7BVCRZ5bgemHN1nUC1F8VlgvPSRMF8HCEP7HjpxR6SC0G\nVVOy3cLRQaWRWmI9PvGj6Vr6MtU/iBoHJ0kmx7xTAoGBAOaX1JMU03gZ1s33YHBu\nOdOcJ2FQ0umPT+PCgIT5Wd9+S6U788IMf8yAk/dnop0Q6elHvK19Ihr4hYxH5gts\n4W6Q9miWWm9eau9WiCyXBek+FI/ASG98HaUHiVEsanc+wc+8bQ+PJlmKPRUkBT36\nfdtXUv5d9kYfzzs9qMmLaexb\n-----END PRIVATE KEY-----\n",
  "client_email": "legal-eye@realestate-388609.iam.gserviceaccount.com",
  "client_id": "109023414753036348979",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/legal-eye%40realestate-388609.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

            }
        )
        drive_service = build('drive', 'v3', credentials=creds)
        file_metadata = {'name': 'audio.mp3'}
        media = MediaFileUpload(audio_data, mimetype='audio/mpeg', resumable=True)
        file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        file_url = f"https://drive.google.com/uc?export=view&id={file.get('id')}"

        # Print the file URL
        print(f"Uploaded file URL: {file_url}")

        if not file_url:
            return jsonify({"error": "File URL is missing"}), 400

        config = aai.TranscriptionConfig(speaker_labels=True)
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(file_url, config=config)

        # Extract speaker labels and text from the transcript
        results = [{"speaker": u.speaker, "text": u.text} for u in transcript.utterances]

        return jsonify({"transcript": results}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(port=8080)