const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolvalido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El role ${rol} no es valido`);
    }
}

/*
//verificar si el correo existe
const existeEmail = await Usuario.findOne({ correo });
if (existeEmail) {
    return res.status(400).json({ msg: 'El correo ya se encuentra registrado' });
}
*/

const correoExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`);
    }

}

const existeIdMoongo = async (id = '') => {
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El Id ${id} no existe`);
    }

}

module.exports = {
    esRolvalido,
    correoExiste,
    existeIdMoongo
}