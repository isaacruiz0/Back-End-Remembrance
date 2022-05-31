const express = require("express");
// Imported Models
const Person = require('./../models/Person')

// Middleware needed to authenticate the token of a request
const authenticateToken = require('../jwtVerify/auth');
const User = require("../models/User");

const router = express.Router();

// Gets a list of people from a specific user according to the username
router.get("/people",authenticateToken, (req, res) => {
    // This will return the people in the People collection that have user.username equal to the value of :username that is sent in the fetch request on the front end
    Person.find({'user.username': req.user.username})
        .then((people => res.json({
            status: 200,
            people: people
        })))
})

// creates a person from database
router.post('/createperson',authenticateToken,(req,res) => {
    // Creates a new instance of a person while also linking it to the currently logged in User and then saves it to the database 
    const requestModelData =  req.body;
    // This will use the Person model to create and link the newly created person
    Person.create(requestModelData, (function(err,person){
        if (err){
            console.log(err)
        }
        // If successful then a person will be created and the username that was initally locally stored on the client side when the User logged in will be used to link the created person with the current User
        else{
            User.findOne({username:req.body.username},(function(err, user){
                if (err){
                    console.log(err)
                }
                // This will set the value of the person.user object to that of the logged in User. Then it will save the person to the People collection in the database
                else {
                    person.user.id = user.id;
                    person.user.username = user.username
                    person.save()
                    res.json(person)
                }
            }))

        }
    }))
})

router.delete("/:id", authenticateToken,(req,res) => {
    Person.findOneAndDelete(req.params.id, function(err, person){
        if (err){
            console.log(err);
        }
        else{
            res.json(person)
        }
    })
})
module.exports = router; 