const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;
const apiRoute = require('./routers/api');
const authRoute = require('./routers/auth');
const personRoute = require('./routers/person');

require('./auth');
require('./utils/db');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.use(session({secret: 'user'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge:600 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

function IsLoggedIn(req, res, next){
    if (!req.user){
        res.redirect('/login');
    } else{
        if (req.user.email !== 'abunaum@hotmail.com'){
            req.logout();
            res.redirect('/login');
        }else{
            next();
        }
    }
}

app.use('/api', apiRoute);
app.use('/auth', authRoute);
app.use('/person', personRoute);

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

app.use('/',(req,res) => {
    res.status(404);
    res.render('404');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});

