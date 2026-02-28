const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");

router.get("/get/:id", async(req, res)=>{
    const userId = req.params.id;
    try{
        const userGet = await userSchema.findById(userId)
        if(!userGet){
            return res.status(404).send("El ID ingresado no le pertenece a ningun usuario registrado en la base de datos.")
        }
        res.send(userGet);
    }catch(err){
        res.status(500).json({Error: err.message})
    }
    
})


router.post("/create", async(req, res)=>{
    const newUser = userSchema(req.body);
    await newUser.save()
    .then(()=>{res.status(200).json("El usuario '" + newUser.nombre + "' ha sido creado satisfactoriamente.")})
    .catch((err)=>{res.status(500).json({message : err})})
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
        .catch((err)=>{res.status(500).json({Error: err.message})})
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
            await userSchema.deleteOne({_id : deleteUserID}).then(()=>{res.status(200).send("Ok")}).catch((err)=>{res.status(500).json({Error: err})});
            
        }

    }catch(err){

    }
})



// Se exportan los endpoints para utilizarlos en el index.js
module.exports = router;