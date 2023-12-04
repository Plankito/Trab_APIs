const clienteRepository = require('../repository/cliente_repository')

async function listar() {
    return await clienteRepository.listar();
}

async function inserir(cliente) {
    if(cliente && cliente.nome && cliente.matricula && cliente.telefone) {
        return await clienteRepository.inserir(cliente);
    }
    else {
        throw {id:400, message:"Cliente não possui nome, matricula ou telefone"};
    }
}

async function buscarPorId(id) {
    const cliente = await clienteRepository.buscarPorId(id);
    if(cliente) {
        return cliente;
    }
    else {
        throw {id:404, message:"Cliente não encontrado"};
    }
}

async function atualizar(id, clienteAtualizado) {
    const cliente = await clienteRepository.buscarPorId(id);
    if(!cliente) {
        throw {id: 404, message: "Cliente não encontrado"};
    }
    
    if(clienteAtualizado && clienteAtualizado.nome && clienteAtualizado.matricula
        && clienteAtualizado.telefone){
        return await clienteRepository.atualizar(id, clienteAtualizado);
    }
    else {
        throw {id: 400, message: "Cliente não possui um dos campos obrigatórios"};
    }
}

async function deletar(id) {
    try{const clienteDeletado = await clienteRepository.deletar(id); 
        if(clienteDeletado){
            return clienteDeletado;
        }
    }
    catch{
        throw {id: 409, message: "Cliente registrado em uma retirada!"};
    }
    const clienteDeletado = await clienteRepository.deletar(id);
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