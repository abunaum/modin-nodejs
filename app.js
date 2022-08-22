const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const apiRoute = require('./routers/api');
const authRoute = require('./routers/auth');
const nikahRoute = require('./routers/nikah');
const personRoute = require('./routers/person');

require('./gauth');
require('./githubauth');
require('./utils/db');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.use(session({secret: 'user'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(methodOverride('_method'));
app.use(
    session({
        cookie: {maxAge: 600},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

function IsLoggedIn(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        const session = req.session;
        if (req.user.provider === 'github') {
            if (req.user.emails[0].value !== 'abunaum@hotmail.com') {
                res.redirect('/logout');
            } else {
                session.user= {
                    'email': req.user.emails[0].value,
                    'picture': req.user.photos[0].value
                };
                next();
            }
        } else {
            if (req.user.email !== 'abunaum@hotmail.com') {
                res.redirect('/logout');
            } else {
                session.user= {
                    'email': req.user.email,
                    'picture': req.user.picture
                };
                next();
            }
        }
    }
}

app.use('/api', apiRoute);
app.use('/auth', authRoute);
app.use('/nikah', nikahRoute);
app.use('/person', personRoute);

app.get('/', IsLoggedIn, (req, res) => {
    res.render('beranda', {
        title : 'Beranda',
        info : req.session
    })
});
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    })
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.use('/', (req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});

