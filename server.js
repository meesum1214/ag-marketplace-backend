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
app.use("/productImages",express.static("./uploads"));

db.sequelize.sync({ force: false, alter: true })
// .then(() => {
//     console.log('Drop and Resync Db');
//     db.category.create({
//         categoryName: 'Machinary & Tools',
//         categoryType: 'company'
//     });
// });

require('./app/routes/auth.routes')(app);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Market Place.' });
});


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
require('./app/routes/product.routes')(app);
require('./app/routes/order.routes')(app);
require('./app/routes/coupon.routes')(app);
require('./app/routes/bid.routes')(app);
require('./app/routes/cart.routes')(app);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});