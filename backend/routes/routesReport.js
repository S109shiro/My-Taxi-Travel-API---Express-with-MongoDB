const express = require("express");
const router = express.Router();
const reportSchema = require("../models/report")

router.get("/getAll", async(req, res)=>{
    try{
        const allReports = await reportSchema.find({});
        if(allReports <= 0){
            res.status(200).send("No existen registros en esta base de datos."); 
        }else{
            res.status(200).json(allReports);
        }

    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    }
});

router.get("/get/:id", async(req, res)=>{
    const reportId = req.params.id;
    try{
        const getReport = await reportSchema.findById(reportId);
        if(!getReport){
            return res.status(404).send("El ID ingresado no le pertenece a ningun reporte registrado en la base de datos.");
        }
        res.status(200).json(getReport);
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
});

router.post("/create", async(req, res)=>{
    const newReport = reportSchema(req.body);
    if(!req.body){
        res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo");
    }else{
        await newReport.save()
        .then(res.status(200).send("El registro ha sido creado satisfactoriamente."))
        .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})});
    }
})

router.put("/update/:id", async(req, res)=>{
    const updateReportID = req.params.id;
    const updateReport = req.body;
    try{
        const idExist = await reportSchema.findById(updateReportID);
        if(!idExist){
            res.status(404).send("El reporte a editar no existe o el ID esta mal digitado.");
        }else if(!req.body){
            res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo");
        }
        else{
            await reportSchema.findByIdAndUpdate(updateReportID, updateReport)
            .then(res.status(200).send("El reporte ha sido actualizado."))
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})});
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
})

router.delete("/delete/:id", async(req, res)=>{
    const deleteReportID = req.params.id;
    try{
        const idExist = await reportSchema.findById(deleteReportID);
        if(!idExist){
            res.status(404).send("El reporte a eliminar no existe o ingresaste mal su ID");
        }else{
            await reportSchema.deleteOne({_id: deleteReportID})
            .then(res.status(200).send("El reporte ha sido eliminado exitosamente."))
            .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})});
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message});
    }
})



module.exports = router;