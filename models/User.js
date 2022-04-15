const mongoose = require('../connection');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true, minlength: 6},
})


module.exports = mongoose.model('User', userSchema);