const express = require('express');
const app = express();
const _ = require('underscore');
const Categorias = require('../models/categoria');



app.get('/categorias', (req, res) => { // obtener usuario 
    Categorias.find({ estado: true }) // Buscamos en el archivo todos los datos que tengan la condicoion {estado=true}
        .exec((err, categorias) => { /// condicion de error
            if (err) { //muestra error y codigo 400
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({ //devuelve los usuarios y codigo 200
                ok: true,
                count: categorias.length, //cuenta y recorre el array de usuarios 
                categorias //la variable que imprime todos los usuarios
            })
        });
});

app.post('/categorias', function(req, res) {
    let body = req.body;

    let categorias = new Categorias({
        nombre: body.nombre,
        usuario: body.usuario,
        cantidadAlmacen: body.cantidadAlmacen
    });
    categorias.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `ocurrio un error al momento de guardar ${err}`
            });
        }
        res.json({
            ok: true,
            mensaje: 'el usuario a sido inserado con exito',
            categorias: categoriaDB
        });
    });

});

app.put('/categorias/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'usuario', 'cantidadAlmacen']);
    Categorias.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `ocurrio un error al momento de actualizar ${err}`
            });
        }
        return res.json({
            ok: true,
            mensaje: 'cambios guardados',
            categorias: categoriaDB

        });
    });
});
app.delete('/categorias', (req, res) => {
    let id = req.body.id;
    Categorias.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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