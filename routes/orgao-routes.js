const express = require('express');
const router = express.Router();

const OrgaoController = require('../controller/orgao-controller');

router.get('/orgaoTudo', OrgaoController.getOrgaoTudo);

module.exports = router;