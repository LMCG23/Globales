const express = require('express');
const router = express.Router();

const Ejercicio = require('../models/Excercice');
const Rutina = require('../models/Routines');
const {isAuthenticated} = require('../helpers/auth');


router.get('/Excercice/CreateExcercice', isAuthenticated,(req, res)=>{
    
    res.render('Excercice/CreateExcercice');
});

 
 router.get('/Excercice/CreateStudentExcercice/:id', isAuthenticated,async(req, res)=>{
    console.log( req.body); 
        ejercicio=req.params.id;
   // console.log('aqui vemos si llegaron ejercicio '+ ejercicio);
      res.render('Excercice/CreateStudentExcercice',{ejercicio})
       req.flash("success_msg", 'inserte las especificaciones para el estudiante');
});
router.get('/Excercice/AllExcercices/:rutina', isAuthenticated,async(req, res)=>{
    console.log( req.body); 
    rutina=req.params.rutina;
    usuario=req.user.id;
    const ejercicios = await Ejercicio.find({usuario});
    console.log('aqui vemos si llegaron ejercicio '+ rutina);
      res.render('Excercice/AllExcercices',{rutina,ejercicios});
       req.flash("success_msg", 'inserte las especificaciones para el estudiante');
});

router.get('/Excercice/AllExcercicesAdd/:id', isAuthenticated,async(req, res)=>{
    console.log( req.body); 
    rutina=req.params.id;
    usuario=req.user.id;
    const ejercicios = await Ejercicio.find({usuario});
    console.log('aqui vemos si llegaron ejercicio '+ rutina);
      res.render('Excercice/AllExcercices',{rutina,ejercicios});
       req.flash("success_msg", 'inserte las especificaciones para el estudiante');
});








router.post('/Excercice/guardarEjercicioEstudiante', isAuthenticated,async(req, res)=>{
    const {rutina, ejercicio,repeticiones,series,peso} =  req.body;   
    console.log(req.body);
    
    _id=ejercicio;
    //traemos el el ejercicio por defecto
     ejercicioXdefecto = await Ejercicio.findById({_id});
     console.log(ejercicio);
    // console.log( 'objeto equivalente '+ejercicioXdefecto);
    // los que tomamos del ejercicio por defecto
    const nombre=ejercicioXdefecto.nombre; 
    const foto=ejercicioXdefecto.foto;
    const Gmusculo=ejercicioXdefecto.Gmusculo;
    // guardamos el nuevo ejercicio e indicamos la rutina a la que pertence,
    //con esto ya deberia aparecer la lista de ejercicios en la rutina
    const ejercicioEstudiante = new Ejercicio({nombre,repeticiones,series,Gmusculo,peso,foto,rutina});
    await ejercicioEstudiante.save();  
    _id=rutina;
    RutinaEstudiante = await Rutina.findById({_id});
    //console.log("esta es la rutina "+RutinaEstudiante)
    RutinaEstudiante.ejercicios.push(ejercicioEstudiante);
    await RutinaEstudiante.save(); 
    // traigo todos los ejercicios  
    const ejercicios = await Ejercicio.find();
    console.log('rutina json '+rutina)
    res.status(200).json({rutina});
    req.flash("success_msg", 'inserte las especificaciones para el estudiante');
});



router.post('/Excercice/CreateExcercice', isAuthenticated,async(req, res)=>{
    const {nombre, repeticiones,series,Gmusculo,peso,foto} =  req.body;  
    usuario=req.user.id;
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
           repeticiones,
           series,
           Gmusculo,
           peso,
           foto
       });
   }
   else{    
       const newNote = new Ejercicio({nombre,repeticiones,series,Gmusculo,peso,foto,usuario});
       await newNote.save();     
       const ejercicios = await Ejercicio.find();
       respuesta="llego bien";
       res.status(200).json({respuesta});
       req.flash("success_msg", 'Ejercicio agregado');
   }
});


//aqui vamos a mostrar los ejercicios del usuario 
router.get('/Excercice/AllStudentExcercice/:id', isAuthenticated,async(req, res)=>{
    let id = req.params.id;
    var rut =  await Rutina.findById(id);
   const ejercicios = rut.ejercicios;
    res.render('Excercice/AllStudentExcercice',{encodedJson: encodeURIComponent(JSON.stringify(ejercicios)),ejercicios});
});
 




 
 module.exports = router;