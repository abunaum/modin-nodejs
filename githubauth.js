const passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');

passport.use(new GitHubStrategy({
        clientID: '46cfe464021c1346591b',
        clientSecret: 'fcfef0b833c13da45f1e5cb77990730fcea71e12',
        callbackURL: "http://localhost:3000/auth/github/callback",
        scope: ['user:email']
    },
    function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});