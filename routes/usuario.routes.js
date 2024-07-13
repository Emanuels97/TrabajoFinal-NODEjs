const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usuario.controller');

router.get('/', userCtrl.getUsuarios);
router.post('/', userCtrl.createUsuario);
router.get('/:id', userCtrl.getUsuarioById);
router.put('/:id', userCtrl.updateUsuario);
router.delete('/:id', userCtrl.deleteUsuario);

module.exports = router;