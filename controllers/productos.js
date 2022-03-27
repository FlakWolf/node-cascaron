const { response, request } = require('express');

const Producto = require('../models/producto');

const productosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { IsActive: true };

    const Operacion = true;

    const [Total, Resultado] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        //    .skip(Number(desde))
        //    .limit(Number(limite))

    ]);


    res.json({ IsSuccess: Operacion, Total, Message: "Procesado", Result: Resultado });

}

const productosPost = async (req = request, res = response) => {

    const { guid, Name, Description, Price, IsActive, Image } = req.body;

    const producto = new Producto({ guid, Name, Description, Price, IsActive, Image });

    await producto.save();

    res.json({
        msg: 'post API controller -- Producto',
        producto
    });

}




module.exports = { productosGet, productosPost };