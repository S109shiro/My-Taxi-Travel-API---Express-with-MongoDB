const mongoose = require("mongoose");

const gpsRecordSchema = mongoose.Schema({
    direccion_inicio: {
        type: String,
        require: true
    },
    direccion_destino: {
        type: String,
        require: true
    },
    latitud_inicio: {
        type: Number,
        require: true
    }, 
    longitud_inicio: {
        type: Number,
        require: true
    },
    latitud_destino: {
        type: Number,
        require: true
    },
    longitud_destino: {
        type: Number,
        require: true
    },
    fecha_hora_inicio: {
        type: Date,
        require: true
    },
    fecha_hora_final: {
        type: Date,
        require: true
    }
})

module.exports = mongoose.model("gpsRecords", gpsRecordSchema);