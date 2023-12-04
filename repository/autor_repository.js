const logonBD = require('./logon_bd')
const {Client} = require('pg');

//let listaAutores = [];
let idGerador = 1;

async function listar() {
    const client = new Client(logonBD.conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM autores");
    const listaAutores = result.rows;
    await client.end();
    return listaAutores;
}

//function geraId() {
//    return idGerador++;
//}

async function inserir(autor) {
    const client = new Client(logonBD.conexao);
    await client.connect();
    const result = await client.query(
        "INSERT INTO autores(nome, pais)" +
        "VALUES ($1,$2) RETURNING *",
        [autor.nome, autor.pais]);
    const autorInserido = result.rows[0];
    await client.end();
    return autorInserido;
}

async function buscarPorId(id){
    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query('SELECT * FROM autores WHERE autorid=$1',[id]);
    const autor = res.rows[0];
    await client.end();
    return autor; 
}

async function atualizar(id, autor) {
    const sql = 'UPDATE autores set nome=$1, pais=$2 WHERE autorid=$3 RETURNING *'
    const values = [autor.nome, autor.pais, id];

    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const autorAtualizado = res.rows[0];
    await client.end();
    return autorAtualizado;
}

async function deletar(id) {
    const sql = "DELETE FROM autores WHERE autorid=$1 RETURNING *"
    const values = [id];

    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const autorDeletado = res.rows[0];
    await client.end();
    return autorDeletado;
    
}

function pesquisarPorLikeNome(nome) {
    return listaAutores.filter(
        (autor) => {
            return autor.nome.toUpperCase().includes(nome.toUpperCase());
        }
    )
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorLikeNome
}