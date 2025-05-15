document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const loginData = {
                email: document.getElementById('login-email').value,
                password: document.getElementById('login-password').value
            };

            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Logged in successfully!');
                    window.location.href = 'index.html';
                } else {
                    alert(data.message || 'Login failed. Check credentials.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
