const { pool } = require('../config')
const Pais = require('../entities/pais')

const getPaisDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM pais ORDER BY nome');
        return rows.map((pais) => new Pais(pais.codigo, pais.nome));
    } catch (err) {
        throw "Erro : " + err
    }

}

const addPaisDB = async (body) => {
    try {
        const { nome } = body;
        const results = await pool.query(`INSERT INTO pais (nome)
            VALUES ($1)
            returning codigo, nome`,
            [nome]);
        const pais = results.rows[0];
        return new Pais(pais.codigo, pais.nome);
    } catch (err) {
        throw "Erro ao inserir em pais: " + err;
    }
}
const updadePaisDB = async (body) => {
    try {
        const { codigo, nome } = body;
        const results = await pool.query(`UPDATE pais set nome = $2 where codigo = $1
        returning codigo, nome`,
        [codigo, nome]);
        if (results.codigo == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const pais = results.rows[0];
        return new Pais(pais.codigo, pais.nome);
    } catch (err) {
        throw "Erro ao alterar em pais: " + err;
    }

}

const deletePaisDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM pais where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            return "Pais removido com sucesso";
        }
    } catch (error) {
        throw "Erro ao remover em pais: " + err;
    }
}

const getPaisPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM pais where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: "+ codigo;
        }else{
            const pais = results.rows[0];
            return new Pais(pais.codigo, pais.nome);
        }
    } catch (err) {

    }
}



module.exports = { getPaisDB, addPaisDB, updadePaisDB, deletePaisDB, getPaisPorCodigoDB }