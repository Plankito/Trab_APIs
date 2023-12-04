const livroRepository = require('../repository/livro_repository')
const autorService = require('../service/autor_service')

async function listar() {
    return await livroRepository.listar();
}

async function inserir(livro) {
    if(livro && livro.autorid && livro.nome && livro.ano && livro.ISBN 
        && livro.editora) {
            if(await autorService.buscarPorId(livro.autorid)){
                return await livroRepository.inserir(livro);
            }
            else{
                throw {id:404, message:"Autor não encontrado!"};
            }
    }
    else {
        throw {id:400, message:"Livro não possui nome, ano, ISBN, autorid, editora ou ano"};
    }
}

async function buscarPorId(id) {
    const livro = await livroRepository.buscarPorId(id);
    if(livro) {
        return livro;
    }
    else {
        throw {id:404, message:"Livro não encontrado"};
    }
}

async function atualizar(id, livroAtualizado) {
    const livro = await livroRepository.buscarPorId(id);
    if(!livro) {
        throw {id: 404, message: "Livro não encontrado"};
    }
    
    if(livroAtualizado && livroAtualizado.autorid && livroAtualizado.nome && livroAtualizado.ano
        && livroAtualizado.ISBN
        && livroAtualizado.editora){
            if(await autorService.buscarPorId(livroAtualizado.autorid)){
                return await livroRepository.atualizar(id, livroAtualizado);
            }
            else{
                throw {id:404, message:"Autor não encontrado!"};
            }
        
    }
    else {
        throw {id: 400, message: "Livro não possui um dos campos obrigatórios"};
    }
}

async function deletar(id) {
    try{const livroDeletado = await livroRepository.deletar(id); 
        if(livroDeletado){
            return livroDeletado;
        }
    }
    catch{
        throw {id: 409, message: "Livro registrado em uma retirada!"};
    }
    const livroDeletado = await livroRepository.deletar(id);
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