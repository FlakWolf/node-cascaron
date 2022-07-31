const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    // const {q, nombre = 'No name', apikey , page = 1, limit} = req.body
    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };
    // const usuarios = await Usuario.find({ estado: true })
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const Total = await Usuario.countDocuments({ estado: true });
    const Operacion = true;
    const [Total, Resultado] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    // res.json({ Total, usuarios });

    //res.json({  Total, Resultado });

    res.json({ IsSuccess: Operacion, Message: "Total", Result: Resultado });


}

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;
    
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

const usuariosDelete = async (req = request, res = response) => {

    const id = req.params.id;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    //const usuarioAutenticado = req.usuario;

    res.json({
        "msj": 'Usuario Borrado',
        usuario,
        //   usuarioAutenticado
    });
}





module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}