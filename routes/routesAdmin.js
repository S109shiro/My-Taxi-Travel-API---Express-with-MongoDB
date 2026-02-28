const express = require("express");
const router = express.Router();
const adminSchema = require("../models/admins");

router.get("/getAll", async(req, res)=>{
    try{
        const allAdmins = await adminSchema.find({});
        if(allAdmins <= 0){
            res.status(400).send("No existen registros en esta base de datos.")
        }else{
            res.status(200).json(allAdmins);
        }
    } catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    } 
})


router.get("/get/:id", async(req, res)=>{
    const adminId = req.params.id;
    try{
        const adminGet = await adminSchema.findById(adminId)
        if(!adminGet){
            return res.status(404).send("El ID ingresado no le pertenece a ningun administrador registrado en la base de datos.")
        }
        res.send(adminGet);
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message})
    }
    
})


router.post("/create", async(req, res)=>{
    const newAdmin = adminSchema(req.body);
    if(!req.body){
        res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo")
    }
    else{
        await newAdmin.save()
        .then(()=>{res.status(200).json("El administrador '" + newAdmin.nombre + "' ha sido creado satisfactoriamente.")})
        .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error" : err.message})})   
    }
})


router.put("/update/:id", async(req, res)=>{
    const updateAdminID = req.params.id;
    const updateAdmin = req.body;
    const idExist = await adminSchema.findById(updateAdminID);
    if(!idExist){
        res.status(400).send("El administrador a editar no existe o el ID esta mal digitado.");
    }
    else{
        await adminSchema.findByIdAndUpdate(updateAdminID, updateAdmin)
        .then(()=>{res.status(200).json("El administrador '" + updateAdmin.nombre + "' ha sido actualizado.")})
        .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})})
    }
})


router.delete("/delete/:id", async(req, res)=>{
    const deleteAdminID = req.params.id;
    try{
        const adminExist = await adminSchema.findById(deleteAdminID);
        if(!adminExist){
            return res.status(400).send("Este administrador a eliminar no existe o ingresaste mal su ID");
        }
        else{
            await adminSchema.deleteOne({_id : deleteAdminID})
            .then(()=>{res.status(200).send("El administrador ha sido eliminado.")})
            .catch((err)=>{res.status(400).json({"Se ha presentado el siguiente error": err})});
            
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message})
    }
})


// Se exportan los endpoints para utilizarlos en el index.js
module.exports = router;