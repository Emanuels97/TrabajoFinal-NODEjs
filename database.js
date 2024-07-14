const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

const DB_CONFIG = {
  database: "cac2024",
  username: "root",
  password: "fj123",
  host: "localhost",
  dialect: "mysql",
  port: 3306
};

const DB = new Sequelize(DB_CONFIG.database, DB_CONFIG.username, DB_CONFIG.password, {
  host: DB_CONFIG.host,
  dialect: DB_CONFIG.dialect,
  port: DB_CONFIG.port
});

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: DB_CONFIG.host,
    user: DB_CONFIG.username,
    password: DB_CONFIG.password,
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_CONFIG.database}`);
    console.log('Base de datos creada o ya existente');
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
  } finally {
    await connection.end();
  }
};

DB.initialize = async () => {
  await createDatabase();
  try {
    await DB.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

module.exports = DB;