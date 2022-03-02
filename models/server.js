
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middelware
        this.middelwares();

        //rutas
        this.routes();
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log("Servidor corriendo en puerto", this.PORT);
        });
    }

    middelwares() {
        //CORS 
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());


        //directorio publico
        this.app.use(express.static('public'));

    }



}


module.exports = Server;