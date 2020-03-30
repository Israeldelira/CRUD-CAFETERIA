// PUERTO
process.env.PORT = process.env.PORT || 3000; // DECLARAMOS EL PUERTO 3000

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Conexion a base de datos
let urlDB;
if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/Starbucks';
}
process.env.URLDB = urlDB;