const fs = require('fs');

const dirPath = './setting';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './setting/data.json';
if (!fs.existsSync(dataPath)) {
    const defaultData = {
        modin: {
            nama: 'MUHAMMAD TOHA',
            nik: 3513171601720002,
            ttl: 'Probolinggo , 17 Januari 1972',
            wn: 'WNI',
            agama: 'ISLAM',
            pekerjaan: 'Modin',
            alamat: 'Dusun Gentengan',
            rt: 9,
            rw: 2,
            keldes: 'Satreyan',
            kec: 'Maron',
            kabkot: 'Kab. Probolinggo',
            prov: 'Jawa Timur',
        },
        pejabat_kua: {
            nama: 'H. EKO HERIONO, MHI. M.Pd.I',
            jabatan: 'Kepala KUA',
            nip: 196512312001121004,
        },
        pejabat_desa: {
            nama: 'IMAM MUZAMIL',
            jabatan: 'Kepala Desa',
        }
    };
    fs.writeFileSync(dataPath, JSON.stringify(defaultData), 'utf-8');
}

const loadSetting = () => {
    const fileBuffer = fs.readFileSync('setting/data.json', 'utf-8');
    const setting = JSON.parse(fileBuffer);
    return setting;
}

const editKeldes = async (data) => {
    const fileBuffer = fs.readFileSync('setting/data.json', 'utf-8');
    const setting = JSON.parse(fileBuffer);
    const getdata = data;
    setting.pejabat_desa = getdata;
    await fs.writeFileSync(dataPath, JSON.stringify(setting), 'utf-8');
}

module.exports = {loadSetting, editKeldes};