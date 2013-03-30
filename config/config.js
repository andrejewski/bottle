var ip = '192.168.1.45';
var port = 5555;

module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'Bottle'
      },
      db: 'mongodb://localhost/bottle_dev',
      facebook: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://"+ip+":"+port+"/auth/facebook/callback"
      },
      twitter: {
          clientID: "hLxvHwTVcC2ehbMfXZcg"
        , clientSecret: "8IkEl7GRkTOdCoy6gsk26dauLSD1BaDA1QvpW3o5w"
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
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'Hurl'
      },
      db: 'mongodb://hurl.aws.af.cm/hurl_dev',
      facebook: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://localhost:8888/auth/facebook/callback"
      },
      twitter: {
          clientID: "MEsnlKSjt4sBPwWSGt54A"
        , clientSecret: "V2uThixOPG4qwJ1iD1QOlKEyvVZmgZq493ONtns3PuI"
        , callbackURL: "http://hurl.aws.af.cm/auth/twitter/callback"
      },
      github: {
          clientID: 'APP_ID'
        , clientSecret: 'APP_SECRET'
        , callbackURL: 'http://localhost:8888/auth/github/callback'
      },
      google: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://localhost:8888/auth/google/callback"
      }
    }
}