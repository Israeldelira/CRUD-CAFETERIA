const express = require('express');
const app = express();
const _ = require('underscore');
const Productos = require('../models/productos');


app.get('/productos', (req, res) => { // obtener usuario 
    Productos.find({ estado: true }) // Buscamos en el archivo todos los datos que tengan la condicoion {estado=true}
        .exec((err, productos) => { /// condicion de error
            if (err) { //muestra error y codigo 400
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({ //devuelve los usuarios y codigo 200
                ok: true,
                count: productos.length, //cuenta y recorre el array de usuarios 
                productos //la variable que imprime todos los usuarios
            })
        });
});
app.post('/productos', function(req, res) {
    let body = req.body;

    let productos = new Productos({
        nombre: body.nombre,
        ubicacion: body.precioUni,
        categoria: body.categoria

    });
    productos.save((err, productosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Error al registrar produto${err}`
            });
        }
        res.json({
            ok: true,
            mensaje: 'Se registro producto con exito',
            productos: productosDB
        });
    });

});
app.put('/productos', (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['nombre', 'ubicacion', 'categoria']);

    Productos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});



app.delete('/productos', (req, res) => {
    let id = req.body.id;
    Productos.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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