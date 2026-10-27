-- Evaluación 2 · Sistema de Gestión de Soporte Técnico
-- Base de datos, tabla y registros iniciales (mismo orden de la Actividad 6)

CREATE DATABASE soporte_db;
USE soporte_db;
SELECT DATABASE();

CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asunto VARCHAR(150) NOT NULL,
  solicitante VARCHAR(120) NOT NULL,
  descripcion TEXT NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  prioridad VARCHAR(20) NOT NULL,
  estado VARCHAR(20) NOT NULL,
  fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE tickets;

INSERT INTO tickets(asunto, solicitante, descripcion, categoria, prioridad, estado)
VALUES
('No enciende el computador','María González','El equipo de la oficina 3 no enciende desde esta mañana.','Hardware','Alta','Abierto'),
('Instalar Office','Pedro Soto','Necesito Office instalado en mi notebook nuevo.','Software','Baja','En proceso'),
('Sin acceso a internet','Ana Rojas','No tengo conexión a la red WiFi de la sucursal.','Redes','Media','Resuelto');

SELECT * FROM tickets ORDER BY id;
