module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define('bootcamp', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre es requerido"
        },
      },
    },
    cue: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Necesita minimo 5 y máximo 20 numeros"
        },
        isInt: {
          args: true,
          msg: "Debe ser un numero entero."
        },
        max: 20,
        min: 5,
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Falta una descripcion"
        },
      },
    }

  })

  return Bootcamp
}