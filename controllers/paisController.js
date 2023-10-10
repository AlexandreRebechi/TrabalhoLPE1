const { getPaisDB, addPaisDB, updadePaisDB, deletePaisDB, getPaisPorCodigoDB } = require('../usecases/paisUseCases')

const getPais = async (request, response) => {
    await getPaisDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'erro',
            message: 'Erro ao consuldar os paises: ' + err
        }))

}
const addPais = async (request, response) => {
    await addPaisDB(request.body)
        .then(data => response.status(200).json({
            status: "success", 
            message: "Pais criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updadePais = async (request, response) => {
    await updadePaisDB(request.body)
        .then(data => response.status(200).json({
            status: "success", 
            message: "Pais alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));

}
const deletePais = async (request, response) => {
    await deletePaisDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", 
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getPaisPorCodigo = async (request, response) => {
    await getPaisPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = { getPais, addPais, updadePais, deletePais, getPaisPorCodigo }
