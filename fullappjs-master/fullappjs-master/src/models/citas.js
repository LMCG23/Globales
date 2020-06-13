const mongoose = require('mongoose');
const {Schema} = mongoose;

const Citas = new Schema({
  
    nombre:{type: String, required: true},
    apellido:{type: String, required: true},
    apellido2:{type: String, required: false},
    fecha:{type: String, require: true},
    hora:{type:String, require: true},
    user:{type:String}

});

module.exports = mongoose.model('Citas', Citas);