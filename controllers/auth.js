
const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { generarJWT } = require("../helpers/generarjwt");
const { googleVerify } = require("../helpers/google-verify");
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
        const googleUser = await googleVerify(id_token);

        res.json({
            msg: "Todo bien",
            id_token
        });

    } catch (error) {

    }


}


module.exports = {
    login,
    googleSignin
};