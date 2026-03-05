const mongoose = require("mongoose");

const gpsRecordSchema = mongoose.Schema({
    lugar_inicio: {
        type: String,
        require: true
    },
    lugar_destino: {
        type: String,
        require: true
    },
    coordenada_inicio: {
        type: Number,
        require: true
    }, 
    coordenada_fin: {
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