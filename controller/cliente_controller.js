const clienteService = require('../service/cliente_service')

function listar(req, res) {
    const listaClientes = clienteService.listar();
    res.json(listaClientes);
}

function inserir(req, res) {
    let cliente = req.body;
    try {
      clienteService.inserir(cliente);
      res.status(201).json({msg:'Inserido com sucesso!'})
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const prod = clienteService.buscarPorId(id);
      res.json(prod);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function atualizar (req, res) {
    const id = +req.params.id;
    let cliente = req.body;
  
    try{ 
      clienteService.atualizar(id, cliente);
      res.json({msg:'Cliente atualizado com sucesso!'});
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const clienteDeletado = clienteService.deletar(id);
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
