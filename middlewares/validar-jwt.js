const { request } = require('express');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: "No hay token en la peticion" });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(400).json({
                msg: "No existe el usuario"
            });
        }

        if (!usuario.status) {
            return res.status(400).json({
                msg: "Token no valido - usuario con estatus false"
            });
        }

        req.usuario = usuario;

        //console.log(payload);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Token no vaido" });
    }





}



module.exports = {
    validarJWT
} 