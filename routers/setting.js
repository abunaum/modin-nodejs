const express = require('express');
const settingaplikasi = express.Router();
const controller = require('../controller/setting');
const ceklogin = require('../controller/login');

settingaplikasi.get('/',ceklogin, controller.index);
settingaplikasi.post('/edit/keldes',ceklogin, controller.edit_keldes);

module.exports = settingaplikasi;