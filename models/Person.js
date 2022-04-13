const mongoose = require('../connection');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName:String,
    lastName:String,
    birthDay: String,
    gender: String,
    pronouns: String,
    relationship:String,
    creator: { type:mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Person', personSchema)