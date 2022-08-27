const express = require('express');
const cetakmodel = express.Router();
const controller = require('../controller/cetak');


cetakmodel.get('/n1wanita/:id', controller.index);

module.exports = cetakmodel;
