const livroService = require('../service/livro_service')

function listar(req, res) {
    const listaLivros = livroService.listar();
    res.json(listaLivros);
}

function inserir(req, res) {
    let livro = req.body;
    try {
      livroService.inserir(livro);
      res.status(201).json({msg:'Inserido com sucesso!'})
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const prod = livroService.buscarPorId(id);
      res.json(prod);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function atualizar (req, res) {
    const id = +req.params.id;
    let livro = req.body;
  
    try{ 
      livroService.atualizar(id, livro);
      res.json({msg:'Livro atualizado com sucesso!'});
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const livroDeletado = livroService.deletar(id);
      res.json(livroDeletado);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }   
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}
