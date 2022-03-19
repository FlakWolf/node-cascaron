const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const { q, id, nombre, apikey } = req.query;

    res.json({
        "msj": 'get API Controller',
        apikey,
        q
    });
}

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const {_id, password, google, correo, ...resto } = req.body;

    //TODO VALIDAR vs BD
    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        "msj": 'put API controller',
        usuario
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'post API controller',
        usuario
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        "msj": 'delete API controller'
    });
}





module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}