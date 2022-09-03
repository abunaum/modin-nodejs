const {NikahMasuk} = require("../model/nikah");
const Orang = require("../model/orang");
const {check, body, validationResult} = require("express-validator");
const moment = require("moment/moment");
const {toDate} = require("validator");
const {filter_masuk} = require("../utils/filter_nikah");

const delete_masuk = (req, res) => {
    NikahMasuk.deleteOne({_id: req.body.id}).then((result) => {
        req.flash('sukses', 'Data berhasil dihapus');
        res.redirect('/nikah/masuk');
    });
}

const view_masuk = async (req, res) => {
    const datanikah = await NikahMasuk.find({status: 'masuk'});
    res.render('nikah/masuk/list', {
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
    res.render('nikah/masuk/tambah', {
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
        const duplikat = await NikahMasuk.findOne({noreg: value});
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
                tglregister: datareq.tglregister,
                sttkeldes: datareq.sttkeldes

            };

            function pr() {
                if (datareq.statuspr === 'janda') {
                    const pr = {
                        nik: datareq.nikpr,
                        status: datareq.statuspr,
                        noac: datareq.noacpr,
                    };
                    return pr;
                } else {
                    const pr = {
                        nik: datareq.nikpr,
                        status: datareq.statuspr,
                    };
                    return pr;
                }
            }

            function aypr() {
                if (datareq.sttaypr === 'ada') {
                    const aypr = {
                        sttay: datareq.sttaypr,
                        nikay: datareq.nikaypr,
                        binay: datareq.binaypr,
                    };
                    return aypr;
                } else {
                    const aypr = {
                        sttay: datareq.sttaypr,
                        namaay: datareq.namaaypr,
                    };
                    return aypr;
                }
            }

            function ibpr() {
                if (datareq.sttibpr === 'ada') {
                    const ibpr = {
                        sttib: datareq.sttibpr,
                        nikib: datareq.nikibpr,
                        bintiib: datareq.bintiibpr,
                    };
                    return ibpr;
                } else {
                    const ibpr = {
                        sttib: datareq.sttibpr,
                        namaib: datareq.namaibpr,
                    };
                    return ibpr;
                }
            }

            const datanyapr = await Object.assign(pr(), aypr(), ibpr());

            function lk() {
                if (datareq.statuslk === 'duda') {
                    if (datareq.sttkeldes === 'beda') {
                        const lk = {
                            nik: datareq.niklk,
                            status: datareq.statuslk,
                            namaay: datareq.binlk,
                            noac: datareq.noaclk,
                        };
                        return lk;
                    } else {
                        const lk = {
                            nik: datareq.niklk,
                            status: datareq.statuslk,
                            noac: datareq.noaclk,
                        };
                        return lk;
                    }
                } else {
                    const lk = {
                        nik: datareq.niklk,
                        status: datareq.statuslk,
                        namaay: datareq.binlk,
                    };
                    return lk;
                }
            }

            function datanyalk() {
                if (datareq.sttkeldes === 'beda') {
                    const datalk = lk();
                    return datalk;
                } else {
                    function aylk() {
                        if (datareq.sttaylk === 'ada') {
                            const aylk = {
                                sttay: datareq.sttaylk,
                                nikay: datareq.nikaylk,
                                binay: datareq.binaylk,
                            };
                            return aylk;
                        } else {
                            const aylk = {
                                sttay: datareq.sttaylk,
                                namaay: datareq.namaaylk,
                            };
                            return aylk;
                        }
                    }

                    function iblk() {
                        if (datareq.sttiblk === 'ada') {
                            const iblk = {
                                sttib: datareq.sttiblk,
                                nikib: datareq.nikiblk,
                                bintiib: datareq.bintiiblk,
                            };
                            return iblk;
                        } else {
                            const iblk = {
                                sttib: datareq.sttiblk,
                                namaib: datareq.namaiblk,
                            };
                            return iblk;
                        }
                    }

                    const datalk = Object.assign(lk(), aylk(), iblk());
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

            function acaranya() {
                const acara = {
                    tempat_nikah: datareq.tempat_nikah,
                    tglnikah: toDate(datareq.tglnikah),
                    mas_kawin: datareq.mas_kawin,
                };
                return acara;
            }

            const status = {status: 'masuk'};
            const cekpr = {datapr: datanyapr};
            const carilk = await datanyalk();
            const cariwali = await wali();
            const cariacara = await acaranya();
            const ceklk = {datalk: carilk}
            const dataacara = Object.assign(cariwali, cariacara);
            const data = Object.assign(reg, cekpr, ceklk, {acara: dataacara}, status);
            await NikahMasuk.findOneAndReplace(
                {
                    uuid: id
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
    var datanikah = await NikahMasuk.findById(id).lean();
    const lk = await Orang.find({jk: 'lk'});
    const pr = await Orang.find({jk: 'pr'});
    datanikah.tglregister = moment(datanikah.tglregister).format('YYYY-MM-DD');
    datanikah.acara.tglnikah = moment(datanikah.acara.tglnikah).format('YYYY-MM-DDTHH:mm');
    res.render('nikah/masuk/edit', {
        title: 'Nikah Masuk',
        info: req.session,
        datanikah,
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
        const duplikat = await NikahMasuk.findOne({noreg: value});
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
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            req.flash('error', error);
            res.redirect('/nikah/masuk');
        } else {
            const datareq = req.body;
            const reg = {
                noreg: datareq.noreg,
                tglregister: datareq.tglregister,
                sttkeldes: datareq.sttkeldes

            };

            function pr() {
                if (datareq.statuspr === 'janda') {
                    const pr = {
                        nik: datareq.nikpr,
                        status: datareq.statuspr,
                        noac: datareq.noacpr,
                    };
                    return pr;
                } else {
                    const pr = {
                        nik: datareq.nikpr,
                        status: datareq.statuspr,
                    };
                    return pr;
                }
            }

            function aypr() {
                if (datareq.sttaypr === 'ada') {
                    const aypr = {
                        sttay: datareq.sttaypr,
                        nikay: datareq.nikaypr,
                        binay: datareq.binaypr,
                    };
                    return aypr;
                } else {
                    const aypr = {
                        sttay: datareq.sttaypr,
                        namaay: datareq.namaaypr,
                    };
                    return aypr;
                }
            }

            function ibpr() {
                if (datareq.sttibpr === 'ada') {
                    const ibpr = {
                        sttib: datareq.sttibpr,
                        nikib: datareq.nikibpr,
                        bintiib: datareq.bintiibpr,
                    };
                    return ibpr;
                } else {
                    const ibpr = {
                        sttib: datareq.sttibpr,
                        namaib: datareq.namaibpr,
                    };
                    return ibpr;
                }
            }

            const datanyapr = await Object.assign(pr(), aypr(), ibpr());

            function lk() {
                if (datareq.statuslk === 'duda') {
                    if (datareq.sttkeldes === 'beda') {
                        const lk = {
                            nik: datareq.niklk,
                            status: datareq.statuslk,
                            namaay: datareq.binlk,
                            noac: datareq.noaclk,
                        };
                        return lk;
                    } else {
                        const lk = {
                            nik: datareq.niklk,
                            status: datareq.statuslk,
                            noac: datareq.noaclk,
                        };
                        return lk;
                    }
                } else {
                    const lk = {
                        nik: datareq.niklk,
                        status: datareq.statuslk,
                        namaay: datareq.binlk,
                    };
                    return lk;
                }
            }

            function datanyalk() {
                if (datareq.sttkeldes === 'beda') {
                    const datalk = lk();
                    return datalk;
                } else {
                    function aylk() {
                        if (datareq.sttaylk === 'ada') {
                            const aylk = {
                                sttay: datareq.sttaylk,
                                nikay: datareq.nikaylk,
                                binay: datareq.binaylk,
                            };
                            return aylk;
                        } else {
                            const aylk = {
                                sttay: datareq.sttaylk,
                                namaay: datareq.namaaylk,
                            };
                            return aylk;
                        }
                    }

                    function iblk() {
                        if (datareq.sttiblk === 'ada') {
                            const iblk = {
                                sttib: datareq.sttiblk,
                                nikib: datareq.nikiblk,
                                bintiib: datareq.bintiiblk,
                            };
                            return iblk;
                        } else {
                            const iblk = {
                                sttib: datareq.sttiblk,
                                namaib: datareq.namaiblk,
                            };
                            return iblk;
                        }
                    }

                    const datalk = Object.assign(lk(), aylk(), iblk());
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

            function acaranya() {
                const acara = {
                    tempat_nikah: datareq.tempat_nikah,
                    tglnikah: toDate(datareq.tglnikah),
                    mas_kawin: datareq.mas_kawin,
                };
                return acara;
            }

            const status = {status: 'masuk'};
            const cekpr = {datapr: datanyapr};
            const carilk = await datanyalk();
            const cariwali = await wali();
            const cariacara = await acaranya();
            const ceklk = {datalk: carilk}
            const dataacara = Object.assign(cariwali, cariacara);
            const data = Object.assign(reg, cekpr, ceklk, {acara: dataacara}, status);
            NikahMasuk.create(data, function (err, orang) {
                if (err) {
                    req.flash('gagal', err);
                    res.redirect('/nikah/masuk');
                }
            });
            req.flash('sukses', 'Berhasil menambah data person');
        }
        res.redirect('/nikah/masuk');
    }
]

const detail_masuk = async (req, res) => {
    const detailreg = await NikahMasuk.findById(req.params.id);
    const dr = await filter_masuk(detailreg);
    res.render('nikah/masuk/detail', {
        title: 'Nikah Masuk',
        info: req.session,
        dr,
        sukses: req.flash('sukses'),
        error: req.flash('error'),
        gagal: req.flash('gagal'),
    });
}

module.exports = {delete_masuk, view_masuk, view_tambah_masuk, edit_masuk, view_edit_masuk, tambah_masuk, detail_masuk}