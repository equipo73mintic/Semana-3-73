const router = require('express').Router(); // Manejador de rutas de express
const apiUserRouter = require('./api/users');

//2nd
router.use('/auth', apiUserRouter);

module.exports = router;