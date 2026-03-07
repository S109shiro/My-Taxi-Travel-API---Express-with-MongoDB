const express = require("express");
const router = express.Router();
const travelSchema = require("../models/travels");

router.get("/getAll", async(req, res)=>{
    try{
        const allTravels = await travelSchema.find({});
        if(allTravels<=0){
            res.status(200).send("No existen registros en esta base de datos.");
        }else{
            res.status(200).json(allTravels);
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
});

router.get("/get/:id", async(req, res)=>{
    const idTravel = req.params.id;
    try{
        const getTravel = await travelSchema.findById(idTravel);
        if(!getTravel){
            return res.status(404).send("El ID ingresado no le pertenece a ningun taxi registrado en la base de datos.");
        }
        res.status(200).json(getTravel);
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
});

router.post("/create", async(req, res)=>{
    const newTravel = travelSchema(req.body);
    try{
        if(!req.body){
            res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo.");
        }else{
            await newTravel.save()
            .then(()=>{res.status(200).send("El taxi ha sido creado satisfactoriamente.")})
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})});
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
});

router.put("/update/:id", async(req, res)=>{
    const updateTravelID = req.params.id;
    const updateTravel = req.body;
    try{
        const existId = await travelSchema.findById(updateTravelID);
        if(!existId){
            res.status(404).send("El viaje a editar no existe o el ID esta mal digitado.");
        }else if(!req.body){
            res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo.")
        }else{
            await travelSchema.findByIdAndUpdate(updateTravelID, updateTravel)
            .then(()=>{res.status(200).send("El viaje ha sido actualizado.")})
            .catch(()=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})});
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
});

router.delete("/delete/:id", async(req, res)=>{
    const deleteTravelID = req.params.id;
    try{
        const existID = await travelSchema.findById(deleteTravelID);
        if(!existID){
            res.status(404).send("Este viaje no existe o ingresaste mal su ID");
        }else{
            await travelSchema.deleteOne({_id: deleteTravelID})
            .then(()=>{res.status(200).send("El viaje ha sido eliminado.")})
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})});
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
});


module.exports = router;