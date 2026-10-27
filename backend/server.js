const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PUERTO = 3000;

app.use(cors());
app.use(express.json());

// Pool de conexiones a MySQL (los datos de conexión vienen del archivo .env)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'soporte_tickets',
});

const PRIORIDADES = ['Baja', 'Media', 'Alta'];
const ESTADOS = ['Abierto', 'En proceso', 'Resuelto'];

// Revisa que el ticket traiga los datos obligatorios y valores permitidos
function validarTicket(t) {
  const { asunto, solicitante, descripcion, categoria, prioridad, estado } = t;
  if (!asunto || !solicitante || !descripcion || !categoria) {
    return 'Faltan datos obligatorios: asunto, solicitante, descripcion y categoria.';
  }
  if (!PRIORIDADES.includes(prioridad)) return 'Prioridad no válida.';
  if (!ESTADOS.includes(estado)) return 'Estado no válido.';
  return null;
}

// GET /api/tickets -> lista todos los tickets
app.get('/api/tickets', async (req, res) => {
  const [filas] = await pool.query('SELECT * FROM tickets ORDER BY fechaRegistro DESC');
  res.json(filas);
});

// GET /api/tickets/:id -> un ticket
app.get('/api/tickets/:id', async (req, res) => {
  const [filas] = await pool.query('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
  if (filas.length === 0) return res.status(404).json({ mensaje: 'Ticket no encontrado.' });
  res.json(filas[0]);
});

// POST /api/tickets -> crea un ticket
app.post('/api/tickets', async (req, res) => {
  const error = validarTicket(req.body);
  if (error) return res.status(400).json({ mensaje: error });

  const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;
  const [resultado] = await pool.query(
    'INSERT INTO tickets (asunto, solicitante, descripcion, categoria, prioridad, estado) VALUES (?, ?, ?, ?, ?, ?)',
    [asunto, solicitante, descripcion, categoria, prioridad, estado]
  );
  const [filas] = await pool.query('SELECT * FROM tickets WHERE id = ?', [resultado.insertId]);
  res.status(201).json(filas[0]);
});

// PUT /api/tickets/:id -> actualiza un ticket
app.put('/api/tickets/:id', async (req, res) => {
  const error = validarTicket(req.body);
  if (error) return res.status(400).json({ mensaje: error });

  const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;
  const [resultado] = await pool.query(
    'UPDATE tickets SET asunto = ?, solicitante = ?, descripcion = ?, categoria = ?, prioridad = ?, estado = ? WHERE id = ?',
    [asunto, solicitante, descripcion, categoria, prioridad, estado, req.params.id]
  );
  if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: 'Ticket no encontrado.' });

  const [filas] = await pool.query('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
  res.json(filas[0]);
});

// DELETE /api/tickets/:id -> elimina un ticket
app.delete('/api/tickets/:id', async (req, res) => {
  const [resultado] = await pool.query('DELETE FROM tickets WHERE id = ?', [req.params.id]);
  if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: 'Ticket no encontrado.' });
  res.status(204).send();
});

// Manejo general de errores (por ejemplo, si MySQL no responde)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ mensaje: 'Error interno del servidor.' });
});

app.listen(PUERTO, () => {
  console.log(`API de tickets escuchando en http://localhost:${PUERTO}`);
});
