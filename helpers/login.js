import { validarCamposLogin, showError } from './validaciones.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = event.target;

      const usuario = form.usuario.value;
      const contraseña = form.pwLogin.value;

      if (!validarCamposLogin(usuario, contraseña)) {
        return;
      }

      try {
        const response = await axios.post('http://localhost:3030/usuario/login', { usuario, contraseña });
        console.log('Usuario encontrado:', response.data);
        alert('Usuario Existente!');
        window.location.href = '../html/index.html';
      } catch (error) {
        console.error('Error al verificar usuario:', error.response?.data?.message || error.message);
        showError(error.response?.data?.message || 'Error al verificar usuario.');
      }
    });
  } else {
    console.error('El formulario de login no existe en el DOM');
  }
});
