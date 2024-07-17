function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === 'admin' && password === '123') {
        window.location.href = 'welcome.html';
        return false; 
    } else {
        errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
        return false; 
    }
}

function resetForm() {
    document.getElementById('loginForm').reset();
    document.getElementById('error-message').textContent = '';
}
