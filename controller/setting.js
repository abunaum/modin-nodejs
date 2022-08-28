const {loadprovinsi} = require("../utils/lokasi");
const {loadSetting, editKeldes} = require('../utils/setting');
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
            } else {
                if (req.body.nip ===''){
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
                req.flash('sukses', 'Berhasil mengedit data pejabat desa');
                res.redirect('/setting');
            }
    }]
}