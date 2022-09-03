const {NikahKeluar} = require("../model/nikah");
const Orang = require("../model/orang");
const {check, body, validationResult} = require("express-validator");
const moment = require("moment/moment");
const {toDate} = require("validator");

const view_keluar = async (req, res) => {
    const datanikah = await NikahKeluar.find({status: 'keluar'});
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
const tambah_keluar = async (req, res) => {
    var datareq = req.body;
    const reg = {
        noreg: datareq.noreg,
        tglregister: datareq.tglregister,
        status: 'keluar',

    };
    const statuskeluar = {
        statuskeluar: {
            kec: datareq.sttkeluar,
            tujuan: datareq.cektujuan,
        }
    };
    function lk() {
        if (datareq.statuslk === 'duda') {
            const lk = {
                nik: datareq.niklk,
                status: datareq.statuslk,
                noac: datareq.noaclk,
            };
            return lk;
        } else {
            const lk = {
                nik: datareq.niklk,
                status: datareq.statuslk,
            };
            return lk;
        }
    }
    function aylk() {
        if (datareq.statusaylk === 'ada') {
            const aylk = {
                nikay: datareq.nikaylk,
                sttay: datareq.sttaylk,
            };
            return aylk;
        } else {
            const aylk = {
                namaay: datareq.namaaylk,
                sttay: datareq.sttaylk,
            };
            return aylk;
        }
    }
    function iblk() {
        if (datareq.statusiblk === 'ada') {
            const iblk = {
                nikib: datareq.nikiblk,
                sttib: datareq.sttiblk,
            };
            return iblk;
        } else {
            const iblk = {
                namaib: datareq.namaiblk,
                sttib: datareq.sttiblk,
            };
            return iblk;
        }
    }
    function pr() {
        if (datareq.sttkeluar === 'beda') {
            const pr = {
                nik: datareq.nikpr,
                namaay: datareq.bintipr,
            };
            return pr;
        } else {
            return {};
        }
    }
    async function caritujuan() {
        if (datareq.sttkeluar === 'sama') {
            const tujuan = {
                provinsi: datareq.provinsi,
                kabkot: datareq.kabkot,
                kec: datareq.kec,
                des: datareq.des,
                rt: datareq.rt,
                rw: datareq.rw,
                alamat: datareq.alamat,
            };
            return tujuan;
        } else if(datareq.sttkeluar === 'beda' && datareq.cektujuan === 'sama'){
            const pr = await Orang.findOne({nik: datareq.nikpr});
            var tujuan = {
                provinsi: pr.prov,
                kabkot: pr.kabkot,
                kec: pr.kec,
                des: pr.keldes,
                rt: pr.rt,
                rw: pr.rw,
                alamat: pr.jalan,
            };
            tujuan = await tujuan;
            return tujuan;
        } else {
            const prov = datareq.provinsi.split("-");
            const kk = datareq.kabkot.split("-");
            const kc = datareq.kec.split("-");
            const tujuan = {
                provinsi: prov[1],
                kabkot: kk[1],
                kec: kc[1],
                des: datareq.des,
                rt: datareq.rt,
                rw: datareq.rw,
                alamat: datareq.alamat,
            };
            return tujuan;
        }
    }
    const datalk = await lk();
    const dataaylk = await aylk();
    const dataiblk = await iblk();
    const cekdatapr = await pr();
    const datatujuan = await caritujuan();
    const mergedatalk = Object.assign(datalk, dataaylk, dataiblk);
    const data = Object.assign(reg, statuskeluar,{datalk: mergedatalk}, {datapr: cekdatapr}, {tujuan: datatujuan});
    await NikahKeluar.create(data, function (err, data) {
        if (err) {
            req.flash('gagal', err);
            console.log(err);
            // res.redirect('/nikah/keluar');
        }
    });
    req.flash('sukses', 'Berhasil menambah data person');
    // res.send(data);
    res.redirect('/nikah/keluar');
}

module.exports = {view_keluar, view_tambah_keluar, tambah_keluar}
