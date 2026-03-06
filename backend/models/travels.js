const mongoose = require("mongoose");

const travelSchema = mongoose.Schema({
    id_usuario: {
        type: String,
        require: true
    },
    id_conductor: {
        type: String,
        require: true
    },
    estado_viaje: {
        type: String,
        require: true
    },
    costo_final: {
        type: Number,
        require: true
    },
    tipo_pago: {
        type: String,
        require: true
    },
    id_calificacion_final: {
        type: String,
        require: true
    },
    id_reporte: {
        type: String,
        require: true
    },
    id_registro_GPS: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model("travels", travelSchema);