const express = require("express");
const router = express.Router();
const taxiSchema = require("../models/taxi");

router.get("/getAll", async (req, res)=>{
    try{
        const allTaxis = await taxiSchema.find({});
        if(allTaxis.length <= 0){
            res.status(200).send("No existen registros en esta base de datos.");
        }else{
            res.status(200).json(allTaxis);
        }

    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message})
    }
})

router.get("/get/:id", async (req, res)=>{
    const idTaxi = req.params.id;
    try{
        const taxi = await taxiSchema.findById(idTaxi);
        if(!taxi){
            return res.status(404).send("El ID ingresado no le pertenece a ningun taxi registrado en la base de datos.");
        }
        res.send(taxi);
    } catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
})

router.post("/create", async (req, res)=>{
    const newTaxi = taxiSchema(req.body);
    if(!req.body){
        res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo.");
    }else{
        await newTaxi.save()
        .then(res.status(200).send("El taxi ha sido creado satisfactoriamente."))
        .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})})
    }
})


router.put("/update/:id", async (req, res)=>{
    const updateTaxiID = req.params.id;
    const updateTaxi = req.body;
    try{
        const idExist = await taxiSchema.findById(updateTaxiID);
        if(!idExist){
            res.status(404).send("El taxi a editar no existe o el ID esta mal digitado.");
        }else if(!req.body){
            res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo");
        }
        else{
            await taxiSchema.findByIdAndUpdate(updateTaxiID, updateTaxi)
            .then(res.status(200).send("El taxi ha sido actualizado correctamente."))
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})});
        }

    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
})

router.delete("/delete/:id", async(req, res)=>{
    const deleteTaxiID = req.params.id;
    try{
        const taxiExist = await taxiSchema.findById(deleteTaxiID);
        if(!taxiExist){
            res.status(404).send("Este taxi no existe o ingresaste mal su ID");
        }
        else{
            await taxiSchema.deleteOne({_id: deleteTaxiID})
            .then(res.status(200).send("El taxi ha sido eliminado."))
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})})
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
})

module.exports = router;