const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const urls = express();
const db = require('./modules/dbConnector.js')



urls.use(cors())
urls.use(express.static('public'));
urls.use(bodyParser.urlencoded({ extended: true }))
urls.use(bodyParser.json());

// index | svelte app
urls.get('/', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// redirection | data storing 
urls.get('/:slug', (req, res) => {
    var slug = req.params.slug
    res.json({ "search db for": slug })
})

// creating a new url
urls.post('/', async (req, res) => {
    var short = await db.saveURL(req.body.slug)
    res.json(short)
})

urls.listen(8086, () => {
    console.log('Server is up at port http://192.168.0.2:8086');
});