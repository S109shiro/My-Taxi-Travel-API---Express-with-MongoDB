const mongoose = require("mongoose");

const taxiSchema = mongoose.Schema({
    placa: {
        type: String, 
        require: true
    },
    modelo: {
        type: String,
        require: true
    },
    fecha_ultima_tecnico_mecanica: {
        type: Date,
        require: true
    }
})


module.exports = taxiSchema("taxis", taxiSchema);