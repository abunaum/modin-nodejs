const Nikah = require("../model/nikah");
const {filter_masuk} = require("../utils/filter_nikah");
const moment = require("moment/moment");
const {loadSetting} = require('../utils/setting');
module.exports = {
    n1pr: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/n1wanita', {
            title: 'N1',
            dr,
            setting,
        });
    },
    n1lk: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/n1pria', {
            title: 'N1',
            dr,
            setting,
        });
    },
    n2: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/n2', {
            title: 'N2',
            dr,
            setting,
        });
    },
    n4: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        res.render('model_nikah/n4', {
            title: 'N4',
            dr,
        });
    },
    n5: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        res.render('model_nikah/n5', {
            title: 'N5',
            dr,
        });
    },
    kuasa: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/kuasa', {
            title: 'Kuasa',
            dr,
            setting,
        });
    },
    wali: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        const setting = await loadSetting();
        res.render('model_nikah/wali', {
            title: 'Wali',
            dr,
            setting,
        });
    }
}