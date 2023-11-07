const autorRepository = require('../repository/autor_repository')

function listar() {
    return autorRepository.listar();
}

function inserir(autor) {
    if(autor && autor.nome && autor.pais) {
        autorRepository.inserir(autor);
    }
    else {
        throw {id:400, message:"Autor não possui nome ou país"};
    }
}

function buscarPorId(id) {
    const autor = autorRepository.buscarPorId(id);
    if(autor) {
        return autor;
    }
    else {
        throw {id:404, message:"Autor não encontrado"};
    }
}

function atualizar(id, autorAtualizado) {
    const autor = autorRepository.buscarPorId(id);
    if(!autor) {
        throw {id: 404, message: "Autor não encontrado"};
    }
    
    if(autorAtualizado && autorAtualizado.nome && autorAtualizado.pais){
        autorRepository.atualizar(id, autorAtualizado);
    }
    else {
        throw {id: 400, message: "Autor não possui um dos campos obrigatórios"};
    }
}

function deletar(id) {
    const autorDeletado = autorRepository.deletar(id);
    if(autorDeletado){
        return autorDeletado;
    }
    else {
        throw {id: 404, message: "Autor nao encontrado"};
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}