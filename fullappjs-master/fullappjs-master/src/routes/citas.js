const express = require('express');
const router = express.Router();

const Citas = require('../models/Citas');
const { isAuthenticated } = require('../helpers/auth');


router.get('/citas/add', isAuthenticated, (req, res) => {
    res.render('citas/newcitas');
});

router.post('/citas/newcitas', isAuthenticated, async (req, res) => {
    // const user2 = req.user.id;
    const { nombre, apellido, apellido2, fecha,hora,
        profesor } = req.body;
    const errors = [];


    if (!nombre) {

        errors.push({ text: "Escriba un nombre" });
    }
    if (!apellido) {

        errors.push({ text: "Escriba el primer apellido" });
    }
    if (!apellido2) {

        errors.push({ text: "Escriba el primer segundo" });
    }

    if (!fecha) {

        errors.push({ text: "Escoga la fecha y hora" });
    }
    if (!profesor) {

        errors.push({ text: "Eliga un profesor " });
    }
    console.log(req.body);
    if (errors.length > 0) {
        res.render('citas/newcitas', {
            errors,
            nombre,
            apellido,
            apellido2,
            fecha,
            hora,
            profesor,
        });
    }
    else {

        const newCitas = new Citas({
            nombre,
            apellido,
            apellido2,
            fecha,
            hora,
            profesor,
            
        });
        newCitas.user = req.user.id;
        console.log(newCitas);
        await newCitas.save();
        req.flash("success_msg", 'Cita agregada');
        res.redirect('/citas/allcitas');
    }
});


router.get('/citas/allcitas', isAuthenticated, async (req, res) => {
    const listcitas = await Citas.find({ user: req.user.id }).sort({ date: 'desc' });
    console.log(listcitas)
    res.render('citas/allcitas', { listcitas });
})

router.get('/citas/edit/:id', isAuthenticated, async (req, res) => {
    const cita = await Cita.findById(req.params.id);
    res.render('citas/editcita', { cita });
});

router.put('/citas/editcita/:id', isAuthenticated, async (req, res) => {
    const { nombre,
        apellido,
        apellido2,
        fecha,
        profesor,
         } = req.body;

    await Citas.findByIdAndUpdate(req.params.id, {
            nombre,
            apellido,
            apellido2,
            fecha,
            profesor,
            
    });
    console.log(Citas);
    req.flash('success_msg', 'Cita editada correctamente');
    res.redirect('/citas/allcitas');
});


router.delete('/citas/delete/:id', isAuthenticated, async (req, res) => {
    await Citas.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Cita eliminada correctamente');
    res.redirect('/citas/allcitas');
});

module.exports = router;