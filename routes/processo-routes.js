const express = require('express');
const router = express.Router();

const ProcessoController = require('../controller/processo-controller');

router.get('/', ProcessoController.getProcessos);
router.get('/processoTudo', ProcessoController.getProcessoTudo);
router.get('/processoPorEstado', ProcessoController.getProcessoPorEstado);
router.get('/processoPorAno', ProcessoController.getProcessoPorAno);
router.get('/processoPorAutor', ProcessoController.getProcessoPorAutor);
router.get('/processoPorEstadoAutor', ProcessoController.getProcessoPorEstadoAutor);

module.exports = router;