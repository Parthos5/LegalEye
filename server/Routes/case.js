const express = require("express");
const router = express.Router();
const fs = require('fs');
const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');
const multer = require('multer');
const { Readable } = require('stream');
const Govt = require("../models/Govt");
const Case = require("../models/Case");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/getAllCases", async (req, res) => {
  try {
    const cases = await Case.find({});

    if (!cases) {
      return res.status(404).json({ message: "Cases not found." });
    }

    res.status(200).json(cases);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/getCasesByUser", async (req, res) => {
  try {
    const { govtId } = req.body;
    if (!govtId) {
      return res.status(404).json({ message: "No such user" });
    }
    const cases = await Case.find({ ownerId: govtId }); // Assuming govtId is the field in your schema

    res.status(200).json({ cases })

    // const cases = await Case.findById();
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/getCaseById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const caseReqd = await Case.findById(id);
    if (!caseReqd) {
      return res.status(404).json({ message: "Case not found." });
    }
    res.status(200).json(caseReqd);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/uploadDrive",upload.single('audio'),async (req,res) => {
  console.log(req.file)
  const audioData = req.file.buffer;
  console.log('File buffer content:', req.file.buffer);
  const auth = new google.auth.GoogleAuth({
    credentials: {
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
},
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  // Create a drive instance
  try {
    const client = await auth.getClient();

    // Create a drive instance
    const drive = google.drive({ version: 'v3', auth: client });

    // Upload file
    const fileMetadata = {
      name: 'MyAudio.mp3', // You can specify the filename here
      mimeType: 'audio/mp3', // Change the MIME type if needed
      visibility: 'public',
    };

    // Create a readable stream from the buffer data
    const audioStream = new Readable();
    audioStream.push(audioData);
    audioStream.push(null); // Signals the end of the stream

    const media = {
      mimeType: 'audio/mp3', // Change the MIME type if needed
      body: audioStream,
    };

    const uploadedFile = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
      // uploadType: 'multipart',
    });
    const fileId = uploadedFile.data.id;

    // Set permissions to allow public access
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    console.log('File uploaded, File Id:', fileId);
    const fileUrl = uploadedFile.data.webViewLink;
    res.status(200).json({ fileId: fileId, fileUrl: fileUrl});
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file to Google Drive');
  }
})

module.exports = router;
