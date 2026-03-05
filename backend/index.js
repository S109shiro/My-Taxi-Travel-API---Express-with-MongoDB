// Linea para que me deje conectarme a Atlas
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

// Importacion del modulo de Express
const express = require("express");

// Conexion a la base de datos desde un archivo externo
require("./dbConnection");

// Obtencion de los endpoints creados en otro archivo
const usersRoutes = require("./routes/routesUser")
const adminsRoutes = require("./routes/routesAdmin")
const driversRoutes = require("./routes/routesDriver")

// Preparacion del servidor local
const app = express();
const port = 3000;

// Parsear datos a json
app.use(express.json());

// Endpoints para los roles
app.use("/users", usersRoutes)
app.use("/admins", adminsRoutes)
app.use("/drivers", driversRoutes)


// Levantamiento del servidor
app.listen(port, ()=>{
    console.log("Server arriba");
    
})