const express = require('express');
const api = express.Router();
api.get('/kabkot', (req, res) => {
    res.send('hai');
});

module.exports = api;
