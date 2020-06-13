const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    apellido:{type: String, required: true},
    apellido2:{type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},
	Rol: {type: String},
    rutina:[{
		 
       
    }],
	DatosGraficos:[{
		mes: {type: String, unique: false,dropDups: true },
		peso: {type: String},
		PorcentajeGrasa: {type: String},
		indiceDeMasa: {type: String}
	}]
	

	

});

UserSchema.methods.encryptPassword = async (password) =>{
   const salt = await bcrypt.genSalt(10);
   const hash = bcrypt.hash(password, salt);
   return hash;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);