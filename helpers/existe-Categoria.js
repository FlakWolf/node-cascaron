const { Categoria } = require("../models");



const existeCategoria = async (id = '') => {
    const existeId = Categoria.findById('id');

    if (!existeId) {
        throw new Error(`El Id ${id} no existe`);
    }
}

const existeCategoriaPorId = async (id = '') => {
    const existeId = Categoria.findById('id');

    if (!existeId) {
        throw new Error(`El Id ${id} no existe`);
    }
}


