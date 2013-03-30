// Format.js

module.exports = function(req, res, next) {

	req.ro = {
		authed: 	req.user ? true : false,
		username: 	req.user ? req.user.username : '',
		user: 		req.user ? req.user._id : '',
		error: false,
		success: false
	}
	
	console.log('formatted.')
	
	next()
}