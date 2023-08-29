const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/login', userController.login);

router.post('/signin', userController.login);


// Obtener todos los usuarios

router.get('/users', userController.findAll);


// Obtener usuarios por ID

router.get('/user/:id', userController.findUserById);


//Actualizar usuario po ID

router.put('/user/:id', userController.updateUserById);


//Eliminar usuario por ID

router.delete('/user/:id', userController.deleteUserById);


module.exports = router;