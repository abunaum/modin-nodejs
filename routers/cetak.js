const express = require('express');
const cetakmodel = express.Router();
const controller = require('../controller/cetak');


cetakmodel.get('/n1wanita/:id', controller.n1pr);
cetakmodel.get('/n1pria/:id', controller.n1lk);
cetakmodel.get('/n2/:id', controller.n2);
cetakmodel.get('/n4/:id', controller.n4);
cetakmodel.get('/n5/:id', controller.n5);
cetakmodel.get('/kuasa/:id', controller.kuasa);

module.exports = cetakmodel;