const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.users;
const Bootcamp = db.bootcamps;
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Contraseña incorrecta."
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 43200 
    });

    res.status(200).send({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: token
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.createUser = async (user) => {
  const existingUser = await User.findOne({ where: { email: user.email } });
  if (existingUser) {
    console.log(`El usuario ${user.email} ya existe.`);
    return existingUser;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  return User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: hashedPassword
  })
  .then(user => {
    console.log(`Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`);
    return user;
  })
  .catch(err => {
    console.log(`Error al crear el usuario ${err}`);
  });
};

exports.getAllUsers = () => {
  return User.findAll({
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    }, ],
  });
};

exports.findAll = (req, res) => {
  User.findAll({
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    }, ],
  })
  .then(users => {
    if (res) {
      res.send(users);
    } else {
      console.log(users);
    }
  })
  .catch(err => {
    console.log(`Error al encontrar usuarios: ${err}`);
    if (res) {
      res.status(500).send({ message: err.message });
    }
  });
};
exports.getUserById = (userId) => {
  return User.findByPk(userId, {
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    }, ],
  });
};

exports.findUserById = (req, res) => {
  const userId = req.params.id;

  exports.getUserById(userId)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: `No se encontró el usuario ${userId}` });
      } else {
        res.send(user);
      }
    })
    .catch(err => {
      console.log(`Error mientras se encontraba los usuarios: ${err}`);
      res.status(500).send({ message: err.message });
    });
};


// Actualizar usuarios

exports.updateUserById = (req, res) => {
  const id = req.params.id;
  const { firstName, lastName } = req.body;

  User.update({ firstName, lastName }, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Usuario actualizado exitosamente." });
      } else {
        res.send({ message: `No se logro actualizar el usuario con id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error al actualizar el usuario con id=" + id });
    });
};

// Eliminar usuarios

exports.deleteUserById = (req, res) => {
  const userId = req.params.id;

  User.destroy({
    where: { id: userId }
  })
  .then(() => {
    res.status(200).send({ message: `Usuario ${userId} eliminado exitosamente.` });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};