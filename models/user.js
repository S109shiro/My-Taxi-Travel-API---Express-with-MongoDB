const mongoose = require("mongoose");

// Schema para el user
const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    }, 
    primer_apellido: {
        type: String,
        require: true
    },
    segundo_apellido: {
        type: String,
        require: true
    },
    edad: {
        type: Number,
        require: true
    },
    sexo: {
        type: String,
        require: true
    },
    documento_identidad: {
        type: Number,
        require: true
    },
    numero_telefono: {
        type: String,
        require: true
    },
    fecha_nacimiento: {
        type: Date,
        require: true
    },
    calificacion_media: {
        type: Number,
        require: true
    },
    contrasena: {
        type: String,
        require: true
    } 

})

// Se exporta el Schema a la base de datos con dos atributos (nombre de la coleccion a guardar, estructura del objeto)
module.exports = mongoose.model('users', userSchema);