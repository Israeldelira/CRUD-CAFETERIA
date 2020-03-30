///////////////////paqueteria y archivos que requiere este archivo 
const express = require('express');
const app = express();

///////////////////Rutas que madamos a llamar para agruparlas en un solo archivo 
app.use(require('./usuario'));
app.use(require('./categoria'));
app.use(require('./productos'));
app.use(require('./login'));


/////////////////exportamos todo lo app ///////////
module.exports = app;