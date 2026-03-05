const mongoose = require("mongoose");

const driversSchema = mongoose.Schema({
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
    calificacion_media: {
        type: Number,
        require: true
    },
    ganancias_mes: {
        type: Number,
        require: false
    },
    ganancias_totales: {
        type: Number,
        require: true
    },
    taxi_en_uso: {
        type: Number,
        require: true
    },
    contrasena: {
        type: String,
        require: true
    } 
})

module.exports = mongoose.model("drivers", driversSchema);