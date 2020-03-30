const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `la consulta fallo  ${err}`

            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: '*usuario y/o contraseña incorrectas '
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'usuario y/o *contraseña incorrectas '
            });
        }
        return res.json({
            ok: true,
            mensaje: `BIENVENIDO ${body.nombre,usuarioDB.nombre}`,
            Usuario: usuarioDB
        });
    });
});

module.exports = app;