const express = require("express");
const { authenticate } = require("passport");
const Person = require('./../models/Person')

// Middleware needed to authenticate the token of a request
const authenticateToken = require('../jwtVerify/auth')

const router = express.Router();

// gets a list of Persons from database
router.get("/people", (req, res) => {
    Person.find({})
        .then((people => res.json({
            status: 200,
            people: people
        })))
})

// creates a person from database
router.post("/createperson", (req, res) => {
    // creates a new instance of a person locally and then saves it to database
    const data = req.body 
    console.log(data)
    Person.create(data)
        .then(function(person){
            res.json(person)
            console.log(person)
        })
})

router.delete("/:id", (req,res) => {
    Person.findOneAndDelete({id: req.params.id}).then(function(person){
        res.json(person)
    })
})
module.exports = router; 