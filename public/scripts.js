document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.querySelector('#login-form');
    const loginBtn = document.querySelector('.login-btn');
    const modal = document.getElementById('register-modal');
    const closeBtn = document.querySelector('.close-btn');
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const header = document.querySelector('header');
    const dropdown = document.querySelector('.dropdown');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeBtns = document.querySelectorAll('.close-btn');

    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        header.classList.add('dark-mode-header');
        toggle.checked = true;
	    document.getElementById("logo").src = "img/invertedLogo.png";
        document.getElementById("Telegram").src = "img/invertedTel.png";
        document.getElementById("Github").src = "img/invertedGit.png";
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('dark-mode');
            header.classList.add('dark-mode-header');
            localStorage.setItem('dark-mode', 'enabled');
            document.getElementById("logo").src = "img/invertedLogo.png";
            document.getElementById("Telegram").src = "img/invertedTel.png";
            document.getElementById("Github").src = "img/invertedGit.png";
        } else {
            body.classList.remove('dark-mode');
            header.classList.remove('dark-mode-header');
            localStorage.setItem('dark-mode', 'disabled');
            document.getElementById("logo").src = "img/logo.png";
            document.getElementById("Telegram").src = "img/telegram.png";
            document.getElementById("Github").src = "img/github.png";
        }
    });

    loginBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    const openRegisterModal = document.getElementById('open-register-modal');
    openRegisterModal.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });

    closeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Отправляем запрос на сервер
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (data.success) {
            alert('Вход успешен!');
            loginModal.style.display = 'none';
        } else {
            alert(data.message);
        }
    });


    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();
        if (data.success) {
            alert('Регистрация успешна!');
        } else {
            alert('Ошибка регистрации. Попробуйте снова.');
        }
    });

    // Закрытие модальных окон при клике за пределы
    window.addEventListener('click', (e) => {
        if (e.target === loginModal || e.target === registerModal) {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    });
});

const closeLoginBtn = document.getElementById('close-login-modal');
closeLoginBtn.addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'none';
});

// Закрытие модального окна
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Работа с раскрывающимся меню (Активности)
const dropbtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');

dropbtn.addEventListener('click', () => {
    // Переключаем видимость раскрывающегося меню
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});


function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification ' + type;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Переадресация на library.html
const redirectLink = document.getElementById('redirect-to-library');
if (redirectLink) {
    redirectLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'library.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            accordion.classList.toggle('active');
            const panel = accordion.nextElementSibling;
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
        });
    });
});

