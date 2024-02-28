var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TranscriptionSchema = new Schema({

        text: {
            type: String,
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = TranscriptionSchema