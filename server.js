const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// once database is open, listen to the port for API requests
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for Social Network running on port ${PORT}!`);
  });
});
