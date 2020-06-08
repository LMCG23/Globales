const express = require('express');
const router = express.Router();

const Routine = require('../models/Routines');
const Users = require('../models/Users');
const {isAuthenticated} = require('../helpers/auth');


router.get('/Routines/CreateRoutines/:id', isAuthenticated,(req, res)=>{
    let id = req.params.id;
   console.log(id);
    res.render('Routines/CreateRoutines',{id});
});

router.get('/Routines/listarRutinas/', isAuthenticated,async(req, res)=>{
     req.user.id;
     user = await Users.findById(req.user.id); 
     arrayRutinas = user.rutina;
    
     res.render('Routines/AllRoutines',{arrayRutinas});
});



router.post('/Routines/CreateRoutinas', isAuthenticated,async(req, res)=>{
    console.log(req.body.id);
    usuario = await Users.findById(req.body.id);
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
        usuario.rutina.push(newRoutine);
       await usuario.save();
        req.flash("success_msg", 'Rutina agregada');
        res.redirect('/Excercice/CreateExcercice'); 
    }
 });
 



module.exports = router;