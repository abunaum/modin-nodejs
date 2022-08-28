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
const settingRoute = require('./routers/setting');
const cetakRoute = require('./routers/cetak');
const ceklogin = require('./controller/login');
require('./gauth');
require('./githubauth');
require('./utils/db');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.use(session({secret: 'user', resave: false, saveUninitialized: false,}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
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

app.use('/api', apiRoute);
app.use('/auth', authRoute);
app.use('/nikah', nikahRoute);
app.use('/person', personRoute);
app.use('/setting', settingRoute);
app.use('/cetak', cetakRoute);

app.get('/', ceklogin, (req, res) => {
    res.render('beranda', {
        title : 'Beranda',
        info : req.session
    })
});
app.get('/login', (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('login', {
            title: 'Login'
        })
    }
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

