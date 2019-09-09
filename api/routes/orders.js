const express = require('express');
const router = express.Router();

router.get('/' , (req, res, next) => {
    res.status(200).json({
        message:"GET View All Orders"
    });
});


router.get('/:orderId' , (req, res, next) => {
    const id = req.params.orderId;

    if(id === 'reached_single'){
        res.status(200).json({
            message:"Id Found",
            orderId: id
        });
    }else{
        res.status(200).json({
            message: "That Id doesn't exist",
            orderId: id
        }); 
    }
});

// Create a new Order
router.post('/' , (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message:"All POST orders",
        createdOrder: order
    });
});

router.patch('/:orderId' , (req, res, next) => {
    const id = req.params.orderId;

    res.status(200).json({
        message:"Order UPDATE patched",
        orderId: id
    });

});

router.delete('/:orderId' , (req, res, next) => {
    const id = req.params.orderId;

    res.status(200).json({
        message:"Order Deleted",
        orderId: id
    
    });
});


module.exports = router;