
var express = require('express');
var MongoStore = require('connect-mongo')(express);

module.exports = function (app, config, passport, mongoose) {

	app.set('showStackError', true)
	// should be placed before express.static
	app.use(express.compress({
	  	filter: function (req, res) {
	    	return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
	    },
	    level: 9
	}))
	app.use(express.static(config.root + '/public'))
	app.use(express.favicon(config.root + '/public/favicon.ico'))
	
	app.use(express.logger('dev'))


	// set views path, template engine and default layout
  	//> app.set('views', config.root + '/app/view')
  	//> app.set('view engine', 'jade')
  	// this is need for template inheritance to be allowed
  	//> app.set('view options', { layout: false });

  	app.configure(function () {

  		app.use(function(req, res, next) {
  			console.log('handling request for: ' + req.url);
  			next();
		});

		

    	// cookieParser should be above session
    	app.use(express.cookieParser('chris is key'))

    	// bodyParser should be above methodOverride
    	app.use(express.bodyParser())
    	app.use(express.methodOverride())

    	// TODO: LOOK INTO EXTENDING
		// app.use(express.session());
		app.use(express.session({
    		secret:'secret',
    		maxAge: new Date(Date.now() + 3600000),
    		store: new MongoStore(
        		{db:mongoose.connection.db},
        		function(err){
            	// console.log(err || 'connect-mongodb setup ok');
        	})
		}));

		// use passport session
    	app.use(passport.initialize())
    	app.use(passport.session())
		
		app.use(app.router)

    	// routes should be at the last
    	

    	app.use(function(req, res, next) {
    		req.ro = req.ro || {};
    		next();
    	})
    	// assume "not found" in the error msgs
	    // is a 404. this is somewhat silly, but
	    // valid, you can do whatever you like, set
	    // properties, use instanceof etc.
	    app.use(function(err, req, res, next){
	      // treat as 404
	      //console.log(err);
	      //if (~err.stack.indexOf('not found')) return next()
	      	console.log(req.ro);
	        // log it
	        if(err.stack) {
		      console.error(err.stack) //2/17/2013 >> undefined

		      // error page
		      	req.ro.originalUrl = req.originalUrl
		    	req.ro.title = '500';
		    	req.ro.error = err.stack;
		    	
		    	res.status(500).json('500', req.ro)
		    } else {
		    	next();
		    }
	    })

	    // assume 404 since no middleware responded
	    app.use(function(req, res, next){
	    	
	    	req.ro.originalUrl = req.originalUrl
	    	req.ro.title = '404';
	    	res.status(404).json('404', req.ro)
	    })
	});
}