const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product')
router.get('/', (req, res, next) => {
    Order.find()
        .select('_id product quantity') // Only the Attr I want
        .populate('product', 'name price')
        .exec()
        .then(docs => {


            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {

                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://' + req.headers.host + '' + req.baseUrl + '/' + doc._id
                        }
                    }
                }),


            })



        }).catch(err => {

            res.status(500).json({
                error: err
            })
        });

});


// router.get('/:orderId', (req, res, next) => {
//     const id = req.params.orderId;

//     if (id === 'reached_single') {
//         res.status(200).json({
//             message: "Id Found",
//             orderId: id
//         });
//     } else {
//         res.status(200).json({
//             message: "That Id doesn't exist",
//             orderId: id
//         });
//     }
// });

// Create a new Order
router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product Not Found"
                })
            }

            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity,
                dateCreated: new Date()

            });
            return order.save();

        })

        .then(result => {

            res.status(201).json({
                message: 'Order Saved',
                createdOrder: {
                    _id: result.id,
                    product: result.product,
                    quantity: result.quantity,
                    dateCreated: result.dateCreated
                },
                request: {
                    type: 'GET',
                    url: 'http://' + req.headers.host + '' + req.baseUrl + '/' + result._id

                }

            });
        })
        .catch(err => {

            res.status(500).json({
                error: err
            })
        });
    // res.status(201).json({
    //     message:"All POST orders",
    //     createdOrder: order
    // });
});

router.get('/:orderId', (req, res, next) => {

    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message: "Order Not Found"
            })          
        }
        res.status(200).json({
            order: order,
            request:{
                type: 'GET',
                url: 'http://localhost:3000/orders'
            }

        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });

    // res.status(200).json({
    //     message: "Order UPDATE patched",
    //     orderId: id
    // });

});

router.delete('/:orderId', (req, res, next) => {
    Object.remove({
        _id: req.params.orderId
    })
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'Order Removed',
            request:{
                type: 'POST',
                url: 'http://' + req.headers.host + '' + req.baseUrl + '/' + result._id,
                body:{
                    productId:"Id",quantity: "Number"
                }                
            }


        })
    })
    .catch(res => {
        res.status(500).json({
            error: err
        })
    })

    res.status(200).json({
        message: "Order Deleted",
        orderId: id

    });
});


module.exports = router;