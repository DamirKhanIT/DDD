const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Регистрация пользователя
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email уже зарегистрирован.' });
        }

        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'Регистрация успешна!' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка регистрации.' });
    }
});

// Добавление запроса
router.post('/request', async (req, res) => {
    const { email, question, subject } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден.' });
        }

        user.requests.push({ question, subject });
        await user.save();
        res.status(200).json({ message: 'Запрос добавлен успешно.' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка добавления запроса.' });
    }
});

module.exports = router;
