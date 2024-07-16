const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

// Configuración de la base de datos
const CONFIG = {
  database: "cac2024",
  username: "root",
  password: "fj123",
  host: "localhost",
  dialect: "mysql",
  port: 3306
};

// Inicialización de Sequelize
const DB = new Sequelize(CONFIG.database, CONFIG.username, CONFIG.password, {
  host: CONFIG.host,
  dialect: CONFIG.dialect,
  port: CONFIG.port
});

// Función para crear la base de datos si no existe
const crearBaseDeDatos = async () => {
  const conexionBD = await mysql.createConnection({
    host: CONFIG.host,
    user: CONFIG.username,
    password: CONFIG.password,
  });
  try {
    await conexionBD.query(`CREATE DATABASE IF NOT EXISTS ${CONFIG.database}`);
    console.log('Base de datos creada o ya existente');
  } catch (error) {
    console.error('Error al crear la base de datos:', error.message);
  } finally {
    await conexionBD.end();
  }
};

// Inicialización de la base de datos
DB.inicializar = async () => {
  await crearBaseDeDatos();
  try {
    await DB.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error.message);
  }
};

module.exports = DB;
