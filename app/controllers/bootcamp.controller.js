const { users, bootcamps } = require('../models');
const db = require('../models');
const Bootcamp = db.bootcamps;
const User = db.users;

// Crear un nuevo bootcamp
exports.createBootcamp = async (bootcamp) => {
  
  // Verificar si nombre del bootcamp existe
  const existingBootcamp = await Bootcamp.findOne({ where: { title: bootcamp.title } });
  if (existingBootcamp) {
    console.log(`El bootcamp ${bootcamp.title} ya existe.`);
    return existingBootcamp;
  }

  return Bootcamp.create({
    title: bootcamp.title,
    cue: bootcamp.cue,
    description: bootcamp.description,
  })
  .then(bootcamp => {
    console.log(`Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`);
    return bootcamp;
  })
  .catch(err => {
    console.log(`Error al crear el bootcamp: ${err}`);
  });
};

// Agregar un Usuario al Bootcamp
exports.addUser = (bootcampId, userId) => {
  return Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        console.log("No se encontro el Bootcamp!");
        return null;
      }
      return User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("Usuario no encontrado!");
          return null;
        }
        bootcamp.addUser(user);
        console.log(` Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`);
        return bootcamp;
      });
    })
    .catch((err) => {
      console.log("Error mientras se estaba agregando Usuario al Bootcamp", err);
    });
};


// obtener los bootcamp por id 
exports.findById = (Id) => {
  return Bootcamp.findByPk(Id, {
      include: [{
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      }, ],
    })
    .then(bootcamp => {
      return bootcamp
    })
    .catch(err => {
      console.log(`Error mientras se encontraba el bootcamp: ${err}`)
    })
}

// obtener todos los Usuarios incluyendo los Bootcamp

exports.findAll = (req, res) => {
  Bootcamp.findAll({
    include: [{
      model: User,
      as: "users",
      attributes: ["id", "firstName", "lastName"],
      through: {
        attributes: [],
      }
    }, ],
  })
  .then(bootcamps => {
    res.send(bootcamps);
  })
  .catch((err) => {
    console.log("No encuentran bootcamps :(", err);
    res.status(500).send(err);
  });
}