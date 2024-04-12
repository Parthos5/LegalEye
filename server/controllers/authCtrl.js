// authController.js

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET; // Replace with your actual secret key

const verifyStudentId = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await jwt.verify(token, secretKey);
        req.studentId = decodedToken.studentId; // Attach studentId to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = verifyStudentId