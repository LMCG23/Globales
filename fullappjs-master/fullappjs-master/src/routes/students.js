const express = require('express');
const router = express.Router();

const Student = require('../models/estudiantes');
const {isAuthenticated} = require('../helpers/auth');


router.get('/students/add', isAuthenticated,(req, res)=>{
    res.render('students/newstudents');
});

router.post('/students/newstudent', isAuthenticated,async(req, res)=>{
  // const user2 = req.user.id;
    const {dni, nombre,apellido,apellido2,
        fechaN,celular,correo,
        pais, cuidad, direccion,estatura,peso,
        ocupacion, padecimientos,
        medicamentos} =  req.body;
    const errors = [];

    if(!dni){
       
        errors.push({text: "Escriba la cédula"});
    }
    if (!nombre){
        
        errors.push({text: "Escriba un nombre"});
    }
    if(!apellido){
       
        errors.push({text: "Escriba el primer apellido"});
    }
    
    if(!pais){
       
        errors.push({text: "Escriba el país"});
    }
    if (!cuidad){
        
        errors.push({text: "Escriba la cuidad"});
    }
    if(!direccion){
       
        errors.push({text: "Escriba la dirección"});
    }
   
    if(errors.length > 0){
        res.render('students/newstudents',{
            errors,
            dni,
            nombre,
            apellido,
            pais,
            cuidad,
            direccion,
            
        });
    }
    else{
       // console.log("aca esta el usuario "+user2);
        const newStudent = new Student({dni, nombre,apellido,apellido2,
            fechaN,celular,correo,
            pais, cuidad, direccion,estatura,peso,
            ocupacion, padecimientos,
            medicamentos, });
        newStudent.user = req.user.id;
        console.log(newStudent);
        await newStudent.save();
        req.flash("success_msg", 'Estudiante agregado');
        res.redirect('/students/allstudents'); 
    }
});

router.get('/students/allstudents', isAuthenticated,async(req,res) =>{
 const liststudents = await Student.find({user: req.user.id}).sort({nombre:'desc'});
 console.log(liststudents)
 res.render('students/allstudents', {liststudents});   
})

router.get('/students/edit/:id', isAuthenticated,async(req, res) =>{
    const student = await Student.findById(req.params.id);
    console.log("Esta info del estudiante: ",student);
    res.render('students/editstudent', {student});
});

router.put('/students/editstudent/:id', isAuthenticated,async (req, res) =>{
    const {dni, nombre,apellido,apellido2,
        fechaN,celular,correo,
        pais, cuidad, direccion,estatura,peso,
        ocupacion, padecimientos,
        medicamentos,} = req.body;

    await Student.findByIdAndUpdate(req.params.id, {dni, nombre,apellido,apellido2,
        fechaN,celular,correo,
        pais, cuidad, direccion,estatura,peso,
        ocupacion, padecimientos,
        medicamentos,});
        console.log(Student);
    req.flash('success_msg', 'Estudiante editado correctamente');
    res.redirect('/students/allstudents');
});


router.delete('/students/delete/:id', isAuthenticated,async(req, res)=>{
    await Student.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Estudiante eliminado correctamente');
    res.redirect('/students/allstudents');
});

module.exports = router;