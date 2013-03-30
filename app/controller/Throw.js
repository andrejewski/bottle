// Throw.js

var User = require('../model/user.js');
var Note = require('../model/note.js');

module.exports = function(req, res, next) {
	var form = req.body;
	if(form.text && req.ro.authed) {

		getRandomId(req, function(random_id) {
			console.log(form.text);
			Note({
				text: form.text,
				user: random_id,
				from: req.user._id
			}).save(function(err, note) {
				if(err) {
					req.ro.error = err;
					req.ro.success = true
					req.ro.commit = false;
					next();
				} else {
					req.ro.commit = true
					req.ro.success = true
					next();
				}
			})
		})
	} else {
		next();
	}
}

function getRandomId(req, next) {
	User.count({}, function(err, count) {
		if(err) throw err;
		num = getRandom(0, count-2);
		// -2 because:
			// -1 for the one I need to find if 10/10, to prevent overflow
			// -1 for the current user, they don't get their own note
		User.find({'_id': { $ne : req.user._id }})
			.limit(-1).skip(num)
			.exec(function(err, users) {
				if(err) throw err;
				if(users.length == 1) {
					next(users[0]._id);
				}
		})
	})

}

function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
