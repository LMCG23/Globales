const mongoose = require('mongoose');
const {Schema} = mongoose;
const Student = require('estudiantes');
const exer = require('Excercice');

const {nombre, } = new Student();

const NoteSchema = new Schema({
    title: {type: String, required: true},
    descripcion: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String }

});

module.exports = mongoose.model('Note', NoteSchema);