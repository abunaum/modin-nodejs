const {loadprovinsi} = require("../utils/lokasi");
const {loadSetting, editKeldes, editKUA, editModin} = require('../utils/setting');
const {check, validationResult} = require("express-validator");
module.exports = {
    index: async (req, res) => {
        const getprov = await loadprovinsi();
        const prov = await getprov.data;
        const provsorted = await prov.sort((a, b) => a.nama.localeCompare(b.nama));
        const setting = await loadSetting();
        res.render('setting/index', {
            title: 'Setting',
            info: req.session,
            setting,
            prov: provsorted,
            sukses: req.flash('sukses'),
            error: req.flash('error'),
            gagal: req.flash('gagal'),
        });
    },
    edit_keldes: [
        check('nama', 'Nama harus diisi').notEmpty(),
        check('jabatan', 'Jabatan harus diisi').notEmpty(),
        async (req, res) => {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                req.flash('error', error);
                res.redirect('/setting');
            } else {
                if (req.body.nip === '') {
                    const newdata = {
                        nama: req.body.nama,
                        jabatan: req.body.jabatan,
                    };
                    await editKeldes(newdata);
                } else {
                    const newdata = {
                        nama: req.body.nama,
                        jabatan: req.body.jabatan,
                        nip: req.body.nip,
                    };
                    await editKeldes(newdata);
                }
                req.flash('sukses', 'Berhasil mengedit data pejabat kelurahan / desa');
                res.redirect('/setting');
            }
        }],
    edit_kua: [
        check('nama', 'Nama harus diisi').notEmpty(),
        check('jabatan', 'Jabatan harus diisi').notEmpty(),
        async (req, res) => {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                req.flash('error', error);
                res.redirect('/setting');
            } else {
                if (req.body.nip === '') {
                    const newdata = {
                        nama: req.body.nama,
                        jabatan: req.body.jabatan,
                    };
                    await editKUA(newdata);
                } else {
                    const newdata = {
                        nama: req.body.nama,
                        jabatan: req.body.jabatan,
                        nip: req.body.nip,
                    };
                    await editKUA(newdata);
                }
                req.flash('sukses', 'Berhasil mengedit data pejabat KUA');
                res.redirect('/setting');
            }
        }],
    edit_modin: [
        check('nama', 'Nama harus diisi').notEmpty(),
        check('nik', 'NIK harus diisi').notEmpty(),
        check('ttl', 'TTl harus diisi').notEmpty(),
        check('pekerjaan', 'Pekerjaan harus diisi').notEmpty(),
        check('agama', 'TTl Agama diisi').notEmpty(),
        check('wn', 'Kewarganegaraan harus diisi').notEmpty(),
        check('provinsi', 'Provinsi harus dipilih').notEmpty(),
        check('kabkot', 'Kabupaten / Kota harus dipilih').notEmpty(),
        check('kec', 'Kecamatan harus dipilih').notEmpty(),
        check('des', 'Kelurahan / Desa harus dipilih').notEmpty(),
        check('rt', 'RT harus dipilih').notEmpty(),
        check('rw', 'RW harus dipilih').notEmpty(),
        check('alamat', 'Dusun / Jalan harus diisi').notEmpty(),
        async (req, res) => {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                req.flash('error', error);
                res.redirect('/setting');
            } else {
                const dataprov = req.body.provinsi.split("-");
                const prov = dataprov[1];
                const datakabkot = req.body.kabkot.split("-");
                const kabkot = datakabkot[1];
                const datakec = req.body.kec.split("-");
                const kec = datakec[1];
                const datades = req.body.des.split("-");
                const des = datades[1];
                const newdata = {
                    nama: req.body.nama,
                    nik: req.body.nik,
                    ttl: req.body.ttl,
                    pekerjaan: req.body.pekerjaan,
                    wn: req.body.wn,
                    agama: req.body.agama,
                    prov: prov,
                    kabkot: kabkot,
                    kec: kec,
                    keldes: des,
                    rt: req.body.rt,
                    rw: req.body.rw,
                    alamat: req.body.alamat,
                };
                await editModin(newdata);
                req.flash('sukses', 'Berhasil mengedit data Modin');
                res.redirect('/setting');
            }
        }]
}