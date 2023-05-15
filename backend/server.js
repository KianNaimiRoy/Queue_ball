require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());


const playerApiRoutes = require('./routes/players-api');
const tableApiRoutes = require('./routes/tables-api');



app.use('/api/players', playerApiRoutes);
app.use('/api/tables', tableApiRoutes);



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});