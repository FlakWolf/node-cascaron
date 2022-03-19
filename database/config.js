
const mongoose = require('mongoose');
const express = require('express');

const dbConnection = async () => { 

    try {

        await mongoose.connect(process.env.MONGODB_ATLAS);

        console.log('Conexión');

    } catch (error) {
        console.log(error);
        throw new Error('error en la conexion'.error);
    }

    
}




module.exports = {
    dbConnection
}