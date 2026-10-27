-- Base de datos del Sistema de Gestión de Soporte Técnico
CREATE DATABASE IF NOT EXISTS soporte_tickets
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE soporte_tickets;

CREATE TABLE IF NOT EXISTS tickets (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  asunto        VARCHAR(150) NOT NULL,
  solicitante   VARCHAR(100) NOT NULL,
  descripcion   TEXT         NOT NULL,
  categoria     VARCHAR(50)  NOT NULL,
  prioridad     ENUM('Baja', 'Media', 'Alta')                  NOT NULL DEFAULT 'Media',
  estado        ENUM('Abierto', 'En proceso', 'Resuelto')      NOT NULL DEFAULT 'Abierto',
  fechaRegistro DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo para probar
INSERT INTO tickets (asunto, solicitante, descripcion, categoria, prioridad, estado) VALUES
  ('No enciende el computador', 'María González', 'El equipo de la oficina 3 no enciende desde esta mañana.', 'Hardware', 'Alta', 'Abierto'),
  ('Instalar Office', 'Pedro Soto', 'Necesito Office instalado en mi notebook nuevo.', 'Software', 'Baja', 'En proceso'),
  ('Sin acceso a internet', 'Ana Rojas', 'No tengo conexión a la red WiFi de la sucursal.', 'Redes', 'Media', 'Resuelto');
