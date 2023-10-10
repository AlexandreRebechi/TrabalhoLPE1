const { Router } = require('express');
const { getEstados, addEstados, updadeEstados, deleteEstados, getEstadosPorCodigo } = require('../controllers/estadosController');
const { verificaJWT } = require('../controllers/segurancaController');


rotasEstados =  new Router();

rotasEstados.route('/estados')
    .get(verificaJWT, getEstados)
    .post(verificaJWT, addEstados)
    .put(verificaJWT, updadeEstados)
rotasEstados.route('/estados/:codigo')
    .get(verificaJWT, getEstadosPorCodigo)
    .delete(verificaJWT, deleteEstados)

module.exports = { rotasEstados };