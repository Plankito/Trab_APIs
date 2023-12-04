const logonBD = require('./logon_bd')
const {Client} = require('pg');
const livroRepository = require('./livro_repository')
const clienteRepository = require('./cliente_repository')


//let listaRetiradas = [];
let idGerador = 1;

async function listar() {
    const client = new Client(logonBD.conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM retiradas");
    const listaRetiradas = result.rows;
    await client.end();
    return listaRetiradas;
}

//function geraId() {
//    return idGerador++;
//}

async function inserir(retirada) {
    const client = new Client(logonBD.conexao);
    await client.connect();
    const result = await client.query(
        "INSERT INTO retiradas(clienteid, livroid)" +
        "VALUES ($1,$2) RETURNING *",
        [retirada.clienteId, retirada.livroId]);
    const retiradaInserida = result.rows[0];
    await client.end();
    return retiradaInserida;
}

async function buscarPorId(id){
    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query('SELECT retiradas.*,clientes.*,livros.* FROM retiradas JOIN clientes ON retiradas.clienteid = clientes.clienteid JOIN livros ON retiradas.livroid = livros.livroid WHERE retiradas.retiradaid = $1',[id]);
    const retirada = res.rows[0];
    await client.end();
    return retirada; 
}

async function atualizar(id, retirada) {
    const sql = 'UPDATE retiradas set clienteid=$1, livroid=$2 WHERE retiradaid=$3 RETURNING *'
    const values = [retirada.clienteId, retirada.livroId, id];

    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const retiradaAtualizada = res.rows[0];
    await client.end();
    return retiradaAtualizada;
}

async function deletar(id) {
    const sql = 'DELETE FROM retiradas WHERE retiradaid=$1 RETURNING *'
    const values = [id];

    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const retiradaDeletada = res.rows[0];
    await client.end();
    return retiradaDeletada;
}

function dispor(id) {
    for (let ind in listaRetiradas) {
        if (listaRetiradas[ind].id === id) {
            livroRepository.dispor(listaRetiradas[ind].livroId); 
        }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    dispor,
    deletar
}