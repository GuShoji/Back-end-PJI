const express = require('express');
const router = express.Router();

const OrgaoController = require('../controller/orgao-controller');

router.get('/orgaoTudo', OrgaoController.getOrgaoTudo);
router.get('/orgaoPorValor', OrgaoController.getOrgaoPorValor);
router.get('/orgaoPorProcesso', OrgaoController.getOrgaoPorProcesso);
module.exports = router;