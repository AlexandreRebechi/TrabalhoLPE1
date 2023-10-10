const {Router} = require('express');

const {rotasPais} = require('./rotasPais');
const { rotasEstados } = require('./rotasEstados');
const { rotasCidades } = require('./rotasCidades');

const rotas = new Router();

rotas.route('/login').post();

rotas.use(rotasPais);
rotas.use(rotasEstados);
rotas.use(rotasCidades)

module.exports = rotas;