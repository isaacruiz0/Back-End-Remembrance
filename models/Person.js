const mongoose = require('../connection');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName:String,
    lastName:String,
    birthDay: String,
    gender: String,
    pronouns: String,
    relationship:String,
    // These are the extra details stored in an array that a user can push to
    extraDetails: [{key: String, value: String}],
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
})

module.exports = mongoose.model('Person', personSchema)