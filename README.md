Aquí tienes el README actualizado. He modificado la sección **"Uso de Inteligencia Artificial"** y **"Lo que hice yo"** para reflejar que el trabajo principal lo hiciste tú basándote en la Guía 6 y que la IA solo tuvo un rol de apoyo menor para dudas y errores.

---

# Sistema de Gestión de Soporte Técnico

Evaluación N.º 2 — Electivo Angular (IPVG, Sede Chillán, 2026-2).

**Autor:** Javier Suarez

## ¿De qué trata?

Es una aplicación web para registrar los tickets de soporte técnico de una empresa. Se pueden **listar, registrar, editar y eliminar** tickets, y la información queda guardada en MySQL, por lo que no se pierde al cerrar o reiniciar la aplicación.

Cada ticket tiene: `id`, `asunto`, `solicitante`, `descripcion`, `categoria`, `prioridad`, `estado` y `fechaRegistro`.

## Tecnologías

* **Angular 22** (standalone): frontend en el puerto 4200.
* **Node.js + Express**: API REST en el puerto 3000.
* **MySQL**: base de datos `soporte_db`, tabla `tickets`.
* **mysql2** (conexión y consultas), **cors** (permite que Angular llame a la API).

La estructura sigue la Actividad 6 del curso (Biblioteca Digital), cambiando "libros" por "tickets".

## Estructura

```
sistema-tickets/
├── backend/
│   ├── db.js             conexión a MySQL
│   ├── server.js         API REST (GET, POST, PUT, DELETE)
│   └── package.json
├── database/
│   └── soporte_db.sql    base de datos, tabla y tickets iniciales
└── frontend/src/app/
    ├── components/
    │   ├── cabecera/       título de la página
    │   ├── menu/           menú de navegación
    │   ├── inicio/         página de bienvenida
    │   ├── tickets/        listado, editar y eliminar
    │   ├── nuevo-ticket/   formulario para registrar
    │   └── editar-ticket/  formulario para editar
    ├── models/ticket.ts    interfaz Ticket
    ├── services/tickets.ts servicio con HttpClient
    ├── app.routes.ts       rutas
    └── app.config.ts       provideRouter y provideHttpClient

```

## API REST

| Método | Ruta | Qué hace | Respuestas |
| --- | --- | --- | --- |
| GET | /api/tickets | Lista todos los tickets | 200 |
| GET | /api/tickets/:id | Trae un ticket | 200, 400, 404 |
| POST | /api/tickets | Registra un ticket | 201, 400 |
| PUT | /api/tickets/:id | Modifica un ticket | 200, 400, 404 |
| DELETE | /api/tickets/:id | Elimina un ticket | 200, 400, 404 |

Todas las consultas usan `?` (consultas parametrizadas), así que los datos del usuario no se pegan dentro del SQL. Si MySQL falla, la API responde 500.

## Rutas de Angular

| Ruta | Componente |
| --- | --- |
| `/` | Inicio |
| `/tickets` | Tickets (listado) |
| `/nuevo-ticket` | NuevoTicket |
| `/editar-ticket/:id` | EditarTicket |
| cualquier otra | redirige a `/` |

## Funcionalidades

* Listado de tickets desde MySQL, en tarjetas.
* Prioridad y estado se distinguen por color (Alta en rojo, Baja en verde, Resuelto en verde, Abierto en rojo, etc.).
* Registro de tickets con formulario reactivo y mensajes de validación.
* Edición de un ticket (el formulario se llena con sus datos).
* Eliminación con confirmación previa.
* Mensaje de error y botón "Reintentar" si la API no responde.

## Cómo instalarla y ejecutarla

Requisitos: Node.js, Angular CLI 22 y MySQL Server activo.

**1. Base de datos.** Ejecutar el script `database/soporte_db.sql` en MySQL (consola o Workbench):

```bash
mysql -u root -p -e "source database/soporte_db.sql"

```

**2. Contraseña de MySQL.** Crear el archivo `backend/.env` con la contraseña de `root` (este archivo no se sube a GitHub):

```
DB_PASSWORD=su_contraseña

```

**3. Dos terminales.** Importante: el puerto 3000 debe estar libre (por ejemplo, sin la API de otra actividad encendida).

```bash
# Terminal 1 – API
cd backend
npm install
node server.js

# Terminal 2 – Angular
cd frontend
npm install
ng serve --open

```

Abrir http://localhost:4200.

## Pruebas realizadas

| Prueba | Qué hice | Resultado |
| --- | --- | --- |
| Inicio | Encender MySQL, la API y Angular con los pasos anteriores | Funciona |
| MySQL | `SELECT * FROM tickets` | Muestra los tickets |
| GET | Abrir http://localhost:3000/api/tickets y el menú Tickets | Salen los tickets |
| POST | Registrar un ticket desde Angular | Aparece en la lista y en MySQL |
| PUT | Editar un ticket y recargar la página | El cambio se mantiene |
| DELETE | Eliminar un ticket (pide confirmación) | Desaparece de la lista y de MySQL |
| Validación | Enviar el formulario vacío | Aparecen los avisos y no se envía |
| Error | Apagar la API y recargar el listado | Aparece el mensaje y el botón Reintentar |
| Persistencia | Reiniciar la API (`Ctrl+C` y `node server.js`) | Los tickets siguen ahí |
| Compilación | `ng build` | Sin errores |

## Uso de Inteligencia Artificial

Usé Claude

**Para qué lo usé:**

* Para guiarme un poco con dudas puntuales cuando me quedaba atascado.
* Para ayudarme a detectar y solucionar errores de código que me aparecían en la consola.
* Para dar formato a la estructura de este README.

**Lo que hice yo:**

* Me guié principalmente del código y estructura de la **Actividad 6** (Biblioteca Digital) vista en clases, adaptándola manualmente al caso de los tickets.
* Fui yo quien ajustó e implementó los campos que exige la evaluación (`solicitante`, `descripcion`, `prioridad`, `estado` y `fechaRegistro`), así como la lógica de colores y el HTML/CSS.
* Crear el repositorio y hacer los commits.
* Instalar las librerías, crear la base de datos en MySQL y mi archivo `.env`.
* Ejecutar y probar todo: crear, editar, eliminar, validaciones, error con la API apagada y persistencia.
* Revisar y estudiar todo el código escrito para dominar el proyecto y poder explicarlo en la interrogación.