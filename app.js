const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const view_request_using_morgan = require('morgan')

// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use(cors());

const productsRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

mongoose.connect('mongodb+srv://Contra:' + process.env.MONGOATLAS + '@cluster0-x61mi.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true }
)
app.use(view_request_using_morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});



module.exports = app;

// app.listen(PORT,function(){
//     console.log("The Server is running and listening for request on port 5000")
// });