const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sebas:beReo7aE5XipV4BU@cluster0.s3j7x8r.mongodb.net/?appName=Cluster0")
.then(()=>{console.log("Conectado")})
.catch((err)=>{console.log(err);})

