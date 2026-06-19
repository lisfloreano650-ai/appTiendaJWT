// 🔌 CONEXIÓN DEFINITIVA SIN BLOQUEOS
const pool = mysql.createPool({
  host: 'mysql-lisbeth.alwaysdata.net',
  user: 'lisbeth',
  password: 'lisbeth2026',
  database: 'lisbeth_base2026',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false }
});