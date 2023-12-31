const clienteService = require('../service/cliente_service')

async function listar(req, res) {
    const listaClientes = await clienteService.listar();
    res.json(listaClientes);
}

async function inserir(req, res) {
    let cliente = req.body;
    try {
      const clienteInserido = await clienteService.inserir(cliente);
      res.status(201).json({clienteInserido})
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const cliente = await clienteService.buscarPorId(id);
      res.json(cliente);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function atualizar (req, res) {
    const id = +req.params.id;
    let cliente = req.body;
  
    try{ 
      const clienteAtualizado = await clienteService.atualizar(id, cliente);
      res.json({clienteAtualizado});
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const clienteDeletado = await clienteService.deletar(id);
      res.json(clienteDeletado);
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
