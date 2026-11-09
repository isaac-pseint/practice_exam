import express from "express";
import cors from "cors";
import RutaUser from "./src/module/user/user.routes.js";

const app = express();
const PORT = 4100;

// Middlewares globales
app.use(express.json()); // Parsea el cuerpo JSON de las peticiones entrantes a req.body
app.use(cors()); // Habilita CORS para permitir peticiones desde clientes en otros dominios o puertos

// Montaje de rutas modular con prefijo /api (ej. /api/usuarios)
app.use("/api", RutaUser);

// Inicia el servidor y escucha peticiones HTTP en el puerto 4100
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}/api`);
});
