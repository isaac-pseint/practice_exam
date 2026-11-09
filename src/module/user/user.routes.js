import { Router } from "express";
import {
  obtenerUsuarios,
  getUserById,
  crearUsuario,
  login,
  actualizarUsuario,
  borrarUsuario,
} from "./user.controller.js";

// Router() de Express crea un enrutador modular para agrupar endpoints
const router = Router();

// Mapeo de verbos HTTP a sus funciones controladoras:
router.get("/usuarios", obtenerUsuarios);        // GET: Consulta masiva
router.get("/usuarios/:id", getUserById);        // GET: Consulta por parámetro :id
router.post("/usuarios", crearUsuario);          // POST: Creación con datos en body
router.post("/usuarios/login", login);           // POST: Autenticación / Login
router.put("/usuarios/:id", actualizarUsuario);   // PUT: Actualización según :id y body
router.delete("/usuarios/:id", borrarUsuario);    // DELETE: Eliminación según :id

export default router;
