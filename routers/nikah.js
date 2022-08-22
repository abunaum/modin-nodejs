const express = require('express');
const nikah = express.Router();

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

nikah.get('/masuk',IsLoggedIn, (req, res) => {
    res.render('nikah/list_masuk', {
        title: 'Nikah Masuk',
        user: req.user,
        sukses : req.flash('sukses'),
        error : req.flash('error'),
        gagal : req.flash('gagal'),
    });
});

nikah.get('/masuk/tambah',IsLoggedIn, (req, res) => {
    res.render('nikah/masuk_tambah', {
        title: 'Nikah Masuk',
        user: req.user,
        sukses : req.flash('sukses'),
        error : req.flash('error'),
        gagal : req.flash('gagal'),
    });
});

module.exports = nikah;