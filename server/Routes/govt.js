const express = require("express");
const router = express.Router();

const Govt = require("../models/Govt");
const Case = require("../models/Case");

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const govtUser = await Govt.findOne({ username });

    console.log(govtUser);

    if (!govtUser) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    const passwordMatch = await bcrypt.compare(password, govtUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    const token = jwt.sign(
      { govtId: govtUser._id, username: govtUser.username },
      secretKey
    );

    // Set the JWT token in the response header
    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({ token, govtId: govtUser._id, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Authentication failed." });
  }
});

router.post("/uploadCase", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    //verifying token
    const decodedToken = jwt.verify(token, secretKey);
    console.log(decodedToken);
    //extract govtId
    const govtId = decodedToken.govtId;

    const newCase = new Case({
      categoryCode: req.body.categoryCode,
      category: req.body.category,
      subCategory: req.body.subCategory,
      // transcription: transcription.push({
      //     text: req.transcription.text,
      //     notes: req.transcription.notes
      // }),
      transcription: [],
      ownerId: govtId,
    });

    const savedCase = await newCase.save();

    res.status(200).json(savedCase);
  } catch (error) {
    console.log(error);
  }
});

router.post("/uploadTranscript", async (req, res) => {
  let caseId = req.body.caseId;
  let theCase = await Case.findById(caseId);
  // let text from ml model;
  // let date.now();
  console.log(theCase);
  var transcriptionArr = theCase.transcription || [];

  transcript_obj = {
    text: req.body.text,
  };

  transcriptionArr.push(transcript_obj);
  theCase.transcription = transcriptionArr;

  await theCase.save();

  res.status(200).json({ message: "this is upload transcript route" });
  // // fetch transcript array
  // let transcriptArr;
  // let text = mlmodel;
  // transcriptArr.append(mlmodel)
});

router.put("/updateCase", (req, res) => {
  res.status(200).json({ message: "this is update case route" });
});

router.post("/deleteCase", async (req, res) => {
  try {
    const { caseId, govId } = req.body;
    let theCase = await Case.findById(caseId);
    if (!theCase) {
      res.status(400).json({ Error: "Case Not Found!" });
    }
    if (!caseId.ownerId.toString() == govId.toString()) {
      res.status(400).json({ Error: "Not Authorized" });
    }

    await theCase.delete();
    res.status(200).json({ Success: "Case Deleted", Case: theCase });
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

module.exports = router;
//hi