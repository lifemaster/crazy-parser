const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Accept");
  next();
});

app.use(express.static('public/app/'));

// Connect routes
require('./routes')(app);

app.listen(1234, () => console.log('Server is listening on port 1234'));
