const BD = require("../database");
const { DataTypes } = require("sequelize");

const Usuario = BD.define("usuarios",{
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING,},
    usuario: { type: DataTypes.STRING,},
    email: { type: DataTypes.STRING,},
    contraseña: { type: DataTypes.STRING,},
  },
);

module.exports = Usuario;
