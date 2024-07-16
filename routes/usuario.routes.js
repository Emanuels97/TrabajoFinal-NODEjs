const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usuario.controller');

router.post('/login', userCtrl.login);
router.get('/', userCtrl.getUsuarios);
router.post('/registro', userCtrl.createUsuario);
router.get('/:id', userCtrl.getUsuarioById);
router.put('/:id', userCtrl.updateUsuario);
router.delete('/:id', userCtrl.deleteUsuario);

module.exports = router;