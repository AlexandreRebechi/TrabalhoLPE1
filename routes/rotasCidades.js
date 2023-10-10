const { Router } = require('express');
const { getCidades, addCidades, updadeCidades, deleteCidades, getCidadesPorCodigo } = require('../controllers/cidadesController');
const { verificaJWT } = require('../controllers/segurancaController');

rotasCidades = new Router();

rotasCidades.route('/cidades')
    .get(verificaJWT, getCidades)
    .post(verificaJWT, addCidades)
    .put(verificaJWT, updadeCidades)
rotasCidades.route('/cidades/:codigo')
    .get(verificaJWT, getCidadesPorCodigo)
    .delete(verificaJWT, deleteCidades)

module.exports = { rotasCidades };