const express = require("express");
const router = express.Router();

const Govt = require("../models/Govt");
const Case = require("../models/Case");

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;
const bcrypt = require("bcrypt");

// router.post("/getUser",async (req,res) => {
//   try{
//     const {username} = req.body;
//     const govtUser = await Govt.findOne({ username });
    
//     if (!govtUser) {
//       return res.status(401).json({ error: "Authentication failed." });
//     }
//   }
// })

router.post("/signup", async (req, res) => {

  let user = await Govt.findOne({ username: req.body.username })
  if (user) {
      return res.status(400).send("Registration failed: User already exists!")
  } else {
      try {
          const salt = await bcrypt.genSalt(10)
          const password = await bcrypt.hash(req.body.password, salt)
          const newUser = new Govt({
              username: req.body.username,
              email: req.body.email,
              password: password,
              casesList:[]
          })
          await newUser.save()
          return res.status(201).json(newUser)
      } catch (err) {
          return res.status(400).json({ message: err.message })
      }
  }
})
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
    const {categoryCode,category,subCategory,caseDescription} = req.body;
    const token = req.headers.authorization;

    //verifying token
    const decodedToken = jwt.verify(token, secretKey);
    console.log(decodedToken);
    //extract govtId
    const govtId = decodedToken.govtId;

    const newCase = new Case({
      categoryCode: categoryCode,
      category: category,
      subCategory: subCategory,
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

router.put("/updateCase", async (req, res) => {
  try {
    const { caseDescription, caseId } = req.body;
    if (!caseDescription || !caseId) {
      res.status(400).json({ Error: "Missing data" });
    }

    const caseObj = await Case.findById(caseId);
    if (!caseObj) {
      res.status(400).json({ Error: "Case Not Found" });
    }

    if (caseDescription != "") {
      caseObj.caseDescription = caseDescription;
    }
    caseObj.save();
    res.status(200).json({ Success: true, Updated_case: caseObj });
  } catch (err) {
    res.status(200).json({ Error: err });
  }
  res.status(200).json({ message: "this is update case route" });
});

router.post("/deleteCase", async (req, res) => {
  try {
    const { caseId, govId } = req.body;
    let theCase = await Case.findById(caseId);
    if (!theCase) {
      res.status(400).json({ Error: "Case Not Found!" });
    }
    if (!(theCase.ownerId == govId)) {
      res.status(400).json({ Error: "Not Authorized" });
    }
    await theCase.deleteOne();
    res.status(200).json({ Success: "Case Deleted", Case: theCase });
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

module.exports = router;