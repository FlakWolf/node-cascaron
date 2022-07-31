const { response, request } = require('express');
const { Categoria, Usuario } = require('../models');
const categoria = require('../models/categoria');

//ObtenerCategorias - paginado -total -populate

const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))

        ]);

        res.json({ total, categorias });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al Obtener las categorias '
        });
    }

}

//obtenerCategoria - populate {}

const obtenerCategoria = async (req = request, res = response) => {

    const id = req.params.id;

    try {
        const categoria = await
            Categoria.findById(id)
                .populate('usuario', 'nombre')


        if (!categoria) {
            res.status(400).json({
                ok: false,
                msg: `La categoria con id ${id} no existe o esta inactiva`
            });
        }
        res.json({ categoria });


    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al Obtener la categorias por Id'
        });
    }


}

//TODO: crear - Privado - Cualquiera con token válido
const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const CategoriaDB = await Categoria.findOne({ nombre });

    if (CategoriaDB) {
        return res.status(400).json({ msg: `La categoria ${nombre}, ya existe` });

    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json({
        msg: `Se guardo la categoria ${nombre}, satisfatoriamente`
    });
}


//TODO: actualizarCategoria - Privado - Cualquiera con token válido
const actualizarCategoria = async (req = request, res = response) => {

    const id = req.params.id;
    const { estado, usuario, ...data } = request.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json({ msg: `categoriasActualizarId ${categoria}` });

}

//TODO: borrarCategoria
const borrarCategoria = async (req = request, res = response) => {

    const id = req.params.id;

    //  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'usuariosDelete'
    });
}


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}