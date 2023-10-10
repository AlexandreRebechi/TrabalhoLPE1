const { getEstadosDB, addEstadosDB, updadeEstadosDB, deleteEstadosDB, getEstadosPorCodigoDB } = require('../usecases/estadosUseCases')

const getEstados = async (request, response) => {
    await getEstadosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'erro',
            message: 'Erro ao consuldar os estados: ' + err
        }))

}
const addEstados = async (request, response) => {
    await addEstadosDB(request.body)
        .then(data => response.status(200).json({
            status: "success", 
            message: "Estados criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updadeEstados = async (request, response) => {
    await updadeEstadosDB(request.body)
        .then(data => response.status(200).json({
            status: "success", 
            message: "Estados alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));

}
const deleteEstados = async (request, response) => {
    await deleteEstadosDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", 
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getEstadosPorCodigo = async (request, response) => {
    await getEstadosPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = { getEstados, addEstados, updadeEstados, deleteEstados, getEstadosPorCodigo }
