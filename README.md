# Sistema de Gestión de Soporte Técnico

Proyecto de la Evaluación N.º 2 del Electivo Angular (IPVG, Sede Chillán, 2026-2).

**Autor:** Javier Suarez

## ¿De qué trata?

Es una página web para guardar los tickets de soporte técnico de una empresa. Antes se anotaban en mensajes y planillas, y ahora quedan guardados en una base de datos. Se puede **ver, crear, editar y eliminar** tickets, y los datos no se pierden al cerrar el programa.

Cada ticket tiene: asunto, solicitante, descripción, categoría, prioridad, estado y fecha de registro.

## Tecnologías

- **Angular 22**: la parte que se ve (frontend).
- **Node.js 24 y Express 5**: la API que conecta todo (backend).
- **MySQL 8.0**: la base de datos donde se guardan los tickets.
- **mysql2**: para que Node hable con MySQL.
- **cors**: para que Angular pueda pedirle datos a la API.

¿Por qué MySQL? Porque es una base de datos de tablas, y los tickets tienen siempre los mismos campos. Además ya la tenía instalada.

## Cómo instalarlo

Necesitas tener instalado Node.js, Angular CLI y MySQL.

**1. Crear la base de datos.** Desde la carpeta principal:

```bash
mysql -u root -p -e "source database/schema.sql"
```

Esto crea la base `soporte_tickets`, la tabla `tickets` y 3 tickets de ejemplo.

**2. Instalar el backend:**

```bash
cd backend
npm install
```

Después copiar el archivo `.env.example` con el nombre `.env` y poner ahí la contraseña de MySQL:

```bash
copy .env.example .env
```

**3. Instalar el frontend:**

```bash
cd frontend
npm install
```

## Cómo ejecutarlo

Se necesitan **dos terminales** abiertas al mismo tiempo.

**Terminal 1 (API):**

```bash
cd backend
npm start
```

Queda en http://localhost:3000

**Terminal 2 (Angular):**

```bash
cd frontend
ng serve
```

Abrir http://localhost:4200 en el navegador.

## Estructura del proyecto

```
sistema-tickets/
├── backend/
│   ├── server.js          la API con GET, POST, PUT y DELETE
│   ├── .env.example       ejemplo de configuración
│   └── package.json
├── database/
│   └── schema.sql         crea la base de datos y la tabla
└── frontend/src/app/
    ├── components/
    │   ├── cabecera/            título y menú
    │   ├── lista-tickets/       tabla con todos los tickets
    │   └── formulario-ticket/   crear y editar
    ├── models/ticket.ts         cómo es un ticket
    ├── services/tickets.ts      habla con la API (HttpClient)
    └── app.routes.ts            las rutas
```

## Rutas de la API

| Método | Ruta | Qué hace |
|---|---|---|
| GET | /api/tickets | Lista todos los tickets |
| GET | /api/tickets/:id | Trae un ticket |
| POST | /api/tickets | Crea un ticket |
| PUT | /api/tickets/:id | Edita un ticket |
| DELETE | /api/tickets/:id | Elimina un ticket |

Las consultas usan `?` para los datos (consultas parametrizadas), así que no se pega texto del usuario directo en el SQL.

## Qué puede hacer

- Ver el listado de tickets desde la base de datos.
- Crear un ticket con un formulario.
- Editar un ticket (el mismo formulario, que se llena solo).
- Eliminar un ticket, con una ventana para confirmar.
- La prioridad y el estado se ven con colores distintos.
- El formulario avisa si faltan datos y no deja enviar.
- Si la API falla, sale un mensaje de error en rojo.
- Navegación entre vistas con rutas de Angular.

## Pruebas que hice

| Prueba | Qué probé | Resultado |
|---|---|---|
| Inicio | Encender la base, la API y Angular con los pasos de arriba | Funciona |
| GET | Abrir la lista | Salen los tickets guardados |
| POST | Crear un ticket desde el formulario | Aparece en la lista y en la base de datos |
| PUT | Editar un ticket y recargar la página | El cambio se mantiene |
| DELETE | Eliminar un ticket (primero pide confirmar) | Desaparece de la lista y de la base |
| Validación | Enviar el formulario vacío | Salen avisos y no se envía |
| Error | Apagar la API y recargar | Sale "No fue posible cargar los tickets" |
| Persistencia | Reiniciar la API | Los tickets siguen ahí |

## Uso de Inteligencia Artificial

Usé solo Claude. Ninguna otra herramienta de IA.

**Para qué lo usé:**
- Para que me guiarme al atorarme en alguna parte o cuando me daba error y para que me explicara qué hace cada parte.
- Para revisar errores, por ejemplo cuando un archivo no se había guardado y Angular no compilaba.
- Para ayudarme a escribir este README.

**Lo que hice yo:**
- Crear el repositorio, las carpetas y hacer todos los commits y el push.
- Instalar las librerías y crear mi archivo `.env` con mi contraseña de MySQL.
- Copiar y pegar y crear cada archivo en el editor, y guardar los cambios ya que me base de las actividades anteriores.
- Probar todo en el navegador: crear, editar, eliminar, las validaciones, el error con la API apagada y la persistencia.
- Corregir cuando algo no funcionaba, como pegar código en el archivo equivocado.
- Estudiar el código para poder explicarlo en la interrogación.
