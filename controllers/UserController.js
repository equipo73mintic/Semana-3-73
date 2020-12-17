const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un usuario ( POST api/auth/register )
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

// Iniciar sesión ( POST api/auth/signin )
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
            email: user.email
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

// Listar los usuarios ( GET api/auth/list )
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

// Actualizar usuario ( PUT api/auth/update )
exports.update = async (req, res, next) =>{
    try {
        const exist = await db.user.findOne({
            where: { id: req.body.id }
        });
        if (exist){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            await db.user.update({ 
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },{ 
                where: { id: req.body.id } 
            })
            .then(updated =>{
                res.status(200).json({
                    updated: true,
                    data: req.body
                });
            });    
        } else {
            res.status(404).send({
                message: 'User not Found'   
            });
        }
    } catch (err){
        res.status(500).send({
            message: "Opps! "+ err
        });
        next(err);
    }
}

// obtener un usuario por parámetro ( GET api/auth/query?id={} )
exports.query = async(req, res, next) =>{ 

    try {
        const user = await db.user.findOne({ where: { id: req.query.id } });
        if (!user) {
            res.status(404).send({
                message: 'El registro solicitado no existe'
            });
        } else {
            res.status(200).json( user );
        }
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(e);
    }

}

// [DANGER] Eliminar usuario ( DELETE api/auth/remove )
exports.remove = async(req, res, next) => {
    
    await db.user.destroy({ where: { id: req.body.id } })
    .then(deleted =>{
        res.status(200).json({
            deleted: true,
            userId: req.body.id
        });
    })
    .catch(err =>{
        res.status(500).send({
            deleted: false,
            reason: "Houston, we have an "+ err
        });
        next(err);
    });

}