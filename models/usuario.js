

const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }


});


UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);





/*
{ 
        nombre: 'Luis Cortes',
        correo: 'imcorreo@gmail.com',
        password: 'xxxx',
        img: 'imagenruta',
        rol: 'rol ',
        estado: true,
        google: false
}




  "nombre": "TEST1",
    "correo": "imcorreo@gmail.com",
    "password": "xxxx",
    "img": "imagenruta",
    "rol": "rol",
    "estado": true,
    "google": false
    
*/