(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')

        var password = document.getElementById('inputPw');
        var confirmPassword = document.getElementById('inputPwVerificacion');
        var messageContainer = document.getElementById('messageContainer');

        if (password.value != confirmPassword.value) {
          event.preventDefault()
          event.stopPropagation()
          messageContainer.innerHTML = '<span>Las contraseñas ingresadas no coinciden</span>';
        } else {
          messageContainer.innerHTML = '';
        }
      }, false)
    })
})()
