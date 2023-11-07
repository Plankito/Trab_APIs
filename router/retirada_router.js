const express = require('express')
const router = express.Router()
const retiradaController = require('../controller/retirada_controller')


router.get('/', retiradaController.listar);
router.post('/', retiradaController.inserir);
router.get('/:id', retiradaController.buscarPorId);
router.put('/:id', retiradaController.atualizar);
router.delete('/:id', retiradaController.deletar);

module.exports = router;