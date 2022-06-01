const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
// Error Handling
const HttpError = require('../models/http-error')
// Import User model
const User = require('../models/User')
const jwt = require("jsonwebtoken");
const passport = require("passport");

// S I G N     U P
router.post('/signup', (req,res) =>{
    User.register(new User({
        name: req.body.name,
        username: req.body.username,
    }), req.body.password, function (err, user){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else {
            // If successfully authenticated then it will move onto the next function
            passport.authenticate("local")(req, res, function(){
                const accessToken = jwt.sign(
                    { username: req.body.username },
                    process.env.ACCESS_TOKEN_SECRET
                );
                res.status(200).send({
                    // This will be sent alongside requests
                    accessToken,
                    // This will link people to the User
                    username: user.username,
                    // This will allow the user to be greeted by their first name
                    name: user.name,
                });             
            });
        }
    }
    )
})

// L O G   I N
router.post('/login', (req,res) =>{
    // These are the credentials that were sent from the frontend
    User.findOne({username: req.body.username}, function(err, user) {
        // This specififes the 'local' strategy, to authenticate requests.
        passport.authenticate("local")(req, res, function(){
            const accessToken = jwt.sign(
                { username: req.body.username },            
                process.env.ACCESS_TOKEN_SECRET
            );
            console.log(user)
            
            res.status(200).send({
                accessToken,
                username: user.username,
                name: user.name,
            }); 
        })
    })    
})




module.exports = router
