const controller = require('./controller/controller.js');
const express = require('express');
const db = require('./models');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./routes/index');
const cors = require('cors');

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: GET, POST, DELETE")
    next();
});

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// API ENDPOINTS
/*se debe contar un una ruta por medio de método post para el inicio de sesión de la siguiente manera:
'/api/auth/signin'
*/

app.use('/api', apiRouter);

app.set('PORT', process.env.PORT || 3000);

app.listen(app.get('PORT'), () => {
    console.log(`Running on http://localhost:${app.get('PORT')}`)
})

app.post('/api/users', (req,res) => {
    db.user.findAll().then(users => res.json(users))
});

app.post('/api/auth/signin', controller.signin);

app.get('/', function(req, res) {
    console.log("Estructura base del proyecto backend");
    res.send("Estructura base del proyecto backend");
});



//const port = 3000



module.exports = app;