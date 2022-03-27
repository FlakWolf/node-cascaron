const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const esAdminRol = (req = request, res = response, next) => {



    if (!req.usuario) {
        return res.status(500).json({
            msg: "Es necesario validar primero el Token"
        });
    }

    const usuario = req.usuario;

    try {

        if (usuario.rol != "ADMIN_ROLE") {
            return res.status(400).json({
                msg: "Solo un Administrador puede realizar la operación"
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Ocurrio un error al Valida rel Rol del usuario" });
    }



}



const tieneRol = (...roles) => {

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: "Es necesario validar primero el Token"
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `Para realizar la operación requiere uno de los sig. Roles ${roles}`
            });

        }

        next();
    }
}

module.exports = {
    esAdminRol,
    tieneRol
}