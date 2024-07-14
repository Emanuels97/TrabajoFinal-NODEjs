export function validarCamposRegistro(nombre, apellido, usuario, email, contraseña , verificacion) {
  if (!nombre || !apellido || !usuario || !email || !contraseña || !verificacion) {
      showError('Todos los campos son obligatorios.');
      return false;
  }
  return true;
}

export function validarContraseñas(contraseña, verificacion) {
  if (contraseña !== verificacion) {
      showError('Las contraseñas no coinciden.');
      return false;
  }
  return true;
}

export function validarCamposLogin(usuario, contraseña) {
  if (!usuario || !contraseña) {
      showError('Por favor, completa todos los campos.');
      return false;
  }
  return true;
}

function showError(message) {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
      errorElement.textContent = message;
  } else {
      alert(message);
  }
}