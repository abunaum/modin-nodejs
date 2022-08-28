const Nikah = require("../model/nikah");
const {filter_masuk} = require("../utils/filter_nikah");
const moment = require("moment/moment");
module.exports = {
    index: async function (req,res){
        const detailreg = await Nikah.findById(req.params.id);
        const dr = await filter_masuk(detailreg);
        res.render('model_nikah/n1wanita', {
            title: 'N1',
            dr,
        });
    }
}