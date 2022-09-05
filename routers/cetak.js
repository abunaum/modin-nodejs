const express = require('express');
const cetakmodel = express.Router();
const controller = require('../controller/cetak');


cetakmodel.get('/n1wanita/:id', controller.n1pr);
cetakmodel.get('/n1pria/:id', controller.n1lk);
cetakmodel.get('/n2/:id', controller.n2);
cetakmodel.get('/n4/:id', controller.n4);
cetakmodel.get('/n5/:id', controller.n5);
cetakmodel.get('/wali/:id', controller.wali);
cetakmodel.get('/kuasa/:id', controller.kuasa);
cetakmodel.get('/tt/:id', controller.tt);
cetakmodel.get('/pengantar/:id', controller.pengantar);
cetakmodel.get('/n10/:id', controller.n10);

module.exports = cetakmodel;
