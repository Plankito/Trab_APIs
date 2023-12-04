const logonBD = require('./logon_bd')
const {Client} = require('pg');

//let listaLivros = [];
let listaIndisponiveis = [];
let idGerador = 1;

async function listar() {
    const client = new Client(logonBD.conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM livros");
    const listaLivros = result.rows;
    await client.end();
    return listaLivros;
}

//function geraId() {
//    return idGerador++;
//}

async function inserir(livro) {
    const client = new Client(logonBD.conexao);
    await client.connect();
    const result = await client.query(
        "INSERT INTO livros(autorid, nome, ano, isbn, editora)" +
        "VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [livro.autorid, livro.nome, livro.ano, livro.ISBN, livro.editora]);
    const livroInserido = result.rows[0];
    await client.end();
    return livroInserido;
}

async function buscarPorId(id){
    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query('SELECT livros.*,autores.* FROM livros JOIN autores ON livros.autorid = autores.autorid WHERE livros.livroid = $1',[id]);
    const livro = res.rows[0];
    await client.end();
    return livro; 
}

async function atualizar(id, livro) {
    const sql = "UPDATE livros set autorid=$1, nome=$2, ano=$3, isbn=$4, editora=$5 WHERE livroid=$6 RETURNING *"
    const values = [livro.autorid, livro.nome, livro.ano, livro.ISBN, livro.editora, id];

    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const livroAtualizado = res.rows[0];
    await client.end();
    return livroAtualizado;
}

async function deletar(id) {
    const sql = "DELETE FROM livros WHERE livroid=$1 RETURNING *"
    const values = [id];

    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const livroDeletado = res.rows[0];
    await client.end();
    return livroDeletado;
}

async function disponibilidade(id){
    const sql = "SELECT disponibilidade FROM livros WHERE livroid=$1"
    const values = [id];

    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const livroDisponibilidade = res.rows[0].disponibilidade;
    await client.end();
    return livroDisponibilidade;
}


async function indispor(id) {
    const sql = "UPDATE livros set disponibilidade=$1 WHERE livroid=$2"
    const values = [false,id];

    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const livroIndispor = res.rows[0];
    await client.end();
    return livroIndispor;
}

async function dispor(id) {
    const sql = "UPDATE livros set disponibilidade=$1 WHERE livroid=$2"
    const values = [true,id];

    const client = new Client(logonBD.conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const livroDispor = res.rows[0];
    await client.end();
    return livroDispor;
}


function pesquisarPorLikeNome(nome) {
    return listaLivros.filter(
        (livro) => {
            return livro.nome.toUpperCase().includes(nome.toUpperCase());
        }
    )
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    indispor,
    dispor,
    disponibilidade,
    pesquisarPorLikeNome
}