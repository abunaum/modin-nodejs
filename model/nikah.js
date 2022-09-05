const mongoose = require("mongoose");

const tujuanSchema = {
    provinsi: {
        type: String,
        required: false,
    },
    kabkot: {
        type: String,
        required: false,
    },
    kec: {
        type: String,
        required: false,
    },
    des: {
        type: String,
        required: false,
    },
    rt: {
        type: String,
        required: false,
    },
    rw: {
        type: String,
        required: false,
    },
    alamat: {
        type: String,
        required: false,
    }
}

const statuskeluarSchema = {
    kec: {
        type: String,
        required: true,
    },
    tujuan: {
        type: String,
        required: true,
    },
}

const lkSchema ={
    nik: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    noac: {
        type: String,
        required: false,
    },
    sttay: {
        type: String,
        required: false,
    },
    nikay: {
        type: Number,
        required: false,
    },
    namaay: {
        type: String,
        required: false,
    },
    sttib: {
        type: String,
        required: false,
    },
    nikib: {
        type: Number,
        required: false,
    },
    namaib: {
        type: String,
        required: false,
    },
}

const prSchema ={
    nik: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    noac: {
        type: String,
        required: false,
    },
    sttay: {
        type: String,
        required: false,
    },
    nikay: {
        type: Number,
        required: false,
    },
    binay: {
        type: String,
        required: false,
    },
    namaay: {
        type: String,
        required: false,
    },
    sttib: {
        type: String,
        required: false,
    },
    nikib: {
        type: Number,
        required: false,
    },
    bintiib: {
        type: String,
        required: false,
    },
    namaib: {
        type: String,
        required: false,
    },
}

const acaraSchema = {
    walinikah: {
        type: String,
        required: true,
    },
    nikwali: {
        type: String,
        required: false,
    },
    hubungan_wali: {
        type: String,
        required: false,
    },
    tempat_nikah: {
        type: String,
        required: true,
    },
    tglnikah: {
        type: Date,
        required: true,
    },
    mas_kawin: {
        type: String,
        required: true,
    },
}

const SchemaNikahMasuk = {
    noreg: {
        type: String,
        required: true,
    },
    tglregister: {
        type: Date,
        required: true,
    },
    datapr: {
        type: prSchema,
        required: true,
    },
    datalk: {
        type: lkSchema,
        required: true,
    },
    sttkeldes: {
        type: String,
        required: true,
    },
    sttaylk: {
        type: String,
        required: false,
    },
    nikaylk: {
        type: Number,
        required: false,
    },
    binaylk: {
        type: String,
        required: false,
    },
    namaaylk: {
        type: String,
        required: false,
    },
    sttiblk: {
        type: String,
        required: false,
    },
    nikiblk: {
        type: Number,
        required: false,
    },
    bintiiblk: {
        type: String,
        required: false,
    },
    namaiblk: {
        type: String,
        required: false,
    },
    acara: {
        type: acaraSchema,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
}

const SchemaNikahKeluar = {
    noreg: {
        type: String,
        required: true,
    },
    tglregister: {
        type: Date,
        required: true,
    },
    datapr: {
        type: prSchema,
        required: false,
    },
    datalk: {
        type: lkSchema,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    statuskeluar: {
        type: statuskeluarSchema,
        required: true,
    },
    tujuan: {
        type: tujuanSchema,
        required: false,
    },
};

const SchemaSemuaNikah = {
    noreg: {
        type: String,
        required: true,
    },
    tglregister: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
};

const NikahMasuk = mongoose.model('NikahMasuk', SchemaNikahMasuk, 'nikahs');
const NikahKeluar = mongoose.model('NikahKeluar', SchemaNikahKeluar, 'nikahs');
const NikahSemua = mongoose.model('SemuaNikah', SchemaSemuaNikah, 'nikahs');
module.exports = {NikahMasuk, NikahKeluar, NikahSemua};