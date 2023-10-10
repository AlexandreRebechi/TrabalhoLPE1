const { pool } = require('../config')
const Estados = require('../entities/estados')

const getEstadosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM estados ORDER BY nome`);
        return rows.map((estados) => new Estados(estados.codigo, estados.nome, estados.uf, estados.pais));
    } catch (err) {
        throw "Erro : " + err
    }

}

const addEstadosDB = async (body) => {
    try {
        const { nome, uf, pais } = body;
        const results = await pool.query(`INSERT INTO estados (nome, uf, pais)
            VALUES ($1, $2, $3)
            returning codigo, nome, uf, pais`,
            [nome, uf, pais]);
        const estados = results.rows[0];
        return new Estados(estados.codigo, estados.nome, estados.uf, estados.pais);
    } catch (err) {
        throw "Erro ao inserir em estados: " + err;
    }
}
const updadeEstadosDB = async (body) => {
    try {
        const { codigo, nome, uf, pais } = body;
        const results = await pool.query(`UPDATE estados set nome = $2, uf = $3, pais = $4 where codigo = $1
        returning codigo, nome, uf, pais`,
        [codigo, nome, uf, pais]);
        if (results.codigo == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const estados = results.rows[0];
        return new Estados(estados.codigo, estados.nome, estados.uf, estados.pais);
    } catch (err) {
        throw "Erro ao alterar em estados: " + err;
    }

}

const deleteEstadosDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM  estados where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            return "Estado removido com sucesso";
        }
    } catch (error) {
        throw "Erro ao remover em estados: " + err;
    }
}

const getEstadosPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM estados where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: "+ codigo;

        }else{
            const estados = results.rows[0];
            return new Estados(estados.codigo, estados.nome, estados.uf, estados.pais);
        }
    } catch (err) {
        throw "Erro ao recuperar o estado: " + err;
    }
}



module.exports = { getEstadosDB, addEstadosDB, updadeEstadosDB, deleteEstadosDB, getEstadosPorCodigoDB }