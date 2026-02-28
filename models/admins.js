const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
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
    numero_identificacion: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    sexo: {
        type: String,
        require: true
    },
    documento_identidad: {
        type: String,
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
    contrasena: {
        type: String,
        require: true
    } 
})

module.exports = mongoose.model("administrators", adminSchema);