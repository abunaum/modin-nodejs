const Nikah = require("../model/nikah");
const {filter_masuk} = require("../utils/filter_nikah");
const moment = require("moment/moment");
module.exports = {
    n1pr: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        res.render('model_nikah/n1wanita', {
            title: 'N1',
            dr,
        });
    },
    n1lk: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        res.render('model_nikah/n1pria', {
            title: 'N1',
            dr,
        });
    },
    n2: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        res.render('model_nikah/n2', {
            title: 'N2',
            dr,
        });
    }
}