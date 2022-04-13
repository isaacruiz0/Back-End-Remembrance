const express = require("express");
const { validationResult } = require("express-validator");
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

router.get('/', async(req,res, next) =>{
    let users;
    try{
        users = await User.find( {}, 'email name' );
    }catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.', 500
        );
        return next(error)
    }
    res.json({users: users.map(user => user.toObject({ getters:true }))})
    
})
router.post('/signup', async (req,res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }


    const { name, email, password } = req.body;

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
        people: []
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
router.post('/login', async (req,res, next) =>{
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

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            'Invalid credentials, could not log you in', 401
        )
        return next(error)
    }

    res.json({message: "Logged in!"})
})

module.exports = router
