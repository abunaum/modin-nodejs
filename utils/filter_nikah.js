const Orang = require("../model/orang");
const moment = require("moment");
const filter_masuk = async function (data) {
    const tglreg = moment(data.tglregister).locale('id').format("YYYY-MM-DD");
    const datareg = {
        id: data._id,
        noreg: data.noreg,
        tglreg: tglreg,
    };

    async function pr() {
        if (data.nikpr) {
            const pr = await Orang.findOne({nik: data.nikpr});
            const datapr = {
                id: pr._id,
                nik: pr.nik,
                status: data.statuspr,
                nama: pr.nama,
                jk: pr.jk,
                tempat_lahir: pr.tempat_lahir,
                tanggal_lahir: moment(pr.tanggal_lahir).locale('id').format("YYYY-MM-DD"),
                pekerjaan: pr.pekerjaan,
                agama: pr.agama,
                wn: pr.wn,
                prov: pr.prov,
                kabkot: pr.kabkot,
                kec: pr.kec,
                keldes: pr.keldes,
                rt: pr.rt,
                rw: pr.rw,
                jalan: pr.jalan,
            };
            if (data.noacpr) {
                const dprnoac = Object.assign({noac: data.noacpr}, datapr);
                const fixpr = {data_pr: dprnoac};
                return fixpr;
            } else {
                const fixpr = {data_pr: datapr};
                return fixpr;
            }
        } else {
            const pr = {};
            return pr;
        }
    }

    const datapr = await pr();

    async function aypr() {
        if (data.sttaypr === 'ada') {
            const aypr = await Orang.findOne({nik: data.nikaypr});
            const dataaypr = {
                status: data.sttaypr,
                id: aypr._id,
                nik: aypr.nik,
                nama: aypr.nama,
                jk: aypr.jk,
                tempat_lahir: aypr.tempat_lahir,
                tanggal_lahir: moment(aypr.tanggal_lahir).locale('id').format("YYYY-MM-DD"),
                pekerjaan: aypr.pekerjaan,
                agama: aypr.agama,
                wn: aypr.wn,
                prov: aypr.prov,
                kabkot: aypr.kabkot,
                kec: aypr.kec,
                keldes: aypr.keldes,
                rt: aypr.rt,
                rw: aypr.rw,
                jalan: aypr.jalan,
            };
            if (data.binaypr) {
                const dayprbin = Object.assign({bin: data.binaypr}, dataaypr);
                const fixaypr = {data_aypr: dayprbin};
                return fixaypr;
            } else {
                const dayprbin = Object.assign({bin: ""}, dataaypr);
                const fixaypr = {data_aypr: dayprbin};
                return fixaypr;
            }
        } else {
            const daypr = {
                status: data.sttaypr,
                nama: data.namaaypr
            };
            const fixaypr = {data_aypr: daypr};
            return fixaypr;
        }
    }

    const dataaypr = await aypr();

    async function ibpr() {
        if (data.sttibpr === 'ada') {
            const ibpr = await Orang.findOne({nik: data.nikibpr});
            const dataibpr = {
                status: data.sttibpr,
                id: ibpr._id,
                nik: ibpr.nik,
                nama: ibpr.nama,
                jk: ibpr.jk,
                tempat_lahir: ibpr.tempat_lahir,
                tanggal_lahir: moment(ibpr.tanggal_lahir).locale('id').format("YYYY-MM-DD"),
                pekerjaan: ibpr.pekerjaan,
                agama: ibpr.agama,
                wn: ibpr.wn,
                prov: ibpr.prov,
                kabkot: ibpr.kabkot,
                kec: ibpr.kec,
                keldes: ibpr.keldes,
                rt: ibpr.rt,
                rw: ibpr.rw,
                jalan: ibpr.jalan,
            };
            if (data.bintiibpr) {
                const dibprbin = Object.assign({binti: data.bintiibpr}, dataibpr);
                const fixibpr = {data_ibpr: dibprbin};
                return fixibpr;
            } else {
                const dibprbinti = Object.assign({binti: ""}, dataibpr);
                const fixibpr = {data_ibpr: dibprbinti};
                return fixibpr;
            }
        } else {
            const dibpr = {
                status: data.sttibpr,
                nama: data.namaibpr
            };
            const fixibpr = {data_ibpr: dibpr};
            return fixibpr;
        }
    }

    const dataibpr = await ibpr();

    async function lk() {
        if (data.niklk) {
            const lk = await Orang.findOne({nik: data.niklk});
            const datalk = {
                id: lk._id,
                nik: lk.nik,
                status: data.statuslk,
                nama: lk.nama,
                jk: lk.jk,
                tempat_lahir: lk.tempat_lahir,
                tanggal_lahir: moment(lk.tanggal_lahir).locale('id').format("YYYY-MM-DD"),
                pekerjaan: lk.pekerjaan,
                agama: lk.agama,
                wn: lk.wn,
                prov: lk.prov,
                kabkot: lk.kabkot,
                kec: lk.kec,
                keldes: lk.keldes,
                rt: lk.rt,
                rw: lk.rw,
                jalan: lk.jalan,
                bin: data.binlk,
            };
            if (data.noaclk) {
                const dlknoac = Object.assign({noac: data.noaclk}, datalk);
                const fixlk = {data_lk: dlknoac};
                return fixlk;
            } else {
                const fixlk = {data_lk: datalk};
                return fixlk;
            }
        } else {
            const lk = {};
            return lk;
        }
    }

    const datalk = await lk();

    async function aylk() {
        if (data.sttkeldes === 'beda') {
            return {};
        } else {
            if (data.sttaylk === 'ada') {
                const aylk = await Orang.findOne({nik: data.nikaylk});
                const dataaylk = {
                    status: data.sttaylk,
                    id: aylk._id,
                    nik: aylk.nik,
                    nama: aylk.nama,
                    jk: aylk.jk,
                    tempat_lahir: aylk.tempat_lahir,
                    tanggal_lahir: moment(aylk.tanggal_lahir).locale('id').format("YYYY-MM-DD"),
                    pekerjaan: aylk.pekerjaan,
                    agama: aylk.agama,
                    wn: aylk.wn,
                    prov: aylk.prov,
                    kabkot: aylk.kabkot,
                    kec: aylk.kec,
                    keldes: aylk.keldes,
                    rt: aylk.rt,
                    rw: aylk.rw,
                    jalan: aylk.jalan,
                };
                if (data.binaylk) {
                    const daylkbin = Object.assign({bin: data.binaylk}, dataaylk);
                    const fixaylk = {data_aylk: daylkbin};
                    return fixaylk;
                } else {
                    const daylkbin = Object.assign({bin: ""}, dataaylk);
                    const fixaylk = {data_aylk: daylkbin};
                    return fixaylk;
                }
            } else {
                const daylk = {
                    status: data.sttaylk,
                    nama: data.namaaylk
                };
                const fixaylk = {data_aylk: daylk};
                return fixaylk;
            }
        }
    }

    const dataaylk = await aylk();

    async function iblk() {
        if (data.sttkeldes === 'beda') {
            return {};
        } else {
            if (data.sttiblk === 'ada') {
                const iblk = await Orang.findOne({nik: data.nikiblk});
                const dataiblk = {
                    status: data.sttiblk,
                    id: iblk._id,
                    nik: iblk.nik,
                    nama: iblk.nama,
                    jk: iblk.jk,
                    tempat_lahir: iblk.tempat_lahir,
                    tanggal_lahir: moment(iblk.tanggal_lahir).locale('id').format("YYYY-MM-DD"),
                    pekerjaan: iblk.pekerjaan,
                    agama: iblk.agama,
                    wn: iblk.wn,
                    prov: iblk.prov,
                    kabkot: iblk.kabkot,
                    kec: iblk.kec,
                    keldes: iblk.keldes,
                    rt: iblk.rt,
                    rw: iblk.rw,
                    jalan: iblk.jalan,
                };
                if (data.bintiiblk) {
                    const diblkbin = Object.assign({binti: data.bintiiblk}, dataiblk);
                    const fixiblk = {data_iblk: diblkbin};
                    return fixiblk;
                } else {
                    const diblkbinti = Object.assign({binti: ""}, dataiblk);
                    const fixiblk = {data_iblk: diblkbinti};
                    return fixiblk;
                }
            } else {
                const diblk = {
                    status: data.sttiblk,
                    nama: data.namaiblk
                };
                const fixiblk = {data_iblk: diblk};
                return fixiblk;
            }
        }
    }

    const dataiblk = await iblk();
    async function wali() {
        if (data.walinikah === 'lainnya') {
            const wali = await Orang.findOne({nik: data.nikwali});
            const datawali = {
                hubungan: data.hubungan_wali,
                id: wali._id,
                nik: wali.nik,
                nama: wali.nama,
                jk: wali.jk,
                tempat_lahir: wali.tempat_lahir,
                tanggal_lahir: moment(wali.tanggal_lahir).locale('id').format("YYYY-MM-DD"),
                pekerjaan: wali.pekerjaan,
                agama: wali.agama,
                wn: wali.wn,
                prov: wali.prov,
                kabkot: wali.kabkot,
                kec: wali.kec,
                keldes: wali.keldes,
                rt: wali.rt,
                rw: wali.rw,
                jalan: wali.jalan,
            };
            const fixwali = {data_wali: datawali};
            return fixwali;
        } else {
            return {};
        }
    }

    const datawali = await wali();

    const tglnikah = moment(data.tglnikah).locale('id').format("YYYY-MM-DDTHH:mm");
    const dataacara = {
        tempat_nikah: data.tempat_nikah,
        tglnikah: tglnikah,
        mas_kawin: data.mas_kawin,
    };
    return Object.assign(datareg, datapr, dataaypr, dataibpr, datalk, {status_keldes: data.sttkeldes}, dataaylk, dataiblk, {wali: data.walinikah}, datawali, dataacara);
}
module.exports = {filter_masuk};