const { response, request } = require('express');
const Producto = require('../models/producto');

const productosGet = async (req = request, res = response) => {

    const { numero = 5, desde = 0 } = req.query;

    const query = { IsActive: true };

    const Operacion = true;
    const [Resultado] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);


    res.json({ IsSuccess: Operacion, Message: "Procesado", Result: Resultado });

}


module.exports = { productosGet };