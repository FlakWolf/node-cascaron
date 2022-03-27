const { Schema, model } = require('mongoose');



const ProductoSchema = Schema(
    {
        guid: {
            type: Number,
            required: [true, "Debe contener un indice guid"],
            unique: true
        },
        Name: {
            type: String,
            require: [true, "El nombre es obligatorio"]
        },
        Description: {
            type: String,
            required: [true, "La descripcion es obligatoria"]
        },
        Price: {
            type: Number,
            required: [true, "Es necesario Agregar un Precio"]
        },
        IsActive: {
            type: Boolean,
            default: true
        },
        Image: {
            type: String
        }
    });

ProductoSchema.methods.toJSON = function () {
    const { __v, _id, ...producto } = this.toObject();
    producto.uid = _id;
}

module.exports = model('Producto', ProductoSchema);