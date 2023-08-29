const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Registro de usuarios.

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await userController.createUser({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
});



module.exports = router;