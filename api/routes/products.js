const express = require('express');
const router = express.Router();


const ProductController = require('../controllers/products')

//Protected routes
const checkToken = require('../middleware/auth');

router.post('/', checkToken , ProductController.create);

router.get('/:productId', checkToken, ProductController.read);

router.patch('/:productId', checkToken, ProductController.update);

router.delete('/:productId', checkToken, ProductController.delete);

// Read All products
router.get('/', ProductController.read_all_products);

module.exports = router;