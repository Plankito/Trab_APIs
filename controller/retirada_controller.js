const retiradaService = require('../service/retirada_service')
const livroRepository = require('../repository/livro_repository')

function listar(req, res) {
    const listaRetiradas = retiradaService.listar();
    res.json(listaRetiradas);
}

function inserir(req, res) {
    let retirada = req.body;
    try {
      retiradaService.inserir(retirada);
      livroRepository.indispor(retirada);
      res.status(201).json({msg:'Inserida com sucesso!'})
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const prod = retiradaService.buscarPorId(id);
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
      retiradaService.atualizar(id, livro);
      res.json({msg:'Retirada atualizada com sucesso!'});
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const retiradaDeletado = retiradaService.deletar(id);
      res.json(retiradaDeletado);
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
