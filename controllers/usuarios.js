const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const { q,id,nombre,apikey} = req.query;

    res.json({
        "msj": 'get API Controller',
        apikey,
        q    
    });
}

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json({
        "msj": 'put API controller',
        id
    });
}

const usuariosPost = (req, res) => {

    //  const { nombre, edad } = req.body;
    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API controller',
        nombre,
        edad
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