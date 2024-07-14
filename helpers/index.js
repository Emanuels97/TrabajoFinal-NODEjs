import { validarCamposRegistro, validarContraseñas, validarCamposLogin } from './validaciones.js';

document.querySelector('#registroForm').addEventListener('submit', async (event) => {
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
        console.error('Error al crear usuario:', error.response.data.message);
        showError(error.response.data.message);
    }
});

document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;

    const usuario = form.usuarioLogin.value;
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
        console.error('Error al verificar usuario:', error.response.data.message);
        showError(error.response.data.message);
    }
});

function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
    } else {
        alert(message);
    }
}