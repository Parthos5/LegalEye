var mongoose = require("mongoose")
var Schema = mongoose.Schema

var Case = require("./Case")

const StudentSchema  = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    lawStudent: {
        type: Boolean
    },
    verification: {
        data: Buffer,
        contentType: String
    },
    gradYear: {
        type: String,
    },
    college: {
        type: String,
    },
    bookmarked: [{
        type: Schema.Types.ObjectId,
        ref: 'Case'
    }]
})

module.exports = mongoose.model('Student', StudentSchema);