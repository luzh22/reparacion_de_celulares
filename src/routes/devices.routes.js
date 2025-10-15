const express = require('express');
const router = express.Router();
const controller = require('../controllers/devices.controller');

// Listar y crear
router.get('/', controller.list);
router.post('/', controller.create);

// Operaciones con id
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
