const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'API Soporte Técnico funcionando'
  });
});

app.get('/api/tickets', (req, res) => {
  const sql = 'SELECT * FROM tickets ORDER BY id DESC';

  db.query(sql, (error, resultados) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: 'Error al consultar los tickets'
      });
    }

    res.status(200).json(resultados);
  });
});

app.get('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  const sql = 'SELECT * FROM tickets WHERE id = ?';

  db.query(sql, [id], (error, resultados) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: 'Error al consultar el ticket'
      });
    }

    if (resultados.length === 0) {
      return res.status(404).json({
        mensaje: 'Ticket no encontrado'
      });
    }

    res.status(200).json(resultados[0]);
  });
});

app.post('/api/tickets', (req, res) => {
  const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;

  if (!asunto || !solicitante || !descripcion || !categoria || !prioridad || !estado) {
    return res.status(400).json({
      mensaje: 'Complete todos los campos obligatorios'
    });
  }

  const sql = `
    INSERT INTO tickets
    (asunto, solicitante, descripcion, categoria, prioridad, estado)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    asunto.trim(),
    solicitante.trim(),
    descripcion.trim(),
    categoria.trim(),
    prioridad.trim(),
    estado.trim()
  ];

  db.query(sql, valores, (error, resultado) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: 'Error al registrar el ticket'
      });
    }

    res.status(201).json({
      id: resultado.insertId,
      asunto: asunto.trim(),
      solicitante: solicitante.trim(),
      descripcion: descripcion.trim(),
      categoria: categoria.trim(),
      prioridad: prioridad.trim(),
      estado: estado.trim()
    });
  });
});

app.put('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id);
  const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  if (!asunto || !solicitante || !descripcion || !categoria || !prioridad || !estado) {
    return res.status(400).json({
      mensaje: 'Complete todos los campos obligatorios'
    });
  }

  const sql = `
    UPDATE tickets
    SET asunto = ?, solicitante = ?, descripcion = ?,
        categoria = ?, prioridad = ?, estado = ?
    WHERE id = ?
  `;

  const valores = [
    asunto.trim(),
    solicitante.trim(),
    descripcion.trim(),
    categoria.trim(),
    prioridad.trim(),
    estado.trim(),
    id
  ];

  db.query(sql, valores, (error, resultado) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: 'Error al actualizar el ticket'
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Ticket no encontrado'
      });
    }

    res.status(200).json({
      mensaje: 'Ticket actualizado correctamente'
    });
  });
});

app.delete('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  const sql = 'DELETE FROM tickets WHERE id = ?';

  db.query(sql, [id], (error, resultado) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        mensaje: 'Error al eliminar el ticket'
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Ticket no encontrado'
      });
    }

    res.status(200).json({
      mensaje: 'Ticket eliminado correctamente'
    });
  });
});

app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});
