import { UserModel } from "./user.model.js";
import bcrypt from "bcryptjs";

// Controlador: Orquesta la solicitud HTTP (req) y respuesta (res).
// Usa try...catch para capturar errores y retornar códigos de estado HTTP precisos.

// GET /api/usuarios: Listar todos
export const obtenerUsuarios = async (req, res) => {
  try {
    const results = await UserModel.findALL();
    res.status(200).json({ results }); // 200 OK
  } catch (error) {
    res.status(500).json({ error: `Error al listar: ${error.message || error}` }); // 500 Server Error
  }
};

// GET /api/usuarios/:id: Buscar por ID
export const getUserById = async (req, res) => {
  try {
    // req.params: Extrae el parámetro de ruta ':id' desde la URL
    const { id } = req.params;
    const results = await UserModel.findById(id);

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" }); // 404 Not Found
    }

    res.status(200).json({ results: results[0] });
  } catch (error) {
    res.status(500).json({ error: `Error al buscar: ${error.message || error}` });
  }
};

// POST /api/usuarios: Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    // req.body: Contiene los datos JSON enviados en el cuerpo de la petición
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Nombre, email y password son obligatorios" }); // 400 Bad Request
    }

    const results = await UserModel.create(req.body);
    res.status(201).json({ mensaje: "Usuario creado exitosamente", id: results.insertId }); // 201 Created
  } catch (error) {
    if (error.message.includes("ya está registrado")) {
      return res.status(400).json({ error: error.message }); // 400 por validación de unicidad
    }
    res.status(500).json({ error: `Error al crear: ${error.message || error}` });
  }
};

// POST /api/usuarios/login: Autenticación de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son obligatorios" });
    }

    const results = await UserModel.findByEmail(email);
    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" }); // 401 Unauthorized
    }

    const usuario = results[0];
    // Compara la contraseña en texto plano con el hash almacenado en la BD
    const passwordValida = bcrypt.compareSync(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ error: "Credenciales inválidas" }); // 401 Unauthorized
    }

    // Omitimos la contraseña de la respuesta por seguridad
    const { password: _, ...usuarioSinPassword } = usuario;
    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      usuario: usuarioSinPassword,
    });
  } catch (error) {
    res.status(500).json({ error: `Error al autenticar: ${error.message || error}` });
  }
};

// PUT /api/usuarios/:id: Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params; // ID desde la URL
    const data = req.body;     // Campos a actualizar desde el body

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Debe enviar campos para actualizar" });
    }

    const results = await UserModel.update(id, data);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado para actualizar" });
    }

    res.status(200).json({ mensaje: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar: ${error.message || error}` });
  }
};

// DELETE /api/usuarios/:id: Eliminar usuario
export const borrarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await UserModel.delete(id);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado para eliminar" });
    }

    res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar: ${error.message || error}` });
  }
};
