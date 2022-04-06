
const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { json } = require("express/lib/response");
const { generarJWT } = require("../helpers/generarjwt");
const { googleVerify } = require("../helpers/google-verify");
const usuario = require("../models/usuario");
const Usuario = require('../models/usuario');


const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {
        //verificar que el usuairo exista
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json(
                { msg: 'Usuario / Password no son correctos - Correo' }
            );
        }
        //vadliar el estatus del usuario
        if (!usuario.estado) {
            return res.status(400).json(
                { msg: 'Usuario / Password no son correctos - estado:false' }
            );
        }
        //validar que la contraseña coincida
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json(
                { msg: 'Usuario / Password no son correctos - Password' }
            );
        }

        //GENERAR EL JWT

        const token = await generarJWT(usuario.id);

        res.json({ usuario, token })

    } catch (error) {
        console.log(Error);
        return res.status(500).json({
            msg: 'Algo salio mal hable con el administrador'
        });
    }

}


const googleSignin = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol: 'USER_ROLE',
                google: true,
                estado: true
            };

            usuario = new Usuario(data);
            await usuario.save();

        }

        //usuario bloqueado en bd
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Hable con el administrador, usuario bloqueado"
            });
        }
        const token = await generarJWT(usuario.id);
        res.json({ usuario, token });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
    }

}


module.exports = {
    login,
    googleSignin
};