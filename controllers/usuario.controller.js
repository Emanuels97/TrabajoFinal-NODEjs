const Usuario = require("../models/usuario.model");
const userCtrl = {};

// Obtener todos los usuarios
userCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    console.log("Usuarios obtenidos: ");
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
userCtrl.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      console.log("Usuario obtenido con éxito:");
      res.json(usuario);
    } else {
      console.log("Usuario no encontrado");
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
userCtrl.createUsuario = async (req, res) => {
  try {
    console.log("Cuerpo de la solicitud:", req.body);
    const usuario = await Usuario.create(req.body);
    console.log("Usuario creado con éxito:", usuario);
    res.status(201).json(usuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario por ID
userCtrl.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      await Usuario.update(req.body, {
        where: { id: req.params.id },
      });
      res.json({ message: "Usuario actualizado correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario por ID
userCtrl.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      await usuario.destroy();
      res.json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login usuario + busqueda si existe
userCtrl.login = async (req, res) => {
  const { usuario, contraseña } = req.body;
  console.log("Cuerpo de la solicitud:", usuario,contraseña);
  try {
    const user = await Usuario.findOne({ where: { usuario } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    if (user.contraseña !== contraseña) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Usuario autenticado', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = userCtrl;
