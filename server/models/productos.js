const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Categoria = require('./categoria');


let Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'el nombre es necesario']
    },
    ubicacion: {
        type: String,
        require: [true, 'es necesario el campo de ubicacion']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: [true, 'la categoria es necesaria']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

productoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe de ser unico y diferente'
});

module.exports = mongoose.model('productos', productoSchema);