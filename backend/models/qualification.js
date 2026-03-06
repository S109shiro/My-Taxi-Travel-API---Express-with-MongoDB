const mongoose = require("mongoose");

const qualificationSchema = mongoose.Schema({
    calificacion_usuario: {
        type: Number,
        require: true
    },
    calificacion_conductor: {
        type: Number,
        require: true
    },
    comentario_usuario: {
        type: String,
        require: false
    },
    comentario_conductor: {
        type: String,
        require: false
    }
})

module.exports = mongoose.model("qualifications", qualificationSchema);