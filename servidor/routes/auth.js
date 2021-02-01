//rutas para autentificar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//Iniciar sesión

//api/auth
router.post('/',
  [
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser de al menos 6 caracteres').isLength({min: 6})
  ],
  authController.autentificarUsuario
);

// Obtiene el usuario autentificado
router.get('/',
  auth,
  authController.usuarioAutentificado
);
module.exports = router;