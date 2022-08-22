const express = require('express');
const Nikah = require("../model/nikah");
const bodyParser = require("body-parser");
const Orang = require("../model/orang");
const {toDate} = require("validator");
const nikah = express.Router();

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

nikah.get('/masuk',IsLoggedIn, async (req, res) => {
    const datanikah = await Nikah.find();
    res.render('nikah/list_masuk', {
        title: 'Nikah Masuk',
        info : req.session,
        datanikah,
        sukses : req.flash('sukses'),
        error : req.flash('error'),
        gagal : req.flash('gagal'),
    });
});

nikah.get('/masuk/tambah',IsLoggedIn, (req, res) => {
    res.render('nikah/masuk_tambah', {
        title: 'Nikah Masuk',
        info : req.session,
        sukses : req.flash('sukses'),
        error : req.flash('error'),
        gagal : req.flash('gagal'),
    });
});
nikah.post('/masuk/tambah',IsLoggedIn, (req, res) => {
    const status = {status: 'masuk'};
    const datareq = req.body;
    const tglnikah = toDate(datareq.tglnikah);
    datareq.tglnikah = tglnikah;
    const data = Object.assign(datareq, status)
    Nikah.create(data, function (err) {
        if (err) {
            req.flash('gagal',err);
        }
        else {
            req.flash('sukses','Berhasil menambah data Nikah');
        }
    });
    res.redirect('/nikah/masuk');
});

module.exports = nikah;