const mongoose = require('mongoose');
const {Schema} = mongoose;


const padecimientos = new Schema({
nombre:{type: String, require: true},
descripcion: {type: String, require: true}});
const medicamentos = new Schema({
    nombre:{type: String, require: true},
    descripcion: {type: String, require: true}});

const Students = new Schema({
    dni:{type: String, required: true},
    nombre:{type: String, required: true},
    apellido:{type: String, required: true},
    apellido2:{type: String, required: false},
    fechaN:{type: Date, require: true},
    celular:{type: Number, require: false},
    correo:{type: String, require: false},
    pais:{type: String, require: true},
    cuidad:{type: String, require: true},
    direccion:{type: String, require: true},
    estatura:{type: Number, require: false},
    peso:{type: Number, require: false},
    ocupacion:{type: String, requiere: false},    
    padecimientos:{ type: String, required: false},
    medicamentos:{type: String, required: false},
    user:{type:String}

});

module.exports = mongoose.model('Estudiantes', Students);