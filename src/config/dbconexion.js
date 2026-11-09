// mysql2/promise: driver con soporte nativo de promesas para usar async/await
import mysql from "mysql2/promise";

// Pool de conexiones: administra un grupo de conexiones reutilizables en memoria,
// permitiendo atender múltiples consultas concurrentes de forma eficiente.
const pool = mysql.createPool({
  host: "localhost",        // Host del servidor MySQL
  port: 3306,               // Puerto del servicio MySQL
  user: "root",             // Usuario de la base de datos
  password: "",             // Contraseña de la base de datos
  database: "db_usuario",   // Nombre de la base de datos
  waitForConnections: true, // Pone consultas en espera si todas las conexiones están ocupadas
  connectionLimit: 10,      // Número máximo de conexiones simultáneas en el pool
  queueLimit: 0,            // Cola de espera ilimitada para consultas (0)
  timezone: "Z",            // Zona horaria UTC para evitar desfases
  dateStrings: true,        // Retorna fechas como texto para no alterar zonas horarias
  decimalNumbers: true,     // Parsea números decimales como tipo Number de JavaScript
});

export default pool;
