const retiradaRepository = require('../repository/retirada_repository')
const clienteRepository = require('../repository/cliente_repository')
const livroRepository = require('../repository/livro_repository')


async function listar() {
    return await retiradaRepository.listar();
}

async function inserir(retirada) {
    if(retirada && retirada.clienteId && retirada.livroId){
        if(await clienteRepository.buscarPorId(retirada.clienteId)
        && await livroRepository.buscarPorId(retirada.livroId)){
            if(await livroRepository.disponibilidade(retirada.livroId)) 
            {
                await livroRepository.indispor(retirada.livroId);
                return await retiradaRepository.inserir(retirada);
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

async function buscarPorId(id) {
    const retirada = await retiradaRepository.buscarPorId(id);
    if(retirada) {
        return retirada;
    }
    else {
        throw {id:404, message:"Retirada não encontrada"};
    }
}

async function atualizar(id, retiradaAtualizada) {
    const retirada = await retiradaRepository.buscarPorId(id);
    
    if(!retirada) {
        throw {id: 404, message: "Retirada não encontrada"};
    }
    
    if(retiradaAtualizada && retiradaAtualizada.clienteId && retiradaAtualizada.livroId){
        await livroRepository.dispor(retirada.livroid);
        await livroRepository.indispor(retiradaAtualizada.livroId);
        return await retiradaRepository.atualizar(id, retiradaAtualizada);
    }
    else {
        throw {id: 400, message: "Retirada não possui um dos campos obrigatórios"};
    }
}

async function deletar(id) {
    const retiradaAtual = await buscarPorId(id);
    const retiradaDeletada = await retiradaRepository.deletar(id);
    if(retiradaDeletada){
        await livroRepository.dispor(retiradaAtual.livroid);
        return retiradaDeletada;
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