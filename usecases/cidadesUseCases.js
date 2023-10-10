const { pool } = require('../config')
const Cidades = require('../entities/cidades')

const getCidadesDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM cidades ORDER BY nome`);
        return rows.map((cidades) => new Cidades(cidades.codigo, cidades.nome, cidades.estado));
    } catch (err) {
        throw "Erro : " + err
    }

}

const addCidadesDB = async (body) => {
    try {
        const { nome, estado } = body;
        const results = await pool.query(`INSERT INTO cidades (nome, estado)
            VALUES ($1, $2)
            returning codigo, nome, estado`,
            [nome, estado]);
        const cidades = results.rows[0];
        return new Cidades(cidades.codigo, cidades.nome, cidades.estado);
    } catch (err) {
        throw "Erro ao inserir em Cidades: " + err;
    }
}
const updadeCidadesDB = async (body) => {
    try {
        const { codigo, nome, estado } = body;
        const results = await pool.query(`UPDATE cidades set nome = $2, estado = $3 where codigo = $1
        returning codigo, nome, estado`,
        [codigo, nome, estado]);
        if (results.codigo == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const cidades = results.rows[0];
        return new Cidades(cidades.codigo, cidades.nome, cidades.estado);
    } catch (err) {
        throw "Erro ao alterar em Cidades: " + err;
    }

}

const deleteCidadesDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM  cidades where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            return "Cidade removida com sucesso";
        }
    } catch (error) {
        throw "Erro ao remover em cidades: " + err;
    }
}

const getCidadesPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM Cidades where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: "+ codigo;

        }else{
            const cidades = results.rows[0];
            return new Cidades(cidades.codigo, cidades.nome, cidades.estado);
        }
    } catch (err) {

    }
}



module.exports = { getCidadesDB, addCidadesDB, updadeCidadesDB, deleteCidadesDB, getCidadesPorCodigoDB }