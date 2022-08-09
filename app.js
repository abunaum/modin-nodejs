const express = require('express')
const {home} = require("nodemon/lib/utils");
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.get('/', (req, res) => {
    res.render('beranda', {
        title : 'Beranda'
    })
});
app.use('/',(req,res) => {
    res.status(404);
    res.render('404');
});
app.set('nama', 'Modin')
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

