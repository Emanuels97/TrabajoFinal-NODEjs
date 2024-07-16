const express = require('express');
const DB = require('./database.js');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/usuario', require('./routes/usuario.routes.js'));

const PORT = process.env.PORT || 3030;

// Función para inicializar la base de datos
const inicializarBaseDeDatos = async () => {
  try {
    await DB.inicializar();
    console.log('Conexión exitosa a la base de datos');
    await DB.sync({ force: false });
    console.log('Base de datos y tablas creadas');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error.message);
    throw error;
  }
};

// Función para iniciar el servidor
const iniciarServidor = async () => {
  try {
    await inicializarBaseDeDatos();
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
  }
};

iniciarServidor();
