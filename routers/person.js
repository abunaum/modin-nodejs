const express = require('express');
const {loadprovinsi} = require('../utils/lokasi');
const Orang = require("../model/orang");
const {body, validationResult, check} = require('express-validator');
const person = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const ceklogin = require('../controller/login');
const controller = require('../controller/person');
person.use(cookieParser('secret'));
person.use(
    session({
        cookie: { maxAge:600 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
person.use(flash());

person.delete('/', ceklogin, controller.delete);
person.put('/', ceklogin, controller.edit);
person.post('/edit', ceklogin, controller.viewedit);
person.get('/', ceklogin, controller.index);
person.post('/tambah', ceklogin, controller.tambah);

module.exports = person;
