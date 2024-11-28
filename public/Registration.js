const loginBtn = document.querySelector('.login-btn');

document.getElementById('createProfileBtn').addEventListener('click', function() {
    document.getElementById('registrationForm').classList.remove('hidden');
});

document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('registrationForm').classList.add('hidden');
});

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Регистрация:', { username, email, password });

    document.getElementById('form').reset();
    document.getElementById('registrationForm').classList.add('hidden');
});