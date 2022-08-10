const passport = require('passport');
const session = require('express-session');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '946805803714-afdufm4d9dfqvd8a0dlpum872g51e3b2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});