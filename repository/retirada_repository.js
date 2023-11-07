const livroRepository = require('./livro_repository')


let listaRetiradas = [];
let idGerador = 1;

function listar() {
    return listaRetiradas;
}

function geraId() {
    return idGerador++;
}

function inserir(retirada) {
    retirada.id = geraId();
    listaRetiradas.push(retirada);
}

function buscarPorId(id){
    return listaRetiradas.find(function(retirada) {
        return(retirada.id === id);        
    })   
}

function atualizar(id, retirada) {
    for(let ind in listaRetiradas) {
        if(listaRetiradas[ind].id === id) {
            listaRetiradas[ind] = retirada;
            listaRetiradas[ind].id = id;
            return;
        }
    }
}

function deletar(id) {
    for(let ind in listaRetiradas) {
        if(listaRetiradas[ind].id === id) {
            dispor(id)
            return listaRetiradas.splice(ind,1)[0];
        }
    }
}

function dispor(id) {
    for (let ind in listaRetiradas) {
        if (listaRetiradas[ind].id === id) {
            livroRepository.dispor(listaRetiradas[ind].livroId); 
        }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    dispor,
    deletar
}