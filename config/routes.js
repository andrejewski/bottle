
// application routes
var $path = '../app/controller/'
  , controllers = ['Format','Bottles','Throw'];

var Format 	= require($path+'Format'+'.js')
  , Bottles = require($path+'Bottles'+'.js')
  , Throw 	= require($path+'Throw'+'.js')


module.exports = function (app, passport, auth) {

	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter',{successRedirect: '/',failureRedirect: '/'}));
	app.get('/i/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	app.all('*', Format);
	app.get('/isAuthed', function(req, res) {
		req.ro.success = true;
		res.json(req.ro);
	});
	app.get('/bottles', Bottles);
	app.post('/throw', Throw);
	app.all('*', function(req, res, next) {
		if(req.ro.success == true) {
			res.json(req.ro);
		} else {
			next();
		}
	})

}