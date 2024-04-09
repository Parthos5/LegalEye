require('dotenv').config();
const connDB = require('./db');
const Govt = require('./models/Govt');
const Case = require('./models/Case');
const bcrypt = require('bcrypt');

// Define an async function to hash the password and seed the data
const seedData = async () => {
    try {
        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash("password123", 10);

        // Create a new Govt instance with the hashed password
        const govtInstance = new Govt({
            email: "govt@example.com",
            username: "government",
            password: hashedPassword,
            casesList: [] // If there are cases associated with this government, you can add them here
        });

        // Create a new Case instance
        const caseInstance = new Case({
            categoryCode: 1,
            category: "Some Category",
            subCategory: "Some Subcategory",
            transcription: [{
                text: "Transcription text goes here",
                notes: "Additional notes can be added here"
            }]
        });

        // Connect to the database
        await connDB(process.env.MONGO_URI);

        // Seed new data by saving the Govt and Case instances
        await Promise.all([
            govtInstance.save(), // Saving the Govt instance
            caseInstance.save() // Saving the Case instance
        ]);

        console.log("Success! Data seeded.");
    } catch (error) {
        console.error("Error:", error);
    }
};

// Call the async function to hash the password and seed the data
seedData();

// const newCase = {
    //     categoryCode: req.categoryCode,
    //     category: req.category,
    //     subCategory: req.subCategory,
    //     transcription: [{
    //         text: req.transcription.text,
    //         notes: req.transcription.notes
    //     }]
    // }