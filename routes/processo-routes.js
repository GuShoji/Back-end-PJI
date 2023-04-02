const express = require('express');
const router = express.Router();

const ProcessoController = require('../controller/processo-controller');

router.get('/', ProcessoController.getProcessos);
router.get('/processoTudo', ProcessoController.getProcessoTudo);

module.exports = router;