#  API REST de Gestión de Usuarios



##  Guía de Instalación

```bash
# 1. Inicializar el proyecto
npm init -y

# 2. Instalar dependencias
npm i express cors mysql2 bcryptjs nodemon
```

Configura en tu `package.json` el tipo de módulo y los scripts:
```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  }
}
```

Para iniciar el servidor:
```bash
# Modo desarrollo con recarga automática:
npm run dev

```
---

##  Estructura del Proyecto

```text
intento_createvit/
│
├── index.js                     # Servidor Express y middlewares
├── package.json                 # Dependencias y scripts
├── package-lock.json
├── README.md                    # Documentación
├── db_usuario.sql               # Script SQL de la base de datos
├── api.http                     # Archivo de pruebas rápidas (REST Client)
│
└── src/
    ├── config/
    │   └── dbconexion.js        # Pool de conexión a MySQL
    │
    └── module/
        └── user/
            ├── user.routes.js      # Definición de rutas y verbos HTTP
            ├── user.controller.js  # Lógica de peticiones y respuestas HTTP
            └── user.model.js       # Consultas SQL, encriptación y validación
```

---

##  Guía de Pruebas y Testeo de Endpoints

URL Base: `http://localhost:4100/api`

### Resumen de Endpoints CRUD:

| Método | Endpoint | Descripción | Body (JSON) | Status Éxito | Status Error |
| :---: | :--- | :--- | :---: | :---: | :---: |
| `GET` | `/api/usuarios` | Listar todos | No | `200 OK` | `500 Server Error` |
| `GET` | `/api/usuarios/:id` | Buscar por ID | No | `200 OK` | `404 Not Found`, `500 Server Error` |
| `POST` | `/api/usuarios` | Crear usuario | Sí | `201 Created` | `400 Bad Request`, `500 Server Error` |
| `PUT` | `/api/usuarios/:id` | Actualizar por ID | Sí | `200 OK` | `400 Bad Request`, `404 Not Found`, `500 Server Error` |
| `DELETE` | `/api/usuarios/:id` | Eliminar por ID | No | `200 OK` | `404 Not Found`, `500 Server Error` |

---

### Ejemplos de Peticiones:

#### 1. Listar Usuarios
- **`GET /api/usuarios`**
- **Respuesta (200 OK):**
  ```json
  {
    "results": [
      {
        "id_usuario": 1,
        "nombre": "Carlos",
        "apellidos": "Pérez",
        "email": "carlos@example.com",
        "telefono": "+573001234567",
        "ciudad": "Bogotá",
        "estado": "activo"
      }
    ]
  }
  ```

#### 2. Buscar por ID
- **`GET /api/usuarios/1`**
- **Éxito (200 OK):** Retorna el objeto del usuario.
- **Error (404 Not Found):** `{"error": "Usuario no encontrado"}`

#### 3. Crear Usuario
- **`POST /api/usuarios`**
- **Body (JSON):**
  ```json
  {
    "nombre": "Laura",
    "apellidos": "Ramírez",
    "email": "laura@example.com",
    "telefono": "+573119876543",
    "ciudad": "Medellín",
    "estado": "activo",
    "password": "Password123*"
  }
  ```
- **Éxito (201 Created):** `{"mensaje": "Usuario creado exitosamente", "id": 2}`
- **Error (400 Bad Request):** Si faltan campos o el email ya está registrado.

#### 4. Actualizar Usuario
- **`PUT /api/usuarios/1`**
- **Body (JSON):**
  ```json
  {
    "telefono": "+573200001122",
    "ciudad": "Cali"
  }
  ```
- **Éxito (200 OK):** `{"mensaje": "Usuario actualizado exitosamente"}`
- **Error (404 Not Found):** Si el usuario no existe.

#### 5. Eliminar Usuario
- **`DELETE /api/usuarios/1`**
- **Éxito (200 OK):** `{"mensaje": "Usuario eliminado exitosamente"}`
- **Error (404 Not Found):** Si el usuario no existe.
