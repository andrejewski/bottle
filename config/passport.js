
var mongoose = require('mongoose')
//, LocalStrategy = require('passport-local').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , User = require('../app/model/user.js')

module.exports = function (passport, config) {

  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
          done(err, user);
    });
  })

/*
  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'signUsername', 
      passwordField: 'signPassword'
    }, function(username, password, done) {
      User.findOne({ 'username': username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          new User({
            username: username,
            password: password
          }).save(function(err, user) {
            if (err) { done(err); }
            else { done(null, user); }
          })
          // return done(null, false, { message: 'Incorrect username.' });
        } else {
          user.comparePassword(password, function(err, bool) {
            if(bool) {
              return done(null, user);
            }
            return done(null, false, { message: 'Incorrect password.' });
          });
        }
      })
    }
  ))
*/

  // use twitter strategy
  passport.use(new TwitterStrategy({
        consumerKey: config.twitter.clientID
      , consumerSecret: config.twitter.clientSecret
      , callbackURL: config.twitter.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      // console.log('Profile: '+JSON.stringify(profile));
      User.findOne({ 'user_id': profile.id }, function (err, user) {
        console.log('Twitter: ')
        console.log(profile);
        if (err) { return done(err) }
        if (!user) {
          user = new User({
              user_id:  profile.id
            , fullname: profile.displayName
            , username: profile.username
            , face:     profile.photos[0]['value']
            , bio:      profile._json.description
            , url:      profile._json.url
            , location: profile._json.location
            , hidden:   profile._json['protected'] ? 1 : 0
            , provider: 'twitter'
            , token:    token
            , secret:   tokenSecret
            //, twitter:  profile._json
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        }
        else {
          // update user info
          user.fullname =   profile.displayName;
          user.username =   profile.username;
          user.face =       profile.photos[0]['value'];
          user.bio =        profile._json.description;
          user.url =        profile._json.url;
          user.location =   profile._json.location;
          user.hidden =     profile._json['protected'] ? 1 : 0;
          user.date =       Date.now();
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        }
      })
    }
  ))

}