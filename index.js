const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const pool = require('./db');
const path = require('path');
const fs = require('fs'); 
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html')); 
});

app.use(bodyParser.json());
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const initializeDatabase = async () => {
    const sqlPath = path.join(__dirname, 'models', 'database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    const correctedSql = `
        CREATE SCHEMA IF NOT EXISTS public;
        ${sql}
    `;

    try {
        await pool.query(correctedSql);
        console.log('База данных и таблицы успешно инициализированы');
    } catch (error) {
        if (error.code === '42P07') {
            console.log('Таблицы уже существуют');
        } else {
            console.error('Ошибка инициализации базы данных:', error);
        }
    }
};

initializeDatabase();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    const fileName = req.body['file-name'];
    const fileData = req.file.buffer;
    const mimeType = req.file.mimetype; 
    const extension = path.extname(req.file.originalname); 

    try {
        await pool.query(
            'INSERT INTO public.books(bookname, data, mimetype, extension) VALUES($1, $2, $3, $4)',
            [fileName, fileData, mimeType, extension]
        );
        res.status(200).send('Файл успешно загружен');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка загрузки файла');
    }
});

app.post('/api/register', async (req, res) => { 
    const { usname, firstname, email, password } = req.body; 
    if (!usname || !firstname || !email || !password) { 
        return res.status(400).json({ success: false, message: 'Заполните все обязательные поля' }); 
    } 

    try { 
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const query = ` 
             INSERT INTO public.users (usname, firstname, email, password_hash)
            VALUES ($1, $2, $3, $4) RETURNING userid
        `;

         const result = await pool.query(query, [usname, firstname, email, passwordHash]); 
        const userId = result.rows[0].userid;

res.cookie('userId', userId, { httpOnly: true, maxAge: 3600000 }); // Кука на 1 час

        res.status(201).json({ success: true, message: 'Пользователь успешно зарегистрирован' }); 
    } catch (error) { 
        console.error(error); 
        if (error.code === '23505') { 
            return res.status(400).json({ success: false, message: 'Email уже зарегистрирован' }); 
        } 
        res.status(500).json({ success: false, message: 'Ошибка регистрации' }); 
    } 
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Введите email и пароль' });
    }

    try {
        const result = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Пользователь не найден' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Неверный пароль' });
        }

        res.status(200).json({
            success: true,
            message: 'Вход успешен',
            user: { id: user.userid, usname: user.usname }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Ошибка входа' });
    }
});
app.post('/api/upload-video', async (req, res) => {
    const { videoname, url, description } = req.body;

    // Проверка обязательных полей
    if (!videoname || !url) {
        return res.status(400).json({ success: false, message: 'Название видео и URL являются обязательными' });
    }

    try {
        // Вставка данных о видео в базу данных
        const query = `
            INSERT INTO public.videos (videoname, url, description)
            VALUES ($1, $2, $3)
        `;
        await pool.query(query, [videoname, url, description]);
        res.status(201).json({ success: true, message: 'Видео успешно загружено' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Ошибка загрузки видео' });
    }
});
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.users'); 
        res.status(200).json(result.rows); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Ошибка получения пользователей' });
    }
});

app.get('/api/user/:id', async (req, res) => {
    const { id } = req.params; // Get the user ID from the URL

    try {
        const result = await pool.query('SELECT * FROM public.users WHERE userid = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Пользователь не найден' });
        }

        // Return user details
        res.status(200).json({
            success: true,
            user: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Ошибка получения пользователя' });
    }
});

app.get('/api/files', async (req, res) => {
    try {
        const result = await pool.query('SELECT bookname FROM public.books');
        res.status(200).json(result.rows); 
    } catch (error) {
        console.error('Ошибка при получении списка файлов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

app.get('/files/:fileName', async (req, res) => {
    const { fileName } = req.params;

    try {
        const result = await pool.query(
            'SELECT data, mimetype, extension FROM public.books WHERE bookname = $1',
            [fileName]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Файл не найден');
        }

        const { data, mimetype, extension } = result.rows[0];
        const encodedFileName = encodeURIComponent(fileName);
        res.setHeader('Content-Type', mimetype);
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${encodedFileName}${extension}"`
        );
        res.send(data);
    } catch (error) {
        console.error('Ошибка при получении файла:', error);
        res.status(500).send('Ошибка сервера');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});