const mongoose = require('../connection');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName:String,
    lastName:String,
    birthDay: String,
    gender: String,
    pronouns: String,
    relationship:String,
})

module.exports = mongoose.model('Person', personSchema)