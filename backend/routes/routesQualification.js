const express = require("express");
const router = express.Router();
const qualificationSchema = require("../models/qualification");

router.get("/getAll", async(req, res)=>{
    try{
        const allQualification = await qualificationSchema.find({});
        if(allQualification <= 0){
            res.status(404).send("No existen registros en esta base de datos.");
        }else{
            res.status(200).json(allQualification);
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    }    
});

router.get("/get/:id", async(req, res)=>{
    const qualificationId = req.params.id;
    try{
        const getQualification = await qualificationSchema.findById(qualificationId);
        if(!getQualification){
            return res.status(404).send("El ID ingresado no le pertenece a ninguna calificacion registrada en la base de datos.");
        }
        res.status(200).json(getQualification);
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    }
});

router.post("/create", async(req, res)=>{
    const newQualification = qualificationSchema(req.body);
    try{
        if(!req.body){
            res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo");
        }else{
            await newQualification.save()
            .then(()=>{res.status(200).send("La calificacion ha sido creada satisfactoriamente.")})
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error" : err.message})});
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    }

});

router.put("/update/:id", async(req, res)=>{
    const qualificationUpdateID = req.params.id;
    const qualificationUpdate = req.body;
    try{
        const qualificationExist = await qualificationSchema.findById(qualificationUpdateID);
        if(!qualificationExist){
            res.status(404).send("La calificacion a editar no existe o el ID esta mal digitado.");
        }else if(!req.body){
            res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo")
        }else{
            await qualificationSchema.findByIdAndUpdate(qualificationUpdateID, qualificationUpdate)
            .then(()=>{res.status(200).send("La calificacion ha sido actualizada.")})
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error" : err.message})});
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    }
});

router.delete("/delete/:id", async(req, res)=>{
    const qualificationDeleteID = req.params.id;
    try{
        const qualificationExist = await qualificationSchema.findById(qualificationDeleteID);
        if(!qualificationExist){
            res.status(404).send("La calificacion a eliminar no existe o el ID esta mal digitado.")
        }else{
            await qualificationSchema.deleteOne({_id: qualificationDeleteID})
            .then(()=>{res.status(200).send("La calificacion ha sido eliminada exitosamente.")})
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error" : err.message})});
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    }
});


module.exports = router;