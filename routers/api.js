const express = require('express');
const api = express.Router();
const {loadprovinsi, loadkabupaten, loadkecamatan, loadkeldes} = require('../utils/lokasi');
const Orang = require("../model/orang");

api.get('/provinsi', async  (req, res) => {
    const getprov = await loadprovinsi();
    const prov = await getprov.data;
    const provsorted = await prov.sort((a, b) => a.nama.localeCompare(b.nama));
    res.send(provsorted);
});

api.get('/kabkot/:id', async (req, res) => {
    const id = req.params.id;
    const getkab = await loadkabupaten(id);
    const kab = await getkab.data;
    const kabsorted = await kab.sort((a, b) => a.nama.localeCompare(b.nama));
    res.send(kabsorted);
});

api.get('/kec/:id', async (req, res) => {
    const id = req.params.id;
    const getkec = await loadkecamatan(id);
    const kec = await getkec.data;
    const kecsorted = await kec.sort((a, b) => a.nama.localeCompare(b.nama));
    res.send(kecsorted);
});

api.get('/keldes/:id', async (req, res) => {
    const id = req.params.id;
    const getkeldes = await loadkeldes(id);
    const keldes = await getkeldes.data;
    const keldessorted = await keldes.sort((a, b) => a.nama.localeCompare(b.nama));
    res.send(keldessorted);
});

module.exports = api;
