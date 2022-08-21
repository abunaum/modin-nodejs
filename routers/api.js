const express = require('express');
const api = express.Router();
const {loadprovinsi, loadkabupaten, loadkecamatan, loadkeldes} = require('../utils/lokasi');

api.get('/provinsi', (req, res) => {
    const prov = loadprovinsi();
    const provsorted = prov.sort((a, b) => a.nama.localeCompare(b.nama));
    res.send(provsorted);
});

api.get('/kabkot/:id', (req, res) => {
    const id = req.params.id;
    const kab = loadkabupaten(id);
    const kabsorted = kab.sort((a, b) => a.nama.localeCompare(b.nama));
    res.send(kabsorted);
});

api.get('/kec/:id', (req, res) => {
    const id = req.params.id;
    const kec = loadkecamatan(id);
    const kecsorted = kec.sort((a, b) => a.nama.localeCompare(b.nama));
    res.send(kecsorted);
});

api.get('/keldes/:id', (req, res) => {
    const id = req.params.id;
    const keldes = loadkeldes(id);
    const keldessorted = keldes.sort((a, b) => a.nama.localeCompare(b.nama));
    res.send(keldessorted);
});

module.exports = api;
