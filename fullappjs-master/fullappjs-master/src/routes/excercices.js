const express = require('express');
const router = express.Router();

const Ejercicio = require('../models/Excercice');
const {isAuthenticated} = require('../helpers/auth');


router.get('/Excercice/CreateExcercice', isAuthenticated,(req, res)=>{
    res.render('Excercice/CreateExcercice');
});





router.post('/Excercice/CreateExcercice', isAuthenticated,async(req, res)=>{
    const {nombre, repeticiones,series,Gmusculo,peso,foto} =  req.body;
    console.log( req.body);
    const errors = [];
 
    if(!nombre){
       
        errors.push({text: "Escriba un nombre"});
    }
    if (!repeticiones){
        
        errors.push({text: "Escriba una repeticiones"});
    }
    if(!series){
       
       errors.push({text: "Escriba un series"});
   }
   if (!Gmusculo){
       
       errors.push({text: "Escriba una Gmusculo"});
   }
   if (!peso){
       
    errors.push({text: "Escriba una peso"});
 }
    if(errors.length > 0){
        res.render('Excercice/CreateExcercice',{
            errors,
            title,
            descripcion
        });
    }
    else{
        const newNote = new Ejercicio({nombre,repeticiones,series,Gmusculo,peso,foto});
        await newNote.save();
        
        const ejercicios = await Ejercicio.find();
        res.render('Excercice/AllExcercices', {ejercicios}); 
        req.flash("success_msg", 'Ejercicio agregado');
    }
 });
 
 
 
 module.exports = router;