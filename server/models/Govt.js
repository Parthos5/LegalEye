var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Case = require('./Case')

var GovtSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    casesList: [{
        type: Schema.Types.ObjectId,
        ref: 'Case'
    }]
})

module.exports = mongoose.model('Govt', GovtSchema);

