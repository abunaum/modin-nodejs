const Nikah = require("../model/nikah");
const Orang = require("../model/orang");
const {check, body, validationResult} = require("express-validator");
const moment = require("moment/moment");
const {toDate} = require("validator");
const {filter_masuk} = require("../utils/filter_nikah")

const delete_masuk = (req, res) => {
    Nikah.deleteOne({_id: req.body.id}).then((result) => {
        req.flash('sukses', 'Data berhasil dihapus');
        res.redirect('/nikah/masuk');
    });
}

const view_masuk = async (req, res) => {
    const datanikah = await Nikah.find({status: 'masuk'});
    res.render('nikah/list_masuk', {
        title: 'Nikah Masuk',
        info: req.session,
        datanikah,
        sukses: req.flash('sukses'),
        error: req.flash('error'),
        gagal: req.flash('gagal'),
    });
}

const view_tambah_masuk = async (req, res) => {
    const lk = await Orang.find({jk: 'lk'});
    const pr = await Orang.find({jk: 'pr'});
    res.render('nikah/masuk_tambah', {
        title: 'Nikah Masuk',
        info: req.session,
        lk,
        pr,
        sukses: req.flash('sukses'),
        error: req.flash('error'),
        gagal: req.flash('gagal'),
    });
}

const edit_masuk = [
    check('noreg', 'Nomor Register harus diisi').notEmpty(),
    body('noreg').custom(async (value, {req}) => {
        const duplikat = await Nikah.findOne({noreg: value});
        if (value !== req.body.noreg_ori && duplikat) {
            throw new Error('Nomor register sudah terdaftar');
        }
        return true;
    }),
    body('nikpr').custom(async (value) => {
        const caripr = await Orang.findOne({nikpr: value});
        if (!caripr) {
            throw new Error('NIK catin wanita tidak terdaftar');
        }
        return true;
    }),
    body('nikaypr').custom(async (value, {req}) => {
        if (req.body.sttaypr === 'ada') {
            const cariaypr = await Orang.findOne({nikaypr: value});
            if (!cariaypr) {
                throw new Error('NIK ayah catin wanita tidak terdaftar');
            }
        }
        return true;
    }),
    body('nikibpr').custom(async (value, {req}) => {
        if (req.body.sttibpr === 'ada') {
            const cariibpr = await Orang.findOne({nikibpr: value});
            if (!cariibpr) {
                throw new Error('NIK ibu catin wanita tidak terdaftar');
            }
        }
        return true;
    }),
    body('niklk').custom(async (value) => {
        const carilk = await Orang.findOne({niklk: value});
        if (!carilk) {
            throw new Error('NIK catin pria tidak terdaftar');
        }
        return true;
    }),
    body('nikaylk').custom(async (value, {req}) => {
        if (req.body.sttkeldes === 'satu' && req.body.sttaylk === 'ada') {
            const cariaylk = await Orang.findOne({nikaylk: value});
            if (!cariaylk) {
                throw new Error('NIK ayah catin pria tidak terdaftar');
            }
        }
        return true;
    }),
    body('nikiblk').custom(async (value, {req}) => {
        if (req.body.sttkeldes === 'satu' && req.body.sttiblk === 'ada') {
            const cariiblk = await Orang.findOne({nikiblk: value});
            if (!cariiblk) {
                throw new Error('NIK ibu catin pria tidak terdaftar');
            }
        }
        return true;
    }),
    body('nikwali').custom(async (value, {req}) => {
        if (req.body.walinikah === 'lainnya') {
            const cariwali = await Orang.findOne({nikwali: value});
            if (!cariwali) {
                throw new Error('NIK wali tidak terdaftar');
            }
        }
        return true;
    }),
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            req.flash('error', error);
            res.redirect('/nikah/masuk');
        } else {
            const id = req.body.id;
            const datareq = req.body;
            delete datareq.noreg_ori;
            delete datareq.id;
            const reg = {
                noreg: datareq.noreg,
                tglregister: datareq.tglregister

            };

            function pr() {
                if (datareq.statuspr === 'janda') {
                    const pr = {
                        nikpr: datareq.nikpr,
                        statuspr: datareq.statuspr,
                        noacpr: datareq.noacpr,
                    };
                    return pr;
                } else {
                    const pr = {
                        nikpr: datareq.nikpr,
                        statuspr: datareq.statuspr,
                    };
                    return pr;
                }
            }

            function aypr() {
                if (datareq.sttaypr === 'ada') {
                    const aypr = {
                        sttaypr: datareq.sttaypr,
                        nikaypr: datareq.nikaypr,
                        binaypr: datareq.binaypr,
                    };
                    return aypr;
                } else {
                    const aypr = {
                        sttaypr: datareq.sttaypr,
                        namaaypr: datareq.namaaypr,
                    };
                    return aypr;
                }
            }

            function ibpr() {
                if (datareq.sttibpr === 'ada') {
                    const ibpr = {
                        sttibpr: datareq.sttibpr,
                        nikibpr: datareq.nikibpr,
                        bintiibpr: datareq.bintiibpr,
                    };
                    return ibpr;
                } else {
                    const ibpr = {
                        sttibpr: datareq.sttibpr,
                        namaibpr: datareq.namaibpr,
                    };
                    return ibpr;
                }
            }

            const datapr = Object.assign(pr(), aypr(), ibpr());
            const sttkeldes = {
                sttkeldes: datareq.sttkeldes,
            };

            function lk() {
                if (datareq.statuslk === 'duda') {
                    const lk = {
                        niklk: datareq.niklk,
                        statuslk: datareq.statuslk,
                        binlk: datareq.binlk,
                        noaclk: datareq.noaclk,
                    };
                    return lk;
                } else {
                    const lk = {
                        niklk: datareq.niklk,
                        statuslk: datareq.statuslk,
                        binlk: datareq.binlk,
                    };
                    return lk;
                }
            }

            function datalk() {
                if (datareq.sttkeldes === 'beda') {
                    const datalk = Object.assign(sttkeldes, lk());
                    return datalk;
                } else {
                    function aylk() {
                        if (datareq.sttaylk === 'ada') {
                            const aylk = {
                                sttaylk: datareq.sttaylk,
                                nikaylk: datareq.nikaylk,
                                binaylk: datareq.binaylk,
                            };
                            return aylk;
                        } else {
                            const aylk = {
                                sttaylk: datareq.sttaylk,
                                namaaylk: datareq.namaaylk,
                            };
                            return aylk;
                        }
                    }

                    function iblk() {
                        if (datareq.sttiblk === 'ada') {
                            const iblk = {
                                sttiblk: datareq.sttiblk,
                                nikiblk: datareq.nikiblk,
                                bintiiblk: datareq.bintiiblk,
                            };
                            return iblk;
                        } else {
                            const iblk = {
                                sttiblk: datareq.sttiblk,
                                namaiblk: datareq.namaiblk,
                            };
                            return iblk;
                        }
                    }

                    const datalk = Object.assign(sttkeldes, lk(), aylk(), iblk());
                    return datalk;
                }
            }

            function wali() {
                if (datareq.walinikah === 'lainnya') {
                    const wali = {
                        walinikah: datareq.walinikah,
                        nikwali: datareq.nikwali,
                        hubungan_wali: datareq.hubungan_wali,
                    };
                    return wali;
                } else {
                    const wali = {
                        walinikah: datareq.walinikah,
                    };
                    return wali;
                }
            }

            function acara() {
                const acara = {
                    tempat_nikah: datareq.tempat_nikah,
                    tglnikah: toDate(datareq.tglnikah),
                    mas_kawin: datareq.mas_kawin,
                };
                return acara;
            }

            const status = {status: 'masuk'};
            const data = Object.assign(reg, datapr, datalk(), wali(), acara(), status);
            await Nikah.replaceOne(
                {
                    _id: id
                },
                data
            );
            req.flash('sukses', 'Berhasil mengedit data nikah');
            res.redirect('/nikah/masuk');
        }
    }
]

