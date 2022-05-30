const mongoose = require('../connection');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    name:String,
    people:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"People"
        }
    ]
})

// This will add a username field and a hash and salt field to store the hashed password and salt value
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);