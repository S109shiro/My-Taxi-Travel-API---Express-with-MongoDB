const express = require("express");
const router = express.Router();
const gpsRecordSchema = require("../models/gpsRecord");

router.get("/getAll", async(req, res)=>{
    try{
        const allGpsRecord = await gpsRecordSchema.find({});
        if(allGpsRecord <= 0){
            res.status(404).send("No existen registros en esta base de datos.");
        }else{
            res.status(200).json(allGpsRecord);
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    }
})

router.get("/get/:id", async(req, res)=>{
    const gpsRecordID = req.params.id;
    try{
        const getGpsRecord = await gpsRecordSchema.findById(gpsRecordID);
        if(!getGpsRecord){
            return res.status(404).send("El ID ingresado no le pertenece a ningun registro GPS registrado en la base de datos.");
        } 
        res.status(200).json(getGpsRecord);
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    }
})

router.post("/create", async(req, res)=>{
    const newGpsRecord = gpsRecordSchema(req.body);
    try {
        if(!req.body){
            res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo");
        }else{
            await newGpsRecord.save()
            .then(()=>{res.status(200).send("El registro GPS ha sido creado satisfactoriamente.")})
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})});
        }
    }catch(err) {
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
})

router.put("/update/:id", async(req, res)=>{
    const gpsRecordID = req.params.id;
    const updateGpsRecord = req.body;
    try{
        const idExist = await gpsRecordSchema.findById(gpsRecordID);
        if(!idExist){
            res.status(404).send("El registro GPS a editar no existe o el ID esta mal digitado.")
        }else if(!req.body){
            res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo");
        }
        else{
            await gpsRecordSchema.findByIdAndUpdate(gpsRecordID, updateGpsRecord)
            .then(()=>{res.status(200).send("El registro GPS ha sido actualizado.")})
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})});
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
})

router.delete("/delete/:id", async(req,res)=>{
    const deleteGpsRecordID = req.params.id;
    try{
        const idExist = await gpsRecordSchema.findById(deleteGpsRecordID);
        if(!idExist){
            res.status(404).send("El registro GPS a eliminar no existe o ingresaste mal su ID")
        }
        else{
            await gpsRecordSchema.deleteOne({_id: deleteGpsRecordID})
            .then(()=>{res.status(200).send("El registro GPS ha sido eliminado.")})
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})});
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
})


module.exports = router;