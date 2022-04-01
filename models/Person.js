const mongoose = require('../connection');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName:String,
    lastName:String,
})

module.exports = mongoose.model('/', personSchema)