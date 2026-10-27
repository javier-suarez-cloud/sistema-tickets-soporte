const mysql = require('mysql2');
const path = require('path');

// La contraseña de MySQL se lee del archivo .env (no se sube a GitHub)
try {
  process.loadEnvFile(path.join(__dirname, '.env'));
} catch (error) {
  // si no existe .env se usa la contraseña vacía de la guía
}

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: 'soporte_db',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = db;
