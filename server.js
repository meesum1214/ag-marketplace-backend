const express = require('express');
const app = express();
const db = require('./app/models');
const port = 8082;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({force: true});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Market Place.' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});