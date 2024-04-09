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
    ownerId: {
        type: String,
    },
    title: {
        type: String,
    },
    categoryCode: {
        type: Number,
    },
    category: {
        type: String,
    },
    subCategory: {
        type: String,
    },
    description: {
        type: String,
    },
    updates:[updateSchema],
    transcription: [TranscriptionSchema]
})

module.exports = mongoose.model('Case', CaseSchema)