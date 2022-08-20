const mongoose = require("mongoose");

const Orang = mongoose.model('Orang',{
    nik: {
        type: Number,
        required: true,
    },
    nama: {
        type: String,
        required: true,
    },
    jk: {
        type: String,
        required: true,
    },
    tempat_lahir: {
        type: String,
        required: true,
    },
    tanggal_lahir: {
        type: Date,
        required: true,
    },
    pekerjaan: {
        type: String,
        required: true,
    },
    agama: {
        type: String,
        required: true,
    },
    wn: {
        type: String,
        required: true,
    },
    prov: {
        type: String,
        required: true,
    },
    kabkot: {
        type: String,
        required: true,
    },
    kec: {
        type: String,
        required: true,
    },
    keldes: {
        type: String,
        required: true,
    },
    rt: {
        type: Number,
        required: true,
    },
    rw: {
        type: Number,
        required: true,
    },
    jalan: {
        type: String,
        required: true,
    },
});
module.exports = Orang;