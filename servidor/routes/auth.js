//rutas para autentificar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');

router.post('/',
  [
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser de al menos 6 caracteres').isLength({min: 6})
  ],
  authController.autentificarUsuario
);
module.exports = router;