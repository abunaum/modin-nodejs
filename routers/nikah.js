const express = require('express');
const bodyParser = require("body-parser");
const ceklogin = require('../controller/login');
const nikah = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const moment = require('moment');
const {view_masuk, delete_masuk, tambah_masuk, edit_masuk, view_edit_masuk, view_tambah_masuk, detail_masuk} = require("../controller/nikah_masuk");
const {view_keluar, view_tambah_keluar, tambah_keluar} = require("../controller/nikah_keluar");
moment().format('id');

nikah.use(bodyParser.urlencoded({extended: true}));
nikah.use(bodyParser.json());
nikah.use(cookieParser('secret'));
nikah.use(
    session({
        cookie: {maxAge: 600},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
nikah.use(flash());
nikah.use(methodOverride('_method'));

nikah.get('/masuk', ceklogin, view_masuk);
nikah.delete('/masuk', ceklogin, delete_masuk);
nikah.get('/masuk/tambah', ceklogin, view_tambah_masuk);
nikah.put('/masuk/edit', ceklogin, edit_masuk);
nikah.get('/masuk/edit/:id', ceklogin, view_edit_masuk);
nikah.post('/masuk/tambah', ceklogin, tambah_masuk);
nikah.get('/masuk/detail/:id',ceklogin, detail_masuk);

nikah.get('/keluar',ceklogin, view_keluar);
nikah.get('/keluar/tambah', ceklogin, view_tambah_keluar);
nikah.post('/keluar/tambah', ceklogin, tambah_keluar);

module.exports = nikah;