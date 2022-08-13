const express = require('express');
const {loadprovinsi, loadkabupaten, loadkecamatan, loadkeldes} = require('../utils/lokasi');
const person = express.Router();
function IsLoggedIn(req, res, next){
    if (!req.user){
        res.redirect('/login');
    } else{
        if (req.user.email != 'abunaum@hotmail.com'){
            req.logout();
            res.redirect('/login');
        }else{
            next();
        }
    }
}
person.get('/', IsLoggedIn, async (req, res) => {
    const lokasi = loadprovinsi();
    const getprov = await lokasi;
    const prov = getprov.data;
    const provsorted = prov.sort((a, b) => a.nama.localeCompare(b.nama))
    res.render('person/list_person', {
        title : 'Person',
        user : req.user,
        prov : provsorted,
    })
});
person.post('/tambah', IsLoggedIn, (req, res) => {
    console.log(req.body)
});

module.exports = person;
