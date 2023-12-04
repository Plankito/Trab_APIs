const autorService = require('../service/autor_service')

async function listar(req, res) {
  const listaAutores = await autorService.listar();
  res.json(listaAutores);
}

async function inserir(req, res) {
    let autor = req.body;
    try {
      const autorInserido = await autorService.inserir(autor);
      res.status(201).json({autorInserido})
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const autor = await autorService.buscarPorId(id);
      res.json(autor);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function atualizar (req, res) {
    const id = +req.params.id;
    let autor = req.body;
  
    try{ 
      const autorAtualizado = await autorService.atualizar(id, autor);
      res.json({autorAtualizado});
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const autorDeletado = await autorService.deletar(id);
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
