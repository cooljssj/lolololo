document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-btn');
    const contactUsBtn = document.querySelector('.contactUS-btn');
    const settingsBtn = document.querySelector('.settings-btn');
    const modal = document.getElementById('login-modal');
    const modal2 = document.getElementById('login-modal2');
    const modal3 = document.getElementById('login-modal3');
    const closeBtn = document.querySelector('.close-btn');
    const closeBtn2 = document.querySelector('.close-btn2');
    const closeBtn3 = document.querySelector('.close-btn3');
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const header = document.querySelector('header');
    const dropdown = document.querySelector('.dropdown');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.querySelector('#login-form');
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        header.classList.add('dark-mode-header');
        toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('dark-mode');
            header.classList.add('dark-mode-header');
            localStorage.setItem('dark-mode', 'enabled');
            document.getElementById("logo").src = "img/invertedLogo.png";
        } else {
            body.classList.remove('dark-mode');
            header.classList.remove('dark-mode-header');
            localStorage.setItem('dark-mode', 'disabled');
            document.getElementById("logo").src = "img/logo.png";
        }
    });


    loginBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    contactUsBtn.addEventListener('click', () => {
        modal2.style.display = 'block';
    });

    settingsBtn.addEventListener('click', () => {
        modal3.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    closeBtn2.addEventListener('click', () => {
        modal2.style.display = 'none';
    });

    closeBtn3.addEventListener('click', () => {
        modal3.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal || event.target === modal2 || event.target === modal3) {
            modal.style.display = 'none';
            modal2.style.display = 'none';
            modal3.style.display = 'none';
        }
    });

    dropbtn.addEventListener('click', () => {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const usname = document.getElementById('reg-username').value;
        const firstname = document.getElementById('reg-firstname').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usname, firstname, email, password })
            });

            const data = await response.json();
            if (data.success) {
                showNotification('Регистрация успешна!', 'success');
                modal.style.display = 'none';
            } else {
                showNotification(data.message || 'Ошибка регистрации.', 'error');
            }
        } catch (error) {
            showNotification('Ошибка сервера. Попробуйте позже.', 'error');
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (data.success) {
                showNotification('Вход успешен!', 'success');
                modal.style.display = 'none';
                localStorage.setItem('authToken', data.token);
            } else {
                showNotification(data.message || 'Ошибка входа.', 'error');
            }
        } catch (error) {
            showNotification('Ошибка сервера. Попробуйте позже.', 'error');
        }
    });

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
});