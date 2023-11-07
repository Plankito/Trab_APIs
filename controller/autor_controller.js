const autorService = require('../service/autor_service')

function listar(req, res) {
    const listaAutores = autorService.listar();
    res.json(listaAutores);
}

function inserir(req, res) {
    let autor = req.body;
    try {
      autorService.inserir(autor);
      res.status(201).json({msg:'Inserido com sucesso!'})
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const prod = autorService.buscarPorId(id);
      res.json(prod);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function atualizar (req, res) {
    const id = +req.params.id;
    let autor = req.body;
  
    try{ 
      autorService.atualizar(id, autor);
      res.json({msg:'Autor atualizado com sucesso!'});
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const autorDeletado = autorService.deletar(id);
      res.json(autorDeletado);
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
