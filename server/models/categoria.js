////////////////////////Paqueterias y archivos 
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario'); // una constante que mande que manda a llamar la coleccion usuario
///////////////////Declaramos el eschema (los datos que queremos que tenga nuesta coleccion)
let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'el nombre es necesario'],
        unique: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'el usuario es necesario']
    },
    cantidadAlmacen: {
        type: Number,
        require: [true, 'la cantidad es requerida']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe de ser unico y diferente'
});

module.exports = mongoose.model('categorias', categoriaSchema);