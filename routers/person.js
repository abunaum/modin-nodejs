const express = require('express');
const {loadprovinsi, loadkabupaten, loadkecamatan, loadkeldes} = require('../utils/lokasi');
const Orang = require("../model/orang");
const {body, validationResult, check} = require('express-validator');
const person = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

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

function IsLoggedIn(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        if (req.user.email != 'abunaum@hotmail.com') {
            req.logout();
            res.redirect('/login');
        } else {
            next();
        }
    }
}

person.get('/', IsLoggedIn, async (req, res) => {

    const lokasi = loadprovinsi();
    const getprov = await lokasi;
    const prov = getprov.data;
    const orang = await Orang.find();
    const provsorted = prov.sort((a, b) => a.nama.localeCompare(b.nama));

    res.render('person/list_person', {
        title: 'Person',
        user: req.user,
        prov: provsorted,
        orang,
        sukses : req.flash('sukses'),
        error : req.flash('error'),
        gagal : req.flash('gagal'),
    });
});
person.post('/tambah',
    IsLoggedIn,
    [
    check('nama', 'Nama harus diisi').notEmpty(),
    check('nik', 'NIK harus diisi').notEmpty(),
    check('nik', 'NIK tidak valid').isNumeric(),
    body('nik').custom(async (value) => {
        const duplikat = await Orang.findOne({nik: value});
        if (duplikat) {
            throw new Error('NIK sudah terdaftar');
        }
        return true;
    }),
    check('tempatlahir', 'TTL harus diisi').notEmpty(),
    check('kerja', 'Pekerjaan harus diisi').notEmpty(),
    check('agama', 'Agama harus diisi').notEmpty(),
    check('provinsi', 'Provinsi harus dipilih').notEmpty(),
    check('kabkot', 'Kota / Kabupaten harus dipilih').notEmpty(),
    check('kec', 'Kecamatan harus dipilih').notEmpty(),
    check('des', 'Kelurahan / Desa harus dipilih').notEmpty(),
    check('alamat', 'Dusun / Jalan harus diisi').notEmpty(),
    ],
    (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            req.flash('error', error);
        } else {
            const provinsi = req.body.provinsi;
            const splitprov = provinsi.split('-');
            const prov = splitprov[1];
            const kk = req.body.kabkot;
            const splitkk = kk.split('-');
            const kabkot = splitkk[1];
            const kc = req.body.kec;
            const splitkc = kc.split('-');
            const kec = splitkc[1];
            const kd = req.body.des;
            const splitkd = kd.split('-');
            const keldes = splitkd[1];
            const data = {
                nama: req.body.nama,
                nik: req.body.nik,
                jk: req.body.jk,
                tempat_lahir: req.body.tempatlahir,
                tanggal_lahir: req.body.tgllahir,
                pekerjaan: req.body.kerja,
                agama: req.body.agama,
                wn: req.body.wn,
                prov,
                kabkot,
                kec,
                keldes,
                rt: req.body.rt,
                rw: req.body.rw,
                jalan: req.body.alamat,
            };

            Orang.create(data, function (err, orang) {
                if (err) {
                    req.flash('gagal',err);
                }
            });
            req.flash('sukses','Berhasil menambah data person');
        }
        res.redirect('/person');
    });

module.exports = person;
