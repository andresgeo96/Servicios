//LLAMAR AL MODULO EXPRESS 
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';

//LLAMAR A LAS RUTAS DEL SERVIDOR 
//import producto from './routes/producto';

import categorias from './routes/categorias';
import producto from './routes/producto';

//CLASE 

class Server {
    //ESPECIFICAR EL TIPO DE DARO PARA LA VARIABLE APP
    public app: express.Application;

    constructor() {
        //INICIALIZR AL MODULO EXPRESS
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        //INICIALIZAR EL PUERTO EXPRESS
        this.app.set('port', process.env.PORT || 3000);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan('dev'));
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express.urlencoded({ extended: false }));
        // CONEXIÓN A LA BDD
        const MONGO_URI = 'mongodb://localhost:27017/tienda'
        mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
            console.log("BDD OK");
        });
    }
    routes() {

        //this.app.get('/',(req,res) => {res.send("SERVIDOR DE NODE")});
        this.app.use('/api/producto', producto);
        this.app.use('/api/categorias', categorias);
    }
    start() {
        //INICIALIZAR EL SERVIDOR EXPRESS
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO EN EL PUERTO 3000 OK")
        });


    }
}

const server = new Server();
server.start();
