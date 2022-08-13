const express = require('express');
const passport = require("passport");
const auth = express.Router();
auth.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));

auth.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
    }));

module.exports = auth;
