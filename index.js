const express = require('express');
const BD = require('./database.js');
const app = express();

app.use(express.json());
app.use('/usuario', require('./routes/usuario.routes.js'));

const PORT = process.env.PORT || 3030;

const inicializarDatabase = async () => {
  try {
    await BD.initialize();
    console.log('Conexión exitosa a la base de datos');
    await BD.sync({ force: false });
    console.log('Base de datos y tablas creadas');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error; // Relanzar el error para manejarlo en el nivel superior
  }
};

const startServer = async () => {
  try {
    await inicializarDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();