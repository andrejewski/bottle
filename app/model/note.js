
// the Note model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var noteSchema = new Schema({
    note: ObjectId,

    name: {type: String, default: "I didn't name this."},
    text: {type: String},

    date: {type: Date, default: Date.now},
    
    user: {type: String},
    from: {type: String}

});

noteSchema.pre('save', validate);

function validate(next) {
    this.name = this.name.length < 140 ? this.name : this.name.slice(0,140);
    this.text = this.text.length < 2048 ? this.text : this.text.slice(0,2048);
    next();
}

module.exports = mongoose.model('Note', noteSchema);