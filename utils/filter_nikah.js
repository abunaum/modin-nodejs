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
        if (data.datapr.nik) {
            const pr = await Orang.findOne({nik: data.datapr.nik});
            const datapr = {
                id: pr._id,
                nik: pr.nik,
                status: data.datapr.status,
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
                const dprnoac = Object.assign({noac: data.datapr.noac}, datapr);
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
        if (data.datapr.sttay === 'ada') {
            const aypr = await Orang.findOne({nik: data.datapr.nikay});
            const dataaypr = {
                status: data.datapr.sttay,
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
            if (data.datapr.binay) {
                const dayprbin = Object.assign({bin: data.datapr.binay}, dataaypr);
                const fixaypr = {data_aypr: dayprbin};
                return fixaypr;
            } else {
                const dayprbin = Object.assign({bin: ""}, dataaypr);
                const fixaypr = {data_aypr: dayprbin};
                return fixaypr;
            }
        } else {
            const daypr = {
                status: data.datapr.sttay,
                nama: data.datapr.namaay
            };
            const fixaypr = {data_aypr: daypr};
            return fixaypr;
        }
    }

    const dataaypr = await aypr();

    async function ibpr() {
        if (data.datapr.sttib === 'ada') {
            const ibpr = await Orang.findOne({nik: data.datapr.nikib});
            const dataibpr = {
                status: data.datapr.sttib,
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
            if (data.datapr.bintiib) {
                const dibprbin = Object.assign({binti: data.datapr.bintiib}, dataibpr);
                const fixibpr = {data_ibpr: dibprbin};
                return fixibpr;
            } else {
                const dibprbinti = Object.assign({binti: ""}, dataibpr);
                const fixibpr = {data_ibpr: dibprbinti};
                return fixibpr;
            }
        } else {
            const dibpr = {
                status: data.datapr.sttib,
                nama: data.datapr.namaib
            };
            const fixibpr = {data_ibpr: dibpr};
            return fixibpr;
        }
    }

    const dataibpr = await ibpr();

    async function lk() {
        if (data.datalk.nik) {
            const lk = await Orang.findOne({nik: data.datalk.nik});
            const datalk = {
                id: lk._id,
                nik: lk.nik,
                status: data.datalk.status,
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
                bin: data.datalk.namaay,
            };
            if (data.datalk.noac) {
                const dlknoac = Object.assign({noac: data.datalk.noac}, datalk);
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
            if (data.datalk.sttay === 'ada') {
                const aylk = await Orang.findOne({nik: data.datalk.nikay});
                const dataaylk = {
                    status: data.datalk.sttay,
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
                if (data.datalk.binay) {
                    const daylkbin = Object.assign({bin: data.datalk.binay}, dataaylk);
                    const fixaylk = {data_aylk: daylkbin};
                    return fixaylk;
                } else {
                    const daylkbin = Object.assign({bin: ""}, dataaylk);
                    const fixaylk = {data_aylk: daylkbin};
                    return fixaylk;
                }
            } else {
                const daylk = {
                    status: data.datalk.sttay,
                    nama: data.datalk.namaay
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
            if (data.datalk.sttib === 'ada') {
                const iblk = await Orang.findOne({nik: data.datalk.nikib});
                const dataiblk = {
                    status: data.datalk.sttib,
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
                if (data.datalk.bintiib) {
                    const diblkbin = Object.assign({binti: data.datalk.bintiib}, dataiblk);
                    const fixiblk = {data_iblk: diblkbin};
                    return fixiblk;
                } else {
                    const diblkbinti = Object.assign({binti: ""}, dataiblk);
                    const fixiblk = {data_iblk: diblkbinti};
                    return fixiblk;
                }
            } else {
                const diblk = {
                    status: data.datalk.sttib,
                    nama: data.datalk.namaib
                };
                const fixiblk = {data_iblk: diblk};
                return fixiblk;
            }
        }
    }

    const dataiblk = await iblk();
    async function wali() {
        if (data.acara.walinikah === 'lainnya') {
            const wali = await Orang.findOne({nik: data.acara.nikwali});
            const datawali = {
                walinikah: data.acara.walinikah,
                hubungan: data.acara.hubungan_wali,
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
            const datawali = {
                walinikah: data.acara.walinikah,
            };
            const fixwali = {data_wali: datawali};
            return fixwali;
        }
    }

    const datawali = await wali();

    const tglnikah = moment(data.acara.tglnikah).locale('id').format("YYYY-MM-DDTHH:mm");
    const dataacara = {
        tempat_nikah: data.acara.tempat_nikah,
        tglnikah: tglnikah,
        mas_kawin: data.acara.mas_kawin,
    };
    return Object.assign(datareg, datapr, dataaypr, dataibpr, datalk, {status_keldes: data.sttkeldes}, dataaylk, dataiblk, {wali: data.walinikah}, datawali, dataacara);
}
module.exports = {filter_masuk};