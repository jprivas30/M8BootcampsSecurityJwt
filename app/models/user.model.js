
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: "El nombre es requerido" },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: "El apellido es requerido" },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: "Correo electronico es requerido" },
        isEmail: { args: true, msg: 'Formato de correo invalido' }
      },
      unique: { args: true, msg: 'Correo electronico ya existe!' }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: "La contraseña es requerida" },
      },
    },
  });
  return User;
};