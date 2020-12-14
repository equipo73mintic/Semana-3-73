const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un usuario ( api/auth/register )
exports.register = async (req, res, next) =>{
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await db.user.create(req.body);
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).send({
            message: 'Error => '+ error
        });
        next(error);
    }
}

// Iniciar sesión ( api/auth/signin )
exports.signin = async(req, res) => {
    
    await db.user.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(!user){ // if user not exists
            return res.status(404).send('User not found');
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){ // if password is not valid
            return res.status(401).send({
                auth: false, 
                accessToken: null, 
                reason: 'Invalid Password!'
            });
        }
        // if all is OK
        var token = jwt.sign({
            id: user.id, 
            name: user.name, 
            email: user.mail
        }, 
        'config.secret', {
            expiresIn: 86400 //expires in 24 hours
        });

        res.status(200).send({
            auth: true, 
            accessToken: token
        });

    }).catch(err => { // catch any other error
        res.status(500).send('Error -> ' + err);
    });
}

// Metodo para listar los usuarios ( api/auth )
exports.list = async (req, res, next) =>{
    try {
        const users = await db.user.findAll();
        
        res.status(200).send({
            users: users
        });
    
    } catch (error) {
        res.status(500).send({
            message: 'Error => '
        });
        next(error);
    }
}