import db from "../../config/dbconexion.js";
import bcrypt from "bcryptjs";

// Modelo (SRP): Responsable exclusivo del acceso a datos y consultas SQL.
export const UserModel = {
  // Listar todos los usuarios ordenados por apellidos
  findALL: async () => {
    const sql = "SELECT * FROM usuario ORDER BY apellidos";
    // [rows]: Desestructura el arreglo devuelto para extraer solo las filas y omitir metadatos
    const [rows] = await db.query(sql);
    return rows;
  },

  // Buscar usuario por ID
  findById: async (id) => {
    // '?' es un marcador de posición para consultas preparadas que evita inyecciones SQL
    const sql = "SELECT * FROM usuario WHERE id_usuario = ?";
    const [rows] = await db.query(sql, [id]);
    return rows;
  },

  // Buscar usuario por email (usado en login y validaciones)
  findByEmail: async (email) => {
    const sql = "SELECT * FROM usuario WHERE email = ?";
    const [rows] = await db.query(sql, [email]);
    return rows;
  },

  // Validar unicidad de email, encriptar contraseña e insertar
  create: async (data) => {
    // Valida que el email no esté repetido antes de insertar
    const [emailExiste] = await db.query(
      "SELECT id_usuario FROM usuario WHERE email = ?",
      [data.email]
    );

    if (emailExiste.length > 0) {
      throw new Error("El email ya está registrado");
    }

    const userNuevo = {
      nombre: data.nombre,
      apellidos: data.apellidos,
      email: data.email,
      telefono: data.telefono,
      ciudad: data.ciudad,
      estado: data.estado,
      // Encripta la contraseña con 11 rondas de salting para almacenamiento seguro
      password: bcrypt.hashSync(data.password, 11),
    };

    // Helper 'SET ?': Convierte automáticamente las propiedades del objeto a columnas SQL
    const sql = "INSERT INTO usuario SET ?";
    const [rows] = await db.query(sql, [userNuevo]);
    return rows;
  },

  // Actualizar usuario por ID
  update: async (id, data) => {
    const datosActualizados = { ...data };
    if (datosActualizados.password) {
      datosActualizados.password = bcrypt.hashSync(datosActualizados.password, 11);
    }

    // Usa 'SET ?' para los datos modificados y '?' para el id de condición WHERE
    const sql = "UPDATE usuario SET ? WHERE id_usuario = ?";
    const [rows] = await db.query(sql, [datosActualizados, id]);
    return rows;
  },

  // Eliminar usuario por ID
  delete: async (id) => {
    const sql = "DELETE FROM usuario WHERE id_usuario = ?";
    const [rows] = await db.query(sql, [id]);
    return rows;
  },
};
