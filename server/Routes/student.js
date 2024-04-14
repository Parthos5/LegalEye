const express = require("express")
const router = express.Router()

const Student = require('../models/Student') 

const verifyStudentId = require("../controllers/authCtrl")

const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET
const bcrypt = require("bcrypt")

router.post("/signup", async (req, res) => {

    let user = await Student.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send("Registration failed: User already exists!")
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const newUser = new Student({
                username: req.body.username,
                email: req.body.email,
                password: password,
                collegeName: req.body.collegeName,
                gradYear: req.body.gradYear
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
        let user = Student.findOne({ username: req.body.username })
        if(!user) {
            return res.status(400).json({ message: "Incorrect credentials" })
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password)
        if(!correctPassword) {
            return res.status(400).json({ message: "Incorrect credentials" })
        }

        const token = jwt.sign({ studentId: user._id, username: user.username }, secretKey)
        res.cookie(
            "token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            sameSite: "strict"
        })
        res.json({ message: 'Successfully logged in' })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

router.post("/bookmark", async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // Verifying token
        const decodedToken = jwt.verify(token, secretKey);
        const studentId = decodedToken.studentId;
        const { caseId } = req.body;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(400).send("Account doesn't exist");
        }
        const index = student.bookmarked.indexOf(caseId);
        if (index === -1) {
            student.bookmarked.push(caseId);
        } else {
            student.bookmarked.splice(index, 1);
        }

        await student.save();

        return res.status(200).json({ message: "Case bookmark toggled successfully" });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

// router.delete("/bookmark/:caseId", async (req, res) => {

// })

module.exports = router