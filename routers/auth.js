const express = require('express');
const passport = require("passport");
const auth = express.Router();
auth.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));

auth.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
    }));

auth.get('/github',
    passport.authenticate('github', {scope: ['user:email']}));

auth.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/auth/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = auth;
