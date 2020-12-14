const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// Routers
const apiRouter = require('./routes');

const app = express();
app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods: GET, POST, DELETE")
//     next();
// });

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// primera ruta
app.use('/api', apiRouter);

app.set('PORT', process.env.PORT || 3000 );

// API ENDPOINTS
/*se debe contar un una ruta por medio de método post para el inicio de sesión de la siguiente manera:
'/api/auth/signin'
*/
app.get('/', function(req, res) {
    console.log("Estructura base del proyecto backend");
    res.send("Estructura base del proyecto backend");
});

app.listen(app.get('PORT'), () => {
    console.log(`Running on http://localhost:${app.get('PORT')}`)
})

module.exports = app;
