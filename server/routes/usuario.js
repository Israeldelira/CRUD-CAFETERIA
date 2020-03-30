const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore'); /// INVESTIGAR 
const Usuario = require('../models/usuario'); //constante llamada Usuario que es igual al archvio modelo usuario
const app = express();
///////////////////////// PETICIONES O FUNCIONES/////////////


app.get('/usuario', (req, res) => { // obtener usuario 
    Usuario.find({ estado: true }) // Buscamos en el archivo todos los datos que tengan la condicoion {estado=true}
        .exec((err, usuarios) => { /// condicion de error
            if (err) { //muestra error y codigo 400
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({ //devuelve los usuarios y codigo 200
                ok: true,
                count: usuarios.length, //cuenta y recorre el array de usuarios 
                usuarios //la variable que imprime todos los usuarios
            })
        });
});

app.post('/usuario', (req, res) => { //mandamos a llamar el archivo para enviar datos a a coleccion usuarios 
    ///////////////declarando variables //////////////
    let body = req.body; // declaramos una variable con el valor que nos el usuario 

    let usuario = new Usuario({ // creamos una varibale y creamos un nuevo objeto llamadp Usuario
        nombre: body.nombre, //atrapamos todos los datos que manda el usuario 
        apellido: body.apellido, /// declaramos todos los datos que tiene nuestro modelo
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //encriptamos la contraseña 

    });
    /////////////////////////funcionones/////////
    usuario.save((err, usrDB) => { //funcion para guardar en la base de datos 
        if (err) { // error 
            return res.status(400).json({ //devuelve error
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true, //devuelve un statuis correcto
            usrDB //muestra lo que guardste 
        });
    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'apellido', 'email', 'estado', ]);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al actualizar${err}`
            });
        }
        return res.json({
            ok: true,
            mensaje: 'Usuario actualizado',
            usuario: usuarioDB

        });
    });
});

app.delete('/usuario', (req, res) => {
    let id = req.body.id;
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;