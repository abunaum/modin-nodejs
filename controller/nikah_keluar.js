const Nikah = require("../model/nikah");
const Orang = require("../model/orang");
const {check, body, validationResult} = require("express-validator");
const moment = require("moment/moment");
const {toDate} = require("validator");

const view_keluar = async (req, res) => {
    const datanikah = await Nikah.find({status: 'keluar'});
    res.render('nikah/keluar/list', {
        title: 'Nikah Keluar',
        info: req.session,
        datanikah,
        sukses: req.flash('sukses'),
        error: req.flash('error'),
        gagal: req.flash('gagal'),
    });
}

const view_tambah_keluar = async (req, res) => {
    const lk = await Orang.find({jk: 'lk'});
    const pr = await Orang.find({jk: 'pr'});
    res.render('nikah/keluar/tambah', {
        title: 'Nikah Keluar',
        info: req.session,
        lk,
        pr,
        sukses: req.flash('sukses'),
        error: req.flash('error'),
        gagal: req.flash('gagal'),
    });
}

module.exports = {view_keluar, view_tambah_keluar}
