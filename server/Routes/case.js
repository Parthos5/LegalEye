const express = require("express");
const router = express.Router();

const Govt = require("../models/Govt");
const Case = require("../models/Case");

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

module.exports = router;
