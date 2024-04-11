const mongoose = require('mongoose')
const Schema = mongoose.Schema

var TranscriptionSchema = new Schema({
    text: {
        type: String,
    }
}, {
    timestamps: true,
});

var updateSchema = new Schema({
    date:{
        type:String
    },
    notes:{
        type:String
    }
})

var CaseSchema = new Schema({
    plaintiffName: {
        type: String
    },
    plaintiffLawyer: {
        type: String
    },
    defendantName: {
        type: String
    },
    defendantLawyer: {
        type: String
    },
    judgeName: {
        type: String
    },
    typeOfCourt: {
        type: String
    },
    typeOfCase: {
        type: String
    },
    caseDescription: {
        type: String
    },
    hearingDate: {
        type: String
    },
    caseNumber: {
        type: String
    },
    ownerId: {
        type: String,
    },
    // title: {
    //     type: String,
    // },
    // categoryCode: {
    //     type: Number,
    // },
    // category: {
    //     type: String,
    // },
    // subCategory: {
    //     type: String,
    // },
    // description: {
    //     type: String,
    // },
    updates:[updateSchema],
    transcription: [TranscriptionSchema]
})

module.exports = mongoose.model('Case', CaseSchema)