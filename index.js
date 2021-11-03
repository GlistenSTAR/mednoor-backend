const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
// const pg = require('pg');

// const PostgresURI = require('./config/config').PostgresURI;
const model = require('./models');

const usersRoute = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', usersRoute);

const port = parseInt(process.env.PORT, 10) || 5000;
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

