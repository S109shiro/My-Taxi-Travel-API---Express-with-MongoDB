const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
    fecha_reporte: {
        type: Date,
        require: true
    },
    tipo_reporte: {
        type: String,
        require: true
    },
    detalles: {
        type: String,
        require: true
    },
    encargado_reporte: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("reports", reportSchema);