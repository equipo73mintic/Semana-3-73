const router = require('express').Router();
const models = require('../../models');
const userController = require ('../../controllers/UserController.js');
const bcrypt = require('bcryptjs');

router.get('/', userController.list);

router.post('/register', userController.register);

router.post('/signin', userController.signin);

module.exports = router;