const autorRepository = require('../repository/autor_repository')

async function listar() {
    return await autorRepository.listar();
}

async function inserir(autor) {
    if(autor && autor.nome && autor.pais) {
        return await autorRepository.inserir(autor);
    }
    else {
        throw {id:400, message:"Autor não possui nome ou país"};
    }
}

async function buscarPorId(id) {
    const autor = await autorRepository.buscarPorId(id);
    if(autor) {
        return autor;
    }
    else {
        throw {id:404, message:"Autor não encontrado"};
    }
}

async function atualizar(id, autorAtualizado) {
    const autor = await autorRepository.buscarPorId(id);
    if(!autor) {
        throw {id: 404, message: "Autor não encontrado"};
    }
    
    if(autorAtualizado && autorAtualizado.nome && autorAtualizado.pais){
        if(await buscarPorId(id)){
            console.log("Aqui!");
            return await autorRepository.atualizar(id, autorAtualizado);
        }
        else{
            throw {id:404, message:"Autor não encontrado!"};
        }
    
        
    }
    else {
        throw {id: 400, message: "Autor não possui um dos campos obrigatórios"};
    }
}

async function deletar(id) {
        try{const autorDeletado = await autorRepository.deletar(id); 
            if(autorDeletado){
                return autorDeletado;
            }
        }
        catch{
            throw {id: 409, message: "Autor registrado em um livro!"};
        }
        const autorDeletado = await autorRepository.deletar(id);
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