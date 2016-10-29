var passport = require('passport');
var oauth = require('./oauth.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var database = require('./db/dbmodels');

module.exports = passport.use(new GoogleStrategy({
  clientID: oauth.google.clientID,
  clientSecret: oauth.google.clientSecret,
  callbackURL: oauth.google.callbackURL
  // passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    database.GoogleUser.findOne({ oauthID: profile.id }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
          oauthID: profile.id,
          name: profile.displayName,
          created: Date.now()
        });
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));
//   function(request, accessToken, refreshToken, profile, done) {
//     process.nextTick(function () {
//       return done(null, profile);
//     });
//   }
// ));
