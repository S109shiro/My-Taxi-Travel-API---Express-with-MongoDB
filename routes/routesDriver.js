const express = require("express");
const router = express.Router();
const driverSchema = require("../models/drivers");

router.get("/getAll", async(req, res)=>{
    try{
        const allDrivers = await driverSchema.find({});
        if(allDrivers.length <= 0){
            res.status(400).send("No existen registros en esta base de datos.")
        }else{
            res.status(200).json(allDrivers);
        }
    } catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    } 
})


router.get("/get/:id", async(req, res)=>{
    const driverId = req.params.id;
    try{
        const driverGet = await driverSchema.findById(driverId)
        if(!driverGet){
            return res.status(404).send("El ID ingresado no le pertenece a ningun conductor registrado en la base de datos.")
        }
        res.send(driverGet);
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message})
    }
    
})


router.post("/create", async(req, res)=>{
    const newDriver = driverSchema(req.body);
    // Para que no envie datos vacios
    if(!req.body){
        res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo");
    }else{
        await newDriver.save()
        .then(()=>{res.status(200).json("El conductor '" + newDriver.nombre + "' ha sido creado satisfactoriamente.")})
        .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error" : err.message})}) 
    }
})


router.put("/update/:id", async(req, res)=>{
    const updateDriverID = req.params.id;
    const updateDriver = req.body;
    const idExist = await driverSchema.findById(updateDriverID);
    if(!idExist){
        res.status(400).send("El conductor a editar no existe o el ID esta mal digitado.");
    }
    else{
        await driverSchema.findByIdAndUpdate(updateDriverID, updateDriver)
        .then(()=>{res.status(200).json("El conductor '" + updateDriver.nombre + "' ha sido actualizado.")})
        .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})})
    }
})


router.delete("/delete/:id", async(req, res)=>{
    const deleteDriverID = req.params.id;
    try{
        const driverExist = await driverSchema.findById(deleteDriverID);
        if(!driverExist){
            return res.status(400).send("Este conductor no existe o ingresaste mal su ID");
        }
        else{
            await driverSchema.deleteOne({_id : deleteDriverID})
            .then(()=>{res.status(200).send("El conductor ha sido eliminado.")})
            .catch((err)=>{res.status(400).json({"Se ha presentado el siguiente error": err})});
            
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message})
    }
})


// Se exportan los endpoints para utilizarlos en el index.js
module.exports = router;