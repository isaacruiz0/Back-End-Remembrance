const { request } = require("express");
const jwt = require('jsonwebtoken')

// checking if the request from the client side was sent alongside a valid json web token and if it wasn't then it sends back an unauthorized error
module.exports = function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    // if we have an authHeader than return the authHeader which we split where there is a space otherwise return undefine
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    // if we have a valid token then do this
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user
        console.log(user, req.user)
        next()
    })
}