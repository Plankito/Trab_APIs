const livroService = require('../service/livro_service')

async function listar(req, res) {
    const listaLivros = await livroService.listar();
    res.json(listaLivros);
}

async function inserir(req, res) {
  let livro = req.body;
  try {
    const livroInserido = await livroService.inserir(livro);
    res.status(201).json(livroInserido)
  }
  catch(err) {
    res.status(err.id).json({msg: err.message});
  }
}

async function buscarPorId(req, res) {
  const id = +req.params.id;
  try {
    const livro = await livroService.buscarPorId(id);
    res.json(livro);
  }
  catch(err) {
    res.status(err.id).json({msg: err.message});
  }
}

async function atualizar (req, res) {
  const id = +req.params.id;
  let livro = req.body;

  try{ 
    const livroAtualizado = await livroService.atualizar(id, livro);
    res.json(livroAtualizado);
  }
  catch(err) {
    res.status(err.id).json({msg: err.message});
  }
}


async function deletar(req, res) {
  const id = +req.params.id;
  try{ 
    const livroDeletado = await livroService.deletar(id);
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
