/* terminal commands
	
	alias bn='node /Users/Pyrus/Desktop/Dev/Dropbox/Camp/Bottle/server.js'

*/

var express = require('express')
  , passport = require('passport')

// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose')

// db connection
mongoose.connect(config.db)


// passport config
require('./config/passport')(passport, config)

var app = express()
// express settings
require('./config/express')(app, config, passport, mongoose)

// routes
require('./config/routes')(app, passport)

// Start the app by listening on <port>
var port = process.env.PORT || 5454
app.listen(port)
console.log('Express app started on port '+port)