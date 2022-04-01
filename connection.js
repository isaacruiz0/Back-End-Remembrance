const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/remembrance-api   ")
// mongoose.connect("mongodb://localhost/vinyl-api")

module.exports = mongoose