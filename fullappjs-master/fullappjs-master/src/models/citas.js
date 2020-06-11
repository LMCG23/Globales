const mongoose = require('mongoose');
const {Schema} = mongoose;

const citas = new Schema({
    nombre:{type: String, required: true},
    apellido:{type: String, required: true},
    apellido2:{type: String, required: false},
    fecha:{type: Date, require: true},
    hora:{type: String, require:true},
    profesor:{String},
    user:{type:String}

});

module.exports = mongoose.model('citas', citas);