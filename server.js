const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Para permitir solicitudes desde el front-end

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'bxpoizfw4e4re2pheqdz-mysql.services.clever-cloud.com',
    user: 'u7a6fl6mulyubqeu',
    password: 'a1gcE3ZPtWEWJae3kfB6',
    database: 'bxpoizfw4e4re2pheqdz'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Ruta para el login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Consulta 
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length > 0) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
