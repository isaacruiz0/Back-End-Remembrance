const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
// Error Handling
const HttpError = require('../models/http-error')
// Import User model
const User = require('../models/User')




const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Shwartz',
        email: 'test@test.com',
        password:'testerskjj'
    }
]

router.get('/', (req,res) =>{
    res.json({users: DUMMY_USERS})
})
router.post('/signup', async (req,res, next) =>{


    const { name, email, password, people } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email: email})
    } catch (err) {
        const error = new HttpError(
            "Signing up failed, please try again.", 500
        );
        return next(error)
    }
    
    if(existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.', 422
        );
        return next(error);
    }


    const createdUser = new User({
        name,
        email,
        password,
        people
    });
    try {
    await createdUser.save();
    } catch(err) {
        const error = new HttpError(
            'Signing up failed, please try again.', 500
        )
        return next(error)
    }


    res.status(201).json({user: createdUser.toObject({ getters: true })})
})
router.post('/login', (req,res, next) =>{
    const { email, password} = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email: email})
    } catch (err) {
        const error = new HttpError(
            "Logging in failed, please try again.", 500
        );
        return next(error)
    }

    


    res.json({message: "Logged in!"})
})

module.exports = router
