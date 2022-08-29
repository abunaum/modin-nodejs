const express = require('express');
const settingaplikasi = express.Router();
const controller = require('../controller/setting');
const ceklogin = require('../controller/login');

settingaplikasi.get('/',ceklogin, controller.index);
settingaplikasi.post('/edit/modin',ceklogin, controller.edit_modin);
settingaplikasi.post('/edit/keldes',ceklogin, controller.edit_keldes);
settingaplikasi.post('/edit/kua',ceklogin, controller.edit_kua);
settingaplikasi.post('/edit/tambahan',ceklogin, controller.edit_tambahan);

module.exports = settingaplikasi;