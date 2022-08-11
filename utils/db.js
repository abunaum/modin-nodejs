const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abunaum:yaniardath123@modin.7nqim5d.mongodb.net/modin?retryWrites=true&w=majority');

const Orang = mongoose.model('Orang',{
    nik: {
        type: String,
        required: true,
    },
    nama: {
        type: String,
        required: true,
    },
});

const orang1  = {
    nik: '3513170305980003',
    nama: 'AHMAD YANI',
};

// orang1.save().then((person) => console.log(person));
// orang1.save(function (err) {
//     if (err){
//         console.log(err)
//     } else {
//         console.log('mantap');
//     }
// });
Orang.create(orang1, function (err, orang) {
    if (err){
        console.log(err)
    } else {
        console.log(orang)
    }
});