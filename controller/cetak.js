const {NikahMasuk} = require("../model/nikah");
const {
    filter_n1wanita,
    filter_n1pria,
    filter_n2,
    filter_n4,
    filter_n5,
    filter_tt,
    filter_walidankuasa,
    filter_tujuan,
    filter_n10
} = require("../utils/filter_model");
const {loadSetting} = require('../utils/setting');
module.exports = {
    n1pr: async function (req, res) {
        const detailreg = await NikahMasuk.findById(req.params.id).lean().lean();
        const dr = await filter_n1wanita(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/n1wanita', {
            title: 'N1',
            dr,
            setting,
        });
    },
    n1lk: async function (req, res) {
        const detailreg = await NikahMasuk.findById(req.params.id).lean();
        const dr = await filter_n1pria(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/n1pria', {
            title: 'N1',
            dr,
            setting,
        });
    },
    n2: async function (req, res) {
        const detailreg = await NikahMasuk.findById(req.params.id).lean();
        const dr = await filter_n2(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/n2', {
            title: 'N2',
            dr,
            setting,
        });
    },
    n4: async function (req, res) {
        const detailreg = await NikahMasuk.findById(req.params.id).lean();
        const dr = await filter_n4(detailreg);
        res.render('model_nikah/n4', {
            title: 'N4',
            dr,
        });
    },
    n5: async function (req, res) {
        const detailreg = await NikahMasuk.findById(req.params.id).lean();
        const dr = await filter_n5(detailreg);
        res.render('model_nikah/n5', {
            title: 'N5',
            dr,
        });
    },
    kuasa: async function (req, res) {
        const detailreg = await NikahMasuk.findById(req.params.id).lean();
        const dr = await filter_walidankuasa(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/kuasa', {
            title: 'Kuasa',
            dr,
            setting,
        });
    },
    wali: async function (req, res) {
        const detailreg = await NikahMasuk.findById(req.params.id).lean();
        const dr = await filter_walidankuasa(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/wali', {
            title: 'Wali',
            dr,
            setting,
        });
    },
    tt: async function (req, res) {
        const detailreg = await NikahMasuk.findById(req.params.id).lean();
        const dr = await filter_tt(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/tt', {
            title: 'TT Nikah',
            dr,
            setting,
        });
    },
    pengantar: async function (req, res) {
        const detailreg = await NikahMasuk.findById(req.params.id).lean();
        const dr = await filter_tujuan(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/pengantar', {
            title: 'Pengantar Nikah',
            dr,
            setting,
        });
    },
    n10: async function (req, res) {
        const detailreg = await NikahMasuk.findById(req.params.id).lean();
        const dr = await filter_n10(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/n10', {
            title: 'N10',
            dr,
            setting,
        });
    }
}