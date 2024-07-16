import { validarCamposRegistro, validarContraseñas, showError } from './validaciones.js';

document.addEventListener('DOMContentLoaded', () => {
  const registroForm = document.querySelector('#registroForm');

  if (registroForm) {
    registroForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = event.target;

      const nombre = form.nombre.value;
      const apellido = form.apellido.value;
      const usuario = form.usuario.value;
      const email = form.email.value;
      const contraseña = form.contraseña.value;
      const verificacion = form.verificacion.value;

      if (!validarCamposRegistro(nombre, apellido, usuario, email, contraseña, verificacion)) {
        return;
      }

      if (!validarContraseñas(contraseña, verificacion)) {
        return;
      }

      try {
        const response = await axios.post('http://localhost:3030/usuario/registro', {
          nombre,
          apellido,
          usuario,
          email,
          contraseña
        });
        console.log('Usuario creado:', response.data);
        alert('Cuenta creada exitosamente!');
        window.location.href = './login.html';
      } catch (error) {
        console.error('Error al crear usuario:', error.response?.data?.message || error.message);
        showError(error.response?.data?.message || 'Error al crear usuario.');
      }
    });
  } else {
    console.error('El formulario de registro no existe en el DOM');
  }
});
