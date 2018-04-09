const fs = require('fs');
const express = require('express');

// Gets the credentials data
const environment = require('./config/environment-dev');

const SERVER_PORT = 420;

// APP
const app = express();

app.use(express.static('./client/dist'));

app.use(express.static(environment.surveilanceFolder));

const b = new Promise((res, rej) => {
  res();
});

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/', function (req, res) {

  res.render('./client/dist/index.html');

});


app.get('/record', function (req, res) {

  console.log("GET req", req.body)

  res.send(req.body);

});


app.post('/record', function (req, res) {

  console.log("POST req", req.body)

  res.send(req.body);

});

app.get('/user/:id', function (req, res) {

  const id = req.params.id;

  fs.readdir(environment.surveilanceFolder, (err, files) => {

    res.send(files ? files.sort().reverse().map(filneName => {
      return {
        name: filneName,
        path: `${environment.surveilanceFolder}/${filneName}`
      };
    }) : 'nothing');

  })

});

app.listen(SERVER_PORT, function () {
  console.log(`Example app listening on port ${SERVER_PORT}!`);
});
