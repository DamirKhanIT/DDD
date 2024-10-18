// Функция для отображения выбранной секции
function showSection(section) {
    // Скрыть все секции
    const sections = document.querySelectorAll('.content');
    sections.forEach(s => s.style.display = 'none');
    
    // Показать выбранную секцию
    document.getElementById(`${section}-section`).style.display = 'block';
}

// Переключение между регистрацией и входом
function toggleRegister() {
    const registerNameInput = document.getElementById('register-name');
    const loginSection = document.getElementById('login-section');

    if (registerNameInput.style.display === 'none') {
        registerNameInput.style.display = 'block';
        loginSection.querySelector('h2').innerText = 'Register';
        loginSection.querySelector('button').innerText = 'Register';
    } else {
        registerNameInput.style.display = 'none';
        loginSection.querySelector('h2').innerText = 'Login';
        loginSection.querySelector('button').innerText = 'Log In';
    }
}

// Логика входа
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        document.getElementById('profile-info').innerText = `Logged in as ${email}`;
        showSection('profile');
    } else {
        document.getElementById('login-message').innerText = 'Please fill in all fields.';
    }
}

// Асинхронная регистрация с сервером
async function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const messageDiv = document.getElementById('register-message');

    if (!name || !email || !password) {
        messageDiv.textContent = "Пожалуйста, заполните все поля.";
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        messageDiv.textContent = data.message;

        if (response.ok) {
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            showSection('login');
        }
    } catch (error) {
        messageDiv.textContent = "Ошибка регистрации.";
    }
}

// Функция для получения ответа на вопрос (заглушка)
async function getAnswer() {
    const question = document.getElementById('question-input').value;

    if (question) {
        const answer = "This is a dummy answer for your question."; // Заглушка
        document.getElementById('answer').innerText = answer;
    } else {
        document.getElementById('answer').innerText = 'Please enter a question.';
    }
}
