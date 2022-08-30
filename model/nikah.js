const mongoose = require("mongoose");

const Nikah = mongoose.model('Nikah',{
    noreg: {
        type: String,
        required: true,
    },
    tglregister: {
        type: Date,
        required: true,
    },
    nikpr: {
        type: Number,
        required: true,
    },
    statuspr: {
        type: String,
        required: true,
    },
    noacpr: {
        type: String,
        required: false,
    },
    sttaypr: {
        type: String,
        required: true,
    },
    nikaypr: {
        type: Number,
        required: false,
    },
    binaypr: {
        type: String,
        required: false,
    },
    namaaypr: {
        type: String,
        required: false,
    },
    sttibpr: {
        type: String,
        required: true,
    },
    nikibpr: {
        type: Number,
        required: false,
    },
    bintiibpr: {
        type: String,
        required: false,
    },
    namaibpr: {
        type: String,
        required: false,
    },
    niklk: {
        type: Number,
        required: true,
    },
    binlk: {
        type: String,
        required: true,
    },
    statuslk: {
        type: String,
        required: true,
    },
    noaclk: {
        type: String,
        required: false,
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
    status: {
        type: String,
        required: true,
    },
    sttkeluar: {
        type: String,
        required: false,
    },
    tujuan: {
        type: String,
        required: false,
    }
});
module.exports = Nikah;