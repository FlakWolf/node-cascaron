
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
       // this.productosPath = '/api/productos';

        this.authPath = '/api/auth'


        //conectar a base de datoss
        this.conectarDB();



        //Middelware
        this.middelwares();

        //rutas
        this.routes();
    }


    async conectarDB() {
        await dbConnection();
    }


    middelwares() {
        //CORS 
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());


        //directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    //    this.app.use(this.productosPath, require('../routes/productos'));
        this.app.use(this.authPath, require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log("Servidor corriendo en puerto", this.PORT);
        });
    }

}


module.exports = Server;