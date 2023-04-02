const express = require('express');
const router = express.Router();

const AutorController = require('../controller/autor-controller');

router.get('/AutorTudo', AutorController.getAutorTudo);
router.get('/', AutorController.getAutor);
module.exports = router;