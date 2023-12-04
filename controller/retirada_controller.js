const retiradaService = require('../service/retirada_service')
const livroRepository = require('../repository/livro_repository')

async function listar(req, res) {
    const listaRetiradas = await retiradaService.listar();
    res.json(listaRetiradas);
}

async function inserir(req, res) {
    let retirada = req.body;
    try {
      const retiradaInserida = await retiradaService.inserir(retirada);
      //livroRepository.indispor(retirada);
      res.status(201).json({retiradaInserida})
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const retirada = await retiradaService.buscarPorId(id);
      res.json(retirada);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function atualizar (req, res) {
    const id = +req.params.id;
    let retirada = req.body;
  
    try{ 
      const retiradaAtualizada = await retiradaService.atualizar(id, retirada);
      res.json({retiradaAtualizada});
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const retiradaDeletada = await retiradaService.deletar(id);
      res.json(retiradaDeletada);
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
