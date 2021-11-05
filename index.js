const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const pg = require('pg');

// const PostgresURI = require('./config/config').PostgresURI;
const model = require('./models');

const usersRoute = require('./routes/users');
const tempRoute = require('./routes/templates');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/files', express.static(path.join(__dirname, 'files')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/users', usersRoute);
app.use('/api/temps', tempRoute);

const port = parseInt(process.env.PORT, 10) || 7000;
// const client = new pg.Client(PostgresURI);

// client.connect()
//   .then(() => {
//     console.log('PostgresDB Connected!');
//     app.set('port', port);
//     const server = http.createServer(app);
//     server.listen(port, () => console.log(`Server is running on port: ${port}`));
//   })
//   .catch(err => console.log(`DB Connection Error: ${err}`));

model.sequelize.sync()
  .then(() => {
    console.log('PostgresDB Connected!');
    app.set('port', port);
    const server = http.createServer(app);
    server.listen(port, () => console.log(`Server is running on port: ${port}`));
  })
  .catch(err => console.log(`DB Connection Error: ${err}`));

