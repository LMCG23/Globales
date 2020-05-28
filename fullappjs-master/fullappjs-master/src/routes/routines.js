const express = require('express');
const router = express.Router();

const Routine = require('../models/Routines');
const {isAuthenticated} = require('../helpers/auth');


router.get('/Routines/CreateRoutines', isAuthenticated,(req, res)=>{
    res.render('Routines/CreateRoutines');
});



router.post('/Routines/CreateRoutines', isAuthenticated,async(req, res)=>{
    const {name, time,description} =  req.body;
    const errors = [];
 
    if(!name){
       
        errors.push({text: "Escriba un nombre"});
    }
    if (!time){
        
        errors.push({text: "Escriba  el tiempo"});
    }
    if (!description){
       
       errors.push({text: "Escriba una descripcion"});
   }
    if(errors.length > 0){
        res.render('Routines/CreateRoutines',{
            errors,
            name,
            time,
            description
        });
    }
    else{
        const newRoutine = new Routine({name,time,description});
        newRoutine.user = req.user.id;
        await newRoutine.save();
        req.flash("success_msg", 'Ejercicio agregado');
        res.redirect('/Excercice/CreateExcercice'); 
    }
 });
 



module.exports = router;