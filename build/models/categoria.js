"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categoriasSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es Obligatorio']
    }
});
exports.default = mongoose_1.model('Categoria', categoriasSchema);
