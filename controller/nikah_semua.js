const {NikahSemua} = require("../model/nikah");

const semuadata = async (req, res) => {
    const datanikah = await NikahSemua.find();
    await res.render('nikah/semua-data', {
        title: 'Semua Data',
        info: req.session,
        datanikah,
        sukses: req.flash('sukses'),
        error: req.flash('error'),
        gagal: req.flash('gagal'),
    });
}

module.exports = {semuadata}