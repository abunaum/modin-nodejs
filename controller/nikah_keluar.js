const { NikahKeluar } = require("../model/nikah");
const Orang = require("../model/orang");
const { check, body, validationResult } = require("express-validator");
const moment = require("moment/moment");
const { toDate } = require("validator");
const { filter_keluar } = require("../utils/filter_model");

const view_keluar = async (req, res) => {
  const datanikah = await NikahKeluar.find({ status: "keluar" });
  res.render("nikah/keluar/list", {
    title: "Nikah Keluar",
    info: req.session,
    datanikah,
    sukses: req.flash("sukses"),
    error: req.flash("error"),
    gagal: req.flash("gagal"),
  });
};

const view_tambah_keluar = async (req, res) => {
  const lk = await Orang.find({ jk: "lk" });
  const pr = await Orang.find({ jk: "pr" });
  res.render("nikah/keluar/tambah", {
    title: "Nikah Keluar",
    info: req.session,
    lk,
    pr,
    sukses: req.flash("sukses"),
    error: req.flash("error"),
    gagal: req.flash("gagal"),
  });
};
const tambah_keluar = [
  check("noreg", "Nomor Register harus diisi").notEmpty(),
  body("noreg").custom(async (value) => {
    const duplikat = await NikahKeluar.findOne({ noreg: value });
    if (duplikat) {
      throw new Error("Nomor register sudah terdaftar");
    }
    return true;
  }),
  check("niklk", "Nomor Register harus diisi").notEmpty(),
  body("niklk").custom(async (value) => {
    const carilk = await Orang.findOne({ nik: value });
    if (!carilk) {
      throw new Error("NIK catin pria tidak terdaftar");
    }
    return true;
  }),
  body("nikaylk").custom(async (value, { req }) => {
    if (req.body.sttaylk === "ada") {
      const cariaylk = await Orang.findOne({ nik: value });
      if (!cariaylk) {
        throw new Error("NIK ayah catin pria tidak terdaftar");
      }
    }
    return true;
  }),
  body("nikiblk").custom(async (value, { req }) => {
    if (req.body.sttiblk === "ada") {
      const cariib = await Orang.findOne({ nik: value });
      if (!cariib) {
        throw new Error("NIK ibu catin pria tidak terdaftar");
      }
    }
    return true;
  }),
  body("nikpr").custom(async (value, { req }) => {
    if (req.body.sttkeluar === "beda") {
      const caripr = await Orang.findOne({ nik: value });
      if (!caripr) {
        throw new Error("NIK catin wanita tidak terdaftar");
      }
    }
    return true;
  }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      req.flash("error", error);
      res.redirect("/nikah/keluar");
    } else {
      var datareq = req.body;
      const reg = {
        noreg: datareq.noreg,
        tglregister: datareq.tglregister,
        status: "keluar",
      };
      const statuskeluar = {
        statuskeluar: {
          kec: datareq.sttkeluar,
          tujuan: datareq.cektujuan,
        },
      };

      function lk() {
        if (datareq.statuslk === "duda") {
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
        if (datareq.sttaylk === "ada") {
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
        if (datareq.sttiblk === "ada") {
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
        if (datareq.sttkeluar === "beda") {
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
        if (datareq.sttkeluar === "satu") {
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
        } else if (
          datareq.sttkeluar === "beda" &&
          datareq.cektujuan === "sama"
        ) {
          const pr = await Orang.findOne({ nik: datareq.nikpr });
          const tujuan = {
            provinsi: pr.prov,
            kabkot: pr.kabkot,
            kec: pr.kec,
            des: pr.keldes,
            rt: pr.rt,
            rw: pr.rw,
            alamat: pr.jalan,
          };
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
      const data = Object.assign(
        reg,
        statuskeluar,
        { datalk: mergedatalk },
        { datapr: cekdatapr },
        { tujuan: datatujuan }
      );
      await NikahKeluar.create(data, function (err, data) {
        if (err) {
          req.flash("gagal", err);
          res.redirect("/nikah/keluar");
        }
      });
      req.flash("sukses", "Berhasil menambah data nikah keluar");
      res.redirect("/nikah/keluar");
    }
  },
];
const view_edit_keluar = async (req, res) => {
  const id = req.params.id;
  var datanikah = await NikahKeluar.findById(id).lean();
  const lk = await Orang.find({ jk: "lk" });
  const pr = await Orang.find({ jk: "pr" });
  datanikah.tglregister = moment(datanikah.tglregister).format("YYYY-MM-DD");
  res.render("nikah/keluar/edit", {
    title: "Nikah Keluar",
    info: req.session,
    datanikah,
    lk,
    pr,
    sukses: req.flash("sukses"),
    error: req.flash("error"),
    gagal: req.flash("gagal"),
  });
};

const edit_keluar = [
  check("noreg_ori", "Nomor Register harus diisi").notEmpty(),
  check("noreg", "Nomor Register harus diisi").notEmpty(),
  body("noreg").custom(async (value, { req }) => {
    const duplikat = await NikahKeluar.findOne({ noreg: value });
    if (value !== req.body.noreg_ori && duplikat) {
      throw new Error("Nomor register sudah terdaftar");
    }
    return true;
  }),
  check("niklk", "Nomor Register harus diisi").notEmpty(),
  body("niklk").custom(async (value) => {
    const carilk = await Orang.findOne({ nik: value });
    if (!carilk) {
      throw new Error("NIK catin pria tidak terdaftar");
    }
    return true;
  }),
  body("nikaylk").custom(async (value, { req }) => {
    if (req.body.sttaylk === "ada") {
      const cariaylk = await Orang.findOne({ nik: value });
      if (!cariaylk) {
        throw new Error("NIK ayah catin pria tidak terdaftar");
      }
    }
    return true;
  }),
  body("nikiblk").custom(async (value, { req }) => {
    if (req.body.sttiblk === "ada") {
      const cariib = await Orang.findOne({ nik: value });
      if (!cariib) {
        throw new Error("NIK ibu catin pria tidak terdaftar");
      }
    }
    return true;
  }),
  body("nikpr").custom(async (value, { req }) => {
    if (req.body.sttkeluar === "beda") {
      const caripr = await Orang.findOne({ nik: value });
      if (!caripr) {
        throw new Error("NIK catin wanita tidak terdaftar");
      }
    }
    return true;
  }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      req.flash("error", error);
      res.redirect("/nikah/keluar");
    } else {
      const id = req.body.id;
      var datareq = req.body;
      delete datareq.noreg_ori;
      delete datareq.id;
      const reg = {
        noreg: datareq.noreg,
        tglregister: datareq.tglregister,
        status: "keluar",
      };
      const statuskeluar = {
        statuskeluar: {
          kec: datareq.sttkeluar,
          tujuan: datareq.cektujuan,
        },
      };

      function lk() {
        if (datareq.statuslk === "duda") {
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
        if (datareq.sttaylk === "ada") {
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
        if (datareq.sttiblk === "ada") {
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
        if (datareq.sttkeluar === "beda") {
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
        if (datareq.sttkeluar === "sama") {
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
        } else if (
          datareq.sttkeluar === "beda" &&
          datareq.cektujuan === "sama"
        ) {
          const pr = await Orang.findOne({ nik: datareq.nikpr });
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
      const data = Object.assign(
        reg,
        statuskeluar,
        { datalk: mergedatalk },
        { datapr: cekdatapr },
        { tujuan: datatujuan }
      );
      await NikahKeluar.findOneAndReplace(
        {
          uuid: id,
        },
        data
      );
      req.flash("sukses", "Berhasil mengedit data nikah");
      res.redirect("/nikah/keluar");
    }
  },
];

const detail_keluar = async (req, res) => {
  const detailreg = await NikahKeluar.findById(req.params.id);
  const dr = await filter_keluar(detailreg);
  res.render("nikah/keluar/detail", {
    title: "Nikah Keluar",
    info: req.session,
    dr,
    sukses: req.flash("sukses"),
    error: req.flash("error"),
    gagal: req.flash("gagal"),
  });
};

const delete_keluar = (req, res) => {
  NikahKeluar.deleteOne({ _id: req.body.id }).then((result) => {
    req.flash("sukses", "Data berhasil dihapus");
    res.redirect("/nikah/keluar");
  });
};

module.exports = {
  view_keluar,
  view_tambah_keluar,
  tambah_keluar,
  view_edit_keluar,
  edit_keluar,
  detail_keluar,
  delete_keluar,
};
