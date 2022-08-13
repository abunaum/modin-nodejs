const axios = require('axios').default;
const loadprovinsi = () => {
    const prov = axios.get('https://ibnux.github.io/data-indonesia/provinsi.json');
    return prov;
}
const loadkabupaten = (idprov) => {
    const kabkot = axios.get(`https://ibnux.github.io/data-indonesia/kabupaten/${idprov}.json`);
    return kabkot;
}
const loadkecamatan = (idkabkot) => {
    const kec = axios.get(`https://ibnux.github.io/data-indonesia/kecamatan/${idkabkot}.json`);
    return kec;
}
const loadkeldes = (idkec) => {
    const keldes = axios.get(`https://ibnux.github.io/data-indonesia/kelurahan/${idkec}.json`);
    return keldes;
}
module.exports = {loadprovinsi, loadkabupaten, loadkecamatan, loadkeldes};