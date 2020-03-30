/////////////////PAQUETERIAS Y ARCHIVOS QUE REQUIERE ///////////////
require('./config/config'); //mandamos a llamar el archivo config 
const express = require('express'); //declaramos la constante para usar la paqueteria express
const app = express(); //constante para llamar la funcion expressç
const mongoose = require('mongoose'); //paqueteria mongoose para la conexion
const bodyparser = require('body-parser')


// parse aplication/x-www.form-uelencoded
app.use(bodyparser.urlencoded({ extended: false }));

//parse formato a application/json
app.use(bodyparser.json());

// Archivo agrupador de rutas
app.use(require('./routes/index'));

//////////////////SERVIDOR//////////
mongoose.connect(process.env.URLDB, { //investigar 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, resp) => {
        if (err) throw err;

        console.log('Base de datos ONLINE');
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT);
});