const view_edit_masuk = async (req, res) => {
    const id = req.params.id;
    const datanikah = await Nikah.findById(id);
    const lk = await Orang.find({jk: 'lk'});
    const pr = await Orang.find({jk: 'pr'});
    const dn = await filter_masuk(datanikah);
    res.render('nikah/masuk_edit', {
        title: 'Nikah Masuk',
        info: req.session,
        datanikah: dn,
        lk,
        pr,
        sukses: req.flash('sukses'),
        error: req.flash('error'),
        gagal: req.flash('gagal'),
    });
}

const tambah_masuk = [
    check('noreg', 'Nomor Register harus diisi').notEmpty(),
    body('noreg').custom(async (value) => {
        const duplikat = await Nikah.findOne({noreg: value});
        if (duplikat) {
            throw new Error('Nomor register sudah terdaftar');
        }
        return true;
    }),
    body('nikpr').custom(async (value) => {
        const caripr = await Orang.findOne({nikpr: value});
        if (!caripr) {
            throw new Error('NIK catin wanita tidak terdaftar');
        }
        return true;
    }),
    body('nikaypr').custom(async (value, {req}) => {
        if (req.body.sttaypr === 'ada') {
            const cariaypr = await Orang.findOne({nikaypr: value});
            if (!cariaypr) {
                throw new Error('NIK ayah catin wanita tidak terdaftar');
            }
        }
        return true;
    }),
    body('nikibpr').custom(async (value, {req}) => {
        if (req.body.sttibpr === 'ada') {
            const cariibpr = await Orang.findOne({nikibpr: value});
            if (!cariibpr) {
                throw new Error('NIK ibu catin wanita tidak terdaftar');
            }
        }
        return true;
    }),
    body('niklk').custom(async (value) => {
        const carilk = await Orang.findOne({niklk: value});
        if (!carilk) {
            throw new Error('NIK catin pria tidak terdaftar');
        }
        return true;
    }),
    body('nikaylk').custom(async (value, {req}) => {
        if (req.body.sttkeldes === 'satu' && req.body.sttaylk === 'ada') {
            const cariaylk = await Orang.findOne({nikaylk: value});
            if (!cariaylk) {
                throw new Error('NIK ayah catin pria tidak terdaftar');
            }
        }
        return true;
    }),
    body('nikiblk').custom(async (value, {req}) => {
        if (req.body.sttkeldes === 'satu' && req.body.sttiblk === 'ada') {
            const cariiblk = await Orang.findOne({nikiblk: value});
            if (!cariiblk) {
                throw new Error('NIK ibu catin pria tidak terdaftar');
            }
        }
        return true;
    }),
    body('nikwali').custom(async (value, {req}) => {
        if (req.body.walinikah === 'lainnya') {
            const cariwali = await Orang.findOne({nikwali: value});
            if (!cariwali) {
                throw new Error('NIK wali tidak terdaftar');
            }
        }
        return true;
    }),
    (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            req.flash('error', error);
            res.redirect('/nikah/masuk');
        } else {
            const datareq = req.body;
            const reg = {
                noreg: datareq.noreg,
                tglregister: datareq.tglregister

            };

            function pr() {
                if (datareq.statuspr === 'janda') {
                    const pr = {
                        nikpr: datareq.nikpr,
                        statuspr: datareq.statuspr,
                        noacpr: datareq.noacpr,
                    };
                    return pr;
                } else {
                    const pr = {
                        nikpr: datareq.nikpr,
                        statuspr: datareq.statuspr,
                    };
                    return pr;
                }
            }

            function aypr() {
                if (datareq.sttaypr === 'ada') {
                    const aypr = {
                        sttaypr: datareq.sttaypr,
                        nikaypr: datareq.nikaypr,
                        binaypr: datareq.binaypr,
                    };
                    return aypr;
                } else {
                    const aypr = {
                        sttaypr: datareq.sttaypr,
                        namaaypr: datareq.namaaypr,
                    };
                    return aypr;
                }
            }

            function ibpr() {
                if (datareq.sttibpr === 'ada') {
                    const ibpr = {
                        sttibpr: datareq.sttibpr,
                        nikibpr: datareq.nikibpr,
                        bintiibpr: datareq.bintiibpr,
                    };
                    return ibpr;
                } else {
                    const ibpr = {
                        sttibpr: datareq.sttibpr,
                        namaibpr: datareq.namaibpr,
                    };
                    return ibpr;
                }
            }

            const datapr = Object.assign(pr(), aypr(), ibpr());
            const sttkeldes = {
                sttkeldes: datareq.sttkeldes,
            };

            function lk() {
                if (datareq.statuslk === 'duda') {
                    const lk = {
                        niklk: datareq.niklk,
                        statuslk: datareq.statuslk,
                        binlk: datareq.binlk,
                        noaclk: datareq.noaclk,
                    };
                    return lk;
                } else {
                    const lk = {
                        niklk: datareq.niklk,
                        statuslk: datareq.statuslk,
                        binlk: datareq.binlk,
                    };
                    return lk;
                }
            }

            function datalk() {
                if (datareq.sttkeldes === 'beda') {
                    const datalk = Object.assign(sttkeldes, lk());
                    return datalk;
                } else {
                    function aylk() {
                        if (datareq.sttaylk === 'ada') {
                            const aylk = {
                                sttaylk: datareq.sttaylk,
                                nikaylk: datareq.nikaylk,
                                binaylk: datareq.binaylk,
                            };
                            return aylk;
                        } else {
                            const aylk = {
                                sttaylk: datareq.sttaylk,
                                namaaylk: datareq.namaaylk,
                            };
                            return aylk;
                        }
                    }

                    function iblk() {
                        if (datareq.sttiblk === 'ada') {
                            const iblk = {
                                sttiblk: datareq.sttiblk,
                                nikiblk: datareq.nikiblk,
                                bintiiblk: datareq.bintiiblk,
                            };
                            return iblk;
                        } else {
                            const iblk = {
                                sttiblk: datareq.sttiblk,
                                namaiblk: datareq.namaiblk,
                            };
                            return iblk;
                        }
                    }

                    const datalk = Object.assign(sttkeldes, lk(), aylk(), iblk());
                    return datalk;
                }
            }

            function wali() {
                if (datareq.walinikah === 'lainnya') {
                    const wali = {
                        walinikah: datareq.walinikah,
                        nikwali: datareq.nikwali,
                        hubungan_wali: datareq.hubungan_wali,
                    };
                    return wali;
                } else {
                    const wali = {
                        walinikah: datareq.walinikah,
                    };
                    return wali;
                }
            }

            function acara() {
                const acara = {
                    tempat_nikah: datareq.tempat_nikah,
                    tglnikah: toDate(datareq.tglnikah),
                    mas_kawin: datareq.mas_kawin,
                };
                return acara;
            }

            const status = {status: 'masuk'};
            const data = Object.assign(reg, datapr, datalk(), wali(), acara(), status);
            Nikah.create(data, function (err, orang) {
                if (err) {
                    req.flash('gagal', err);
                }
            });
            req.flash('sukses', 'Berhasil menambah data person');
        }
        res.redirect('/nikah/masuk');
    }
]

const detail_masuk = async (req, res) => {
    const detailreg = await Nikah.findById(req.params.id);
    const dr = await filter_masuk(detailreg);
    res.render('nikah/detail_masuk', {
        title: 'Nikah Masuk',
        info: req.session,
        dr,
        sukses: req.flash('sukses'),
        error: req.flash('error'),
        gagal: req.flash('gagal'),
    });
}

module.exports = {delete_masuk, view_masuk, view_tambah_masuk, edit_masuk, view_edit_masuk, tambah_masuk, detail_masuk}