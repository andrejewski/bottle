var ip = '192.168.1.45';
var port = 5454;

module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'Bottle'
      },
      db: '$YOUR DB HERE',
      facebook: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://"+ip+":"+port+"/auth/facebook/callback"
      },
      twitter: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://"+ip+":"+port+"/auth/twitter/callback"
      },
      github: {
          clientID: 'APP_ID'
        , clientSecret: 'APP_SECRET'
        , callbackURL: 'http://localhost:"+port+"/auth/github/callback'
      },
      google: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://localhost:"+port+"/auth/google/callback"
      }
    }
  , test: {

    }
  , production: {
    
    }
}