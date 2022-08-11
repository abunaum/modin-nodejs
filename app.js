const express = require('express')
const passport = require('passport')
const session = require('express-session');
const morgan = require('morgan');
const {home} = require("nodemon/lib/utils");
const app = express()
const port = 3000

require('./auth');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.use(session({secret: 'user'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

function IsLoggedIn(req, res, next){
    if (!req.user){
        res.redirect('/login');
    } else{
        if (req.user.email != 'abunaum@hotmail.com'){
            req.logout();
            res.redirect('/login');
        }else{
            next();
        }
    }
}

app.get('/', IsLoggedIn, (req, res) => {
    res.render('beranda', {
        title : 'Beranda',
        user : req.user
    })
});

app.get('/login', (req, res) => {
    res.render('login', {
        title : 'Login'
    })
});

app.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
    }));

app.get('/person', IsLoggedIn, (req, res) => {
    res.render('person/list_person', {
        title : 'Person',
        user : req.user
    })
});
app.post('/tambah-person', IsLoggedIn, (req, res) => {
    console.log(req.body)
});

app.use('/',(req,res) => {
    res.status(404);
    res.render('404');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});

