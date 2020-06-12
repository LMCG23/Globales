const express = require('express');
const router = express.Router();

const Routine = require('../models/Routines');
const Users = require('../models/Users');
const Ejercicio = require('../models/Excercice');
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
        newRoutine.user = req.body.id;
      

       await newRoutine.save();
       console.log('aqui ya se salvo la rutina'+newRoutine);
       usuario.rutina.push(newRoutine);
       console.log(newRoutine);
       const ejercicios = await Ejercicio.find();
       await usuario.save(); 
       rutina=newRoutine._id;
       req.flash("success_msg", 'Rutina agregada');
       res.render('Excercice/AllExcercices',{ejercicios,rutina});  

    }
 });

 router.get('/Routines/insertarMedidas/:id', isAuthenticated,(req, res)=>{
    let id = req.params.id;
    res.render('Routines/insertarMedidas',{id});
});



router.get('/Routines/iniciarRutina/:id', isAuthenticated,async(req, res)=>{
    let id = req.params.id;
    var Rutina =  await Routine.findById(id);
   const Ejercicios = Rutina.ejercicios;
   console.log(Rutina);
    res.render('Excercice/IniciarRutina',{encodedJson: encodeURIComponent(JSON.stringify(Ejercicios)),Ejercicios});
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