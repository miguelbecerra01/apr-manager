//http://expressjs.com/
//https://ngrok.com/download

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mountRoutes = require('./routes');

const app = express();
const publicPath = path.join(__dirname, '..', 'client', 'public');
const port = process.env.PORT || 3009;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({ path: '.env.development' });

app.use(express.static(publicPath));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//show the dashboard
app.get('/^((?!api).)*$/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/statements/payment/*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));

});

//routes to api
mountRoutes(app);


app.listen(port, () => {
    console.log('Server is up and running on port', port);
});

module.exports = { app }