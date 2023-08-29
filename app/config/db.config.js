module.exports = {
  HOST: 'localhost',
  USER: 'Jpr2.',
  PASSWORD: 'jpr2.jwt',
  DB: 'db_jwtbootcamps',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}