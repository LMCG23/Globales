const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoutineSchema = new Schema({
    name: {type: String, required: true},
    time: {type: String, required: true},
    description:{type: String, required: true},
    user: {type: String },
    ejercicios:[{
        type: Schema.Types.ObjectId, ref: 'Ejercicio'
    }]

});

module.exports = mongoose.model('Routine', RoutineSchema);