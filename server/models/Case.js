const mongoose = require('mongoose')
const Schema = mongoose.Schema

var TranscriptionSchema = new Schema({
    text: {
        type: Array,
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
    title:{
        type:String
    },
    summary:{
        type:String
    },
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
    totalViews:{
        type:Number,
        default: 0
    },
    updates:[updateSchema],
    transcription: [TranscriptionSchema]
})

module.exports = mongoose.model('Case', CaseSchema)