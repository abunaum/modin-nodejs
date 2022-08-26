const axios = require("axios");

const loadprovinsi = () => {
    return axios.get('https://cdn.jsdelivr.net/gh/abunaum/lokasi@main/allprov.json');
}
const loadkabupaten = (idprov) => {
    return axios.get(`https://cdn.jsdelivr.net/gh/abunaum/lokasi@main/provinsi/${idprov}.json`);
}
const loadkecamatan = (idkabkot) => {
    return axios.get(`https://cdn.jsdelivr.net/gh/abunaum/lokasi@main/kabupaten/${idkabkot}.json`);
}
const loadkeldes = (idkec) => {
    return axios.get(`https://cdn.jsdelivr.net/gh/abunaum/lokasi@main/kecamatan/${idkec}.json`);
}
module.exports = {loadprovinsi, loadkabupaten, loadkecamatan, loadkeldes};