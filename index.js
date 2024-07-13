const express = require('express');
const BD = require('./database.js');
const app = express();

app.use(express.json());
app.use('/usuario', require('./routes/usuario.routes.js'));

app.set('port', process.env.PORT || 3030);

const startServer = async () => {
  try {
    await BD.authenticate();
    console.log('Conexión exitosa a la base de datos');
    app.listen(app.get('port'), () => {
      console.log(`Servidor iniciado en el puerto`, app.get('port'));
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

startServer();