// Linea para que me deje conectarme a Atlas
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

// Importacion del modulo de Express
const express = require("express");

// Conexion a la base de datos desde un archivo externo
require("./dbConnection");

// Obtencion de los endpoints creados en otro archivo
const users = require("./routes/routesUser")

// Preparacion del servidor local
const app = express();
const port = 3000;

// Parsear datos a json
app.use(express.json());


// Levantamiento del servidor
app.listen(port, ()=>{
    console.log("Server arriba");
    
})

// Endpoints para los users
app.use("/users", users)