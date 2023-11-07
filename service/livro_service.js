const livroRepository = require('../repository/livro_repository')

function listar() {
    return livroRepository.listar();
}

function inserir(livro) {
    if(livro && livro.nome && livro.ano && livro.ISBN && livro.autor
        && livro.editora) {
        livroRepository.inserir(livro);
    }
    else {
        throw {id:400, message:"Livro não possui nome, ano, ISBN, autor, editora ou ano"};
    }
}

function buscarPorId(id) {
    const livro = livroRepository.buscarPorId(id);
    if(livro) {
        return livro;
    }
    else {
        throw {id:404, message:"Livro não encontrado"};
    }
}

function atualizar(id, livroAtualizado) {
    const livro = livroRepository.buscarPorId(id);
    if(!livro) {
        throw {id: 404, message: "Livro não encontrado"};
    }
    
    if(livroAtualizado && livroAtualizado.nome && livroAtualizado.ano
        && livroAtualizado.ISBN && livroAtualizado.autor 
        && livroAtualizado.editora){
        livroRepository.atualizar(id, livroAtualizado);
    }
    else {
        throw {id: 400, message: "Livro não possui um dos campos obrigatórios"};
    }
}

function deletar(id) {
    const livroDeletado = livroRepository.deletar(id);
    if(livroDeletado){
        return livroDeletado;
    }
    else {
        throw {id: 404, message: "Livro nao encontrado"};
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}