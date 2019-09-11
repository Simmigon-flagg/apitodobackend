const express = require('express');
const router = express.Router();

//Protected routes
const checkToken = require('../middleware/auth');

//Controller 
const OrderController = require('../controllers/orders')

// Create a new Order
router.post('/', checkToken, OrderController.create);
// Read an Order
router.get('/:orderId', checkToken, OrderController.read);

// Delete an Order
router.delete('/:orderId', checkToken, OrderController.delete);

//  Read all orders
router.get('/', checkToken, OrderController.read_all );

module.exports = router;