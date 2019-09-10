const express = require('express');
const router = express.Router();

// From Models file
const mongoose = require('mongoose')
const Product = require('../models/product');



router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id dateCreated')
        .exec()
        .then(docs => {
           
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        dateCreated: doc.dateCreated,
                        request:{
                            type: "GET",
                            url: 'http://'+ req.headers.host + '' +req.baseUrl+ '/' + doc._id 
                        }

                    }
                })
            }
            res.status(200).json({
                response
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id).exec().
        then(doc => {
            console.log("From my Database: " + doc)
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: `${id} Is an invalid Product` });
            }


        }).catch(err => {
 
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    // create a new product

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        dateCreated: new Date()
    });
    product.save().then(result => {

        res.status(201).json({
            message: "POST a single Products",
            createProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                date: result.dateCreated,
                request:{
                    type: "GET",
                    url: 'http://'+ req.headers.host + '' +req.baseUrl+ '/' + result._id 
                }

            }
        });
    })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {

            res.status(200).json(result);
        })
        .catch(err => {

            res.status(500).json({
                message: err
            })
        })

});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.remove({ _id: id }).exec().then(result => {
        res.status(200).json({
            result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;