const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");

router.get("/getAll", async(req, res)=>{
    try{
        const allUsers = await userSchema.find({});
        if(allUsers.length <= 0){
            res.status(400).send("No existen registros en esta base de datos.")
        }else{
            res.status(200).json(allUsers);
        }
    } catch(err){
        res.status(500).json({"Se ha presentado el siguiente error" : err.message});
    } 
})


router.get("/get/:id", async(req, res)=>{
    const userId = req.params.id;
    try{
        const userGet = await userSchema.findById(userId)
        if(!userGet){
            return res.status(404).send("El ID ingresado no le pertenece a ningun usuario registrado en la base de datos.")
        }
        res.send(userGet);
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message})
    }
    
})


router.post("/create", async(req, res)=>{
    const newUser = userSchema(req.body);
    // Para que no envie datos vacios
    if(!req.body){
        res.status(400).send("No se puede enviar la request vacia. Vuelve a intentarlo");
    }else{
        await newUser.save()
        .then(()=>{res.status(200).json("El usuario '" + newUser.nombre + "' ha sido creado satisfactoriamente.")})
        .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error" : err.message})}) 
    }
})


router.put("/update/:id", async(req, res)=>{
    const updateUserID = req.params.id;
    const updateUser = req.body;
    const idExist = await userSchema.findById(updateUserID);
    if(!idExist){
        res.status(400).send("El usuario a editar no existe o el ID esta mal digitado.");
    }
    else{
        await userSchema.findByIdAndUpdate(updateUserID, updateUser)
        .then(()=>{res.status(200).json("El usuario '" + updateUser.nombre + "' ha sido actualizado.")})
        .catch((err)=>{res.status(500).json({"Se ha presentado el siguiente error": err.message})})
    }
})


router.delete("/delete/:id", async(req, res)=>{
    const deleteUserID = req.params.id;
    try{
        const userExist = await userSchema.findById(deleteUserID);
        if(!userExist){
            return res.status(400).send("Este usuario no existe o ingresaste mal su ID");
        }
        else{
            await userSchema.deleteOne({_id : deleteUserID})
            .then(()=>{res.status(200).send("El usuario ha sido eliminado.")})
            .catch((err)=>{res.status(400).json({"Se ha presentado el siguiente error": err})});
            
        }
    }catch(err){
        res.status(500).json({"Se ha presentado el siguiente error": err.message})
    }
})


// Se exportan los endpoints para utilizarlos en el index.js
module.exports = router;