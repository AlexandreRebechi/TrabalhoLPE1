const { getCidadesDB, addCidadesDB, updadeCidadesDB, deleteCidadesDB, getCidadesPorCodigoDB } = require('../usecases/cidadesUseCases')

const getCidades = async (request, response) => {
    await getCidadesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'erro',
            message: 'Erro ao consuldar as Cidades: ' + err
        }))

}
const addCidades = async (request, response) => {
    await addCidadesDB(request.body)
        .then(data => response.status(200).json({
            status: "success", 
            message: "Cidades criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updadeCidades = async (request, response) => {
    await updadeCidadesDB(request.body)
        .then(data => response.status(200).json({
            status: "success", 
            message: "Cidades alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));

}
const deleteCidades = async (request, response) => {
    await deleteCidadesDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", 
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getCidadesPorCodigo = async (request, response) => {
    await getCidadesPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = { getCidades, addCidades, updadeCidades, deleteCidades, getCidadesPorCodigo }
