let listaAutores = [];
let idGerador = 1;

function listar() {
    return listaAutores;
}

function geraId() {
    return idGerador++;
}

function inserir(autor) {
    autor.id = geraId();
    listaAutores.push(autor);
}

function buscarPorId(id){
    return listaAutores.find(function(autor) {
        return(autor.id === id);        
    })   
}

function atualizar(id, autor) {
    for(let ind in listaAutores) {
        if(listaAutores[ind].id === id) {
            listaAutores[ind] = autor;
            listaAutores[ind].id = id;
            return;
        }
    }
}

function deletar(id) {
    for(let ind in listaAutores) {
        if(listaAutores[ind].id === id) {
            return listaAutores.splice(ind,1)[0];
        }
    }
}

function pesquisarPorLikeNome(nome) {
    return listaAutores.filter(
        (autor) => {
            return autor.nome.toUpperCase().includes(nome.toUpperCase());
        }
    )
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorLikeNome
}