
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.paths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            productos: '/api/productos',
            categorias: '/api/Categorias'
        }

        // this.usuariosPath = '/api/usuarios';
        // this.productosPath = '/api/productos';
        // this.categoriasPath = '/api/Categorias';
        // this.authPath = '/api/auth'


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
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log("Servidor corriendo en puerto", this.PORT);
        });
    }

}


module.exports = Server;