const fs = require('fs');

const loadprovinsi = () => {
    const fileBuffer = fs.readFileSync('./utils/lokasi/allprov.json');
    const prov = JSON.parse(fileBuffer);
    return prov;
}
const loadkabupaten = (idprov) => {
    const dataPath = `./utils/lokasi/provinsi/${idprov}.json`;
    if (!fs.existsSync(dataPath)){
        const data = [];
        return data;
    } else {
        const fileBuffer = fs.readFileSync(dataPath);
        const kabkot = JSON.parse(fileBuffer);
        return kabkot;
    }
}
const loadkecamatan = (idkabkot) => {
    const dataPath = `./utils/lokasi/kabupaten/${idkabkot}.json`;
    if (!fs.existsSync(dataPath)){
        const data = [];
        return data;
    } else {
        const fileBuffer = fs.readFileSync(dataPath);
        const kec = JSON.parse(fileBuffer);
        return kec;
    }
}
const loadkeldes = (idkec) => {
    const dataPath = `./utils/lokasi/kecamatan/${idkec}.json`;
    if (!fs.existsSync(dataPath)){
        const data = [];
        return data;
    } else {
        const fileBuffer = fs.readFileSync(dataPath);
        const keldes = JSON.parse(fileBuffer);
        return keldes;
    }
}
module.exports = {loadprovinsi, loadkabupaten, loadkecamatan, loadkeldes};