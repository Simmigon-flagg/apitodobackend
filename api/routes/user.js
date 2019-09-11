// Know issue users can delete other users
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth')
const UserController = require('../controllers/users')

router.post('/signup', UserController.create);
router.post('/login', UserController.loginUser )
// users can delete their own account?
router.delete('/:userId', checkAuth , UserController.delete);

module.exports = router;