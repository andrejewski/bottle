// Bottles.js

var Note = require('../model/note.js');

module.exports = function(req, res, next) {
	if(req.ro.authed) {
		Note.find({user: req.user._id}).exec(function(err, notes) {
			if(err) throw err;
			var bottles = [];
			notes.forEach(function(note) {
				bottles.push({
					id: note._id,
					text: note.text 
				});
			})
			req.ro.bottles = bottles;
			req.ro.success = true;
			next();
		})
	} else {
		next();
	}
}