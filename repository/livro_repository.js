
let listaLivros = [];
let listaIndisponiveis = [];
let idGerador = 1;

function listar() {
    return listaLivros;
}

function geraId() {
    return idGerador++;
}

function inserir(livro) {
    livro.id = geraId();
    listaLivros.push(livro);
}

function buscarPorId(id){
    return listaLivros.find(function(livro) {
        return(livro.id === id);        
    })   
}

function atualizar(id, livro) {
    for(let ind in listaLivros) {
        if(listaLivros[ind].id === id) {
            listaLivros[ind] = livro;
            listaLivros[ind].id = id;
            return;
        }
    }
}

function deletar(id) {
    for(let ind in listaLivros) {
        if(listaLivros[ind].id === id) {
            return listaLivros.splice(ind,1)[0];
        }
    }
}

function indispor(retirada) {
    listaIndisponiveis.push(retirada);
}

function verifIndispor(id){
    return listaIndisponiveis.find(function(retirada) {
        return(retirada.livroId === id);        
    })   
}

function dispor(id) {
    for (let ind in listaIndisponiveis) {
        if (listaIndisponiveis[ind].livroId === id) {
            return listaIndisponiveis.splice(ind, 1)[0];
        }
    }
}


function pesquisarPorLikeNome(nome) {
    return listaLivros.filter(
        (livro) => {
            return livro.nome.toUpperCase().includes(nome.toUpperCase());
        }
    )
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    indispor,
    verifIndispor,
    dispor,
    pesquisarPorLikeNome
}