const express = require('express');
const app = express();
const db = require('./app/models');
const port = 8082;
const cors = require('cors');
const bodyParser = require('body-parser');
const { authJwt } = require("./app/middlewares");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: false, alter: true })

require('./app/routes/auth.routes')(app);


// access token is required to access these routes with parameter x-access-token in header
app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// using token verification middleware to verify token
app.use([authJwt.verifyToken]);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Market Place.' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
    console.log(`http://localhost:${port}`);
});

