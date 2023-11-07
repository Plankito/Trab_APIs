const retiradaRepository = require('../repository/retirada_repository')
const clienteRepository = require('../repository/cliente_repository')
const livroRepository = require('../repository/livro_repository')


function listar() {
    return retiradaRepository.listar();
}

function inserir(retirada) {
    if(retirada && retirada.clienteId && retirada.livroId){
        if(clienteRepository.buscarPorId(retirada.clienteId)
        && livroRepository.buscarPorId(retirada.livroId)){
            if(!livroRepository.verifIndispor(retirada.livroId)) 
            {retiradaRepository.inserir(retirada);
            }  
            else{
                throw {id:404, message:"Livro não está disponível!"};
            }
        }
        else{
            throw {id:404, message:"ID de Cliente ou de Livro não encontrados!"};
        }
    }
    else {
        throw {id:400, message:"Retirada não possui ID de Cliente ou de Livro"};
    }
}

function buscarPorId(id) {
    const retirada = retiradaRepository.buscarPorId(id);
    if(retirada) {
        return retirada;
    }
    else {
        throw {id:404, message:"Retirada não encontrada"};
    }
}

function atualizar(id, retiradaAtualizado) {
    const retirada = retiradaRepository.buscarPorId(id);
    if(!retirada) {
        throw {id: 404, message: "Retirada não encontrada"};
    }
    
    if(retiradaAtualizado && retiradaAtualizado.clienteId && retiradaAtualizado.livroId){
        retiradaRepository.atualizar(id, retiradaAtualizado);
    }
    else {
        throw {id: 400, message: "Retirada não possui um dos campos obrigatórios"};
    }
}

function deletar(id) {
    const retiradaDeletado = retiradaRepository.deletar(id);
    
    if(retiradaDeletado){

        return retiradaDeletado;
    }
    else {
        throw {id: 404, message: "Retirada nao encontrada"};
    }
}


module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}