const logonBD = require('./logon_bd')
const {Client} = require('pg');

//let listaClientes = [];
let idGerador = 1;

async function listar() {
    const client = new Client(logonBD.conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM clientes");
    const listaClientes = result.rows;
    await client.end();
    return listaClientes;
}

//function geraId() {
//    return idGerador++;
//}

async function inserir(cliente) {
    const client = new Client(logonBD.conexao);
    await client.connect();
    const result = await client.query(
        "INSERT INTO clientes(nome, matricula, telefone)" +
        "VALUES ($1, $2, $3) RETURNING *",
        [cliente.nome, cliente.matricula, cliente.telefone]);
    const clienteInserido = result.rows[0];
    await client.end();
    return clienteInserido;
}

async function buscarPorId(id){
    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query('SELECT * FROM clientes WHERE clienteid=$1',[id]);
    const cliente = res.rows[0];
    await client.end();
    return cliente; 
}

async function atualizar(id, cliente) {
    const sql = "UPDATE clientes set nome=$1, matricula=$2, telefone=$3 WHERE clienteid=$4 RETURNING *"
    const values = [cliente.nome, cliente.matricula, cliente.telefone, id];
  
    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const clienteAtualizado = res.rows[0];
    await client.end();
    return clienteAtualizado;
}

async function deletar(id) {
    const sql = 'DELETE FROM clientes WHERE clienteid=$1 RETURNING *'
    const values = [id];

    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const clienteDeletado = res.rows[0];
    await client.end();
    return clienteDeletado;
}

function pesquisarPorLikeNome(nome) {
    return listaClientes.filter(
        (cliente) => {
            return cliente.nome.toUpperCase().includes(nome.toUpperCase());
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