
const Producto = require('../models/producto');

const productosGet = async (req = request, res = response) => {

    // const {q, nombre = 'No name', apikey , page = 1, limit} = req.body
    const { numero = 5, desde = 0 } = req.query;

    const query = { IsActive: true };
    // const usuarios = await Usuario.find({ estado: true })
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const Total = await Usuario.countDocuments({ estado: true });
    const Operacion = true;
    const [Resultado] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    // res.json({ Total, usuarios });

    //res.json({  Total, Resultado });

    res.json({ IsSuccess: Operacion, Message: "Procesado", Result: Resultado });


}


module.exports = { productosGet };