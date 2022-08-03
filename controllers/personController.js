const express = require("express");
const Person = require('./../models/Person')
const User = require('./../models/User')
// Middleware needed to authentiate the token of a request
const authenticateToken = require('../jwtVerify/auth')

const router = express.Router();

// gets a list of Persons from database
router.get("/people",authenticateToken ,(req, res) => {
    // This is searching for a person with the user object value of the user.username that will set in the authenticateToken function
    Person.find({ "user.username": req.user.username})
        .then((people => res.json({
            status: 200,
            people: people
        })))
})
router.get("/people/:id", (req,res) => {
    Person.findById(req.params.id, function(err, person){
        if (err) {
            console.log(err);
        }
        else {
            res.json(person)
            
        }
    })
})

// creates a person from database
router.post("/createperson",authenticateToken ,(req, res) => {
    // creates a new instance of a person locally and then saves it to database
    const data = req.body
    Person.create(data, (function(err, person){
            if (err){
                console.log(err);
            }
            else {
                User.findOne({username:req.body.username}, (function(err, user){
                    if (err){
                        console.log(err);
                    }
                    else {
                        person.user.id = user.id;
                        person.user.username = user.username;
                        person.save();
                        res.json(person)
                    }
                }))
               
            }
        }))
})

router.delete("/:id",authenticateToken, (req,res) => {
    Person.findByIdAndDelete(req.params.id, function(err, person){
        if (err) {
            console.log(err);
        }
        else {
            res.json(person)
            
        }
    })
})
module.exports = router;