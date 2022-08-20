const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abunaum:yaniardath123@modin.7nqim5d.mongodb.net/modin?retryWrites=true&w=majority');

// const Orang = mongoose.model('Orang',{
//     nik: {
//         type: Number,
//         required: true,
//     },
//     nama: {
//         type: String,
//         required: true,
//     },
//     jk: {
//         type: String,
//         required: true,
//     },
//     tempat_lahir: {
//         type: String,
//         required: true,
//     },
//     tanggal_lahir: {
//         type: Date,
//         required: true,
//     },
//     pekerjaan: {
//         type: String,
//         required: true,
//     },
//     agama: {
//         type: String,
//         required: true,
//     },
//     wn: {
//         type: String,
//         required: true,
//     },
//     prov: {
//         type: String,
//         required: true,
//     },
//     kabkot: {
//         type: String,
//         required: true,
//     },
//     kec: {
//         type: String,
//         required: true,
//     },
//     keldes: {
//         type: String,
//         required: true,
//     },
//     rt: {
//         type: Number,
//         required: true,
//     },
//     rw: {
//         type: Number,
//         required: true,
//     },
//     jalan: {
//         type: String,
//         required: true,
//     },
// });
//
// const orang1  = {
//     nik: '3513170305980003',
//     nama: 'AHMAD YANI',
//     jk: 'lk',
//     tempat_lahir: 'Probolinggo',
//     tanggal_lahir: '03-05-1998',
//     pekerjaan: 'Wiraswasta',
//     agama: 'Islam',
//     wn: 'WNI',
//     prov: 'Jawa Timur',
//     kabkot: 'Kab. Probolinggo',
//     kec: 'Maron',
//     keldes: 'Satreyan',
//     rt: 9,
//     rw: 2,
//     jalan: 'Dusun Gentengan',
//
// };
// Orang.create(orang1, function (err, orang) {
//     if (err){
//         console.log(err)
//     } else {
//         console.log(orang)
//     }
// });