"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//LLAMAR AL MODULO EXPRESS 
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var compression_1 = __importDefault(require("compression"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
//LLAMAR A LAS RUTAS DEL SERVIDOR 
//import producto from './routes/producto';
var categorias_1 = __importDefault(require("./routes/categorias"));
var producto_1 = __importDefault(require("./routes/producto"));
//CLASE 
var Server = /** @class */ (function () {
    function Server() {
        //INICIALIZR AL MODULO EXPRESS
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        //INICIALIZAR EL PUERTO EXPRESS
        this.app.set('port', process.env.PORT || 3000);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan_1.default('dev'));
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression_1.default());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors_1.default());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express_1.default.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express_1.default.urlencoded({ extended: false }));
        // CONEXIÓN A LA BDD
        var MONGO_URI = 'mongodb://localhost:27017/tienda';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(function () {
            console.log("BDD OK");
        });
    };
    Server.prototype.routes = function () {
        //this.app.get('/',(req,res) => {res.send("SERVIDOR DE NODE")});
        this.app.use('/api/producto', producto_1.default);
        this.app.use('/api/categorias', categorias_1.default);
    };
    Server.prototype.start = function () {
        //INICIALIZAR EL SERVIDOR EXPRESS
        this.app.listen(this.app.get('port'), function () {
            console.log("SERVIDOR FUNCIONANDO EN EL PUERTO 3000 OK");
        });
    };
    return Server;
}());
var server = new Server();
server.start();
