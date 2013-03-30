
// The User model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
 
var UserSchema = new Schema({

    // twitter stuff
	user_id:    String,
    fullname:   String,
    username:   String,

    face:       String,
    bio:        String,
    url:        String,
    location:   String,

    token: String,
    secret: String,
    // end of twitter stuff

    pressure: {type: Number, default: 0},


    plan: {type: String, default: 'free'},
    date: {type: Date, default: Date.now},
    joindate: {type: Date, default: Date.now},
    hidden: {type: Number, default: 0}

});
 
module.exports = mongoose.model('User', UserSchema);