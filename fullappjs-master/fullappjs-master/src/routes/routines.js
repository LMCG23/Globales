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
router.get( '/routines/listarMedidas/', isAuthenticated,async(req, res)=>{
        var graficos;
    if(req.user.DatosGraficos!=null){
        graficos = req.user.DatosGraficos;

    }
    console.log(graficos);
    
   
    res.render('Routines/AllMedidas',{encoded: encodeURIComponent(JSON.stringify(graficos)),graficos});
  
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
       const ejercicios = await Ejercicio.find();
       req.flash("success_msg", 'Rutina agregada');
       res.render('Excercice/AllExcercices', {ejercicios}); 
      

    }
 });

 router.get('/Routines/insertarMedidas/:id', isAuthenticated,(req, res)=>{
    let id = req.params.id;
    res.render('Routines/insertarMedidas',{id});
});

 router.post('/Routines/insertarMedidas', isAuthenticated,async(req, res)=>{
       let id = req.body.id;
      var datos = {mes:req.body.mes,peso:req.body.peso,PorcentajeGrasa:req.body.porcentajeGrasa,indiceDeMasa:req.body.porcentajeCorporal};
      usuario = await Users.findById(req.body.id);
        var DatosGraficos = usuario.DatosGraficos;
        var  flag = false;
        DatosGraficos.forEach(element => {
            if(element.mes==datos.mes)
            flag = true;
            
        });

        if(flag == true){
            console.log(id);
            const errors = [];
            errors.push({text: "Ese mes ya se encuentra agregado"});
    
            res.render('Routines/insertarMedidas',{id,errors});
        }else{
      
      usuario.DatosGraficos.push(datos);
      await usuario.save();
      const usuarios = await Users.find({Rol:"usuario"});
  
      res.render('users/getusers',{usuarios});
        }
      

 });
 
 



module.exports = router;