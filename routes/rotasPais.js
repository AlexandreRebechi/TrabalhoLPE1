const { Router } = require('express');

const { getPais, addPais, updadePais, deletePais, getPaisPorCodigo } = require('../controllers/paisController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasPais = new Router();

rotasPais.route('/pais')
    .get(verificaJWT, getPais)
    .post(verificaJWT, addPais)
    .put(verificaJWT, updadePais)
rotasPais.route('/pais/:codigo')
    .get(verificaJWT, getPaisPorCodigo)
    .delete(verificaJWT, deletePais)

module.exports = { rotasPais }

