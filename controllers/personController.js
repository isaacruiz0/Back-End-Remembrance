const express = require("express");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
// Imported Models
const User = require('../models/User')
const Person = require('./../models/Person')

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
router.post("/createperson", async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data', 422)
        )
    }
    const { firstName, lastName, birthday, gender, pronouns, relationship, creator } = req.body;

    const createdPerson = new Person({
        firstName,
        lastName,
        birthday,
        gender,
        pronouns,
        relationship,
        creator
    })

    let user;

    try {
        user = User.findById(creator)
    }catch(err) {
        const error = new HttpError(
            'Creating place failed, please try again', 500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id', 404)
        return next (error);
    }

    console.log(user);

    try{
        
    } catch(err) {
        const error = new HttpError('Creating person failed, please try again.', 500);
        return next(error)
    }



})

router.delete("/:id", (req,res) => {
    Person.findOneAndDelete({id: req.params.id}).then(function(person){
        res.json(person)
    })
})
module.exports = router;