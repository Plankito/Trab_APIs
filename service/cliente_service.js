const clienteRepository = require('../repository/cliente_repository')

function listar() {
    return clienteRepository.listar();
}

function inserir(cliente) {
    if(cliente && cliente.nome && cliente.matricula && cliente.telefone) {
        clienteRepository.inserir(cliente);
    }
    else {
        throw {id:400, message:"Cliente não possui nome, matricula ou telefone"};
    }
}

function buscarPorId(id) {
    const cliente = clienteRepository.buscarPorId(id);
    if(cliente) {
        return cliente;
    }
    else {
        throw {id:404, message:"Cliente não encontrado"};
    }
}

function atualizar(id, clienteAtualizado) {
    const cliente = clienteRepository.buscarPorId(id);
    if(!cliente) {
        throw {id: 404, message: "Cliente não encontrado"};
    }
    
    if(clienteAtualizado && clienteAtualizado.nome && clienteAtualizado.matricula
        && clienteAtualizado.telefone){
        clienteRepository.atualizar(id, clienteAtualizado);
    }
    else {
        throw {id: 400, message: "Cliente não possui um dos campos obrigatórios"};
    }
}

function deletar(id) {
    const clienteDeletado = clienteRepository.deletar(id);
    if(clienteDeletado){
        return clienteDeletado;
    }
    else {
        throw {id: 404, message: "Cliente nao encontrado"};
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}