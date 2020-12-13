const controller = require('./controller/controller.js');
const express = require('express');
const db = require('./models');
const app = express()
const bodyParser = require('body-parser');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// API ENDPOINTS
/*se debe contar un una ruta por medio de método post para el inicio de sesión de la siguiente manera:
'/api/auth/signin'
*/

app.post('/api/users', (req,res) => {
    db.user.findAll().then(users => res.json(users))
});

app.post('/api/auth/signin', controller.signin);

app.get('/', function(req, res) {
    console.log("Estructura base del proyecto backend");
    res.send("Estructura base del proyecto backend");
});
const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

module.exports = app;