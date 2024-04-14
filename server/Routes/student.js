const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

const verifyStudentId = require("../controllers/authCtrl");

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { username, email, password, referralCode } = req.body;

  let user = await Student.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("Registration failed: User already exists!");
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const crypt_password = await bcrypt.hash(password, salt);
      const newUser = new Student({
        username: username,
        email: email,
        password: crypt_password,
      });
      await newUser.save();
      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
});

router.post("/login", async (req, res) => {
    try {
      // Find the user by username
      const user = await Student.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json({ message: "Incorrect credentials" });
      }
  
      // Compare passwords
      const correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPassword) {
        return res.status(400).json({ message: "Incorrect credentials" });
      }
  
      // If passwords match, generate JWT token
      const token = jwt.sign(
        { studentId: user._id, username: user.username },
        secretKey
      );
  
      // Respond with token and user ID
      res.json({ message: "Successfully logged in", token, userId: user.userId });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  });  

router.post("/bookmark", async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        //verifying token
        const decodedToken = jwt.verify(token, secretKey)
        console.log(decodedToken)

        const studentId = decodedToken.studentId

        // verifyStudentId()

        const { caseId } = req.body

        const student = await Student.findById(studentId);
        if (!student) {
            res.status(400).send("Account doesn't exist")
        }

        student.bookmarked.push(caseId);
        await student.save()

        return res.status(200).json({ message: "Case bookmarked successfully" });

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// router.delete("/bookmark/:caseId", async (req, res) => {

// })

module.exports = router;
