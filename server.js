const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// 🔌 CONEXIÓN A LA BASE REMOTA EN ALWAYSDATA
const conexion = mysql.createConnection({
  host: 'mysql-lisbeth.alwaysdata.net',
  user: 'lisbeth',
  password: '1232026lis', // Tu contraseña
  database: 'lisbeth_base2026',
  port: 3306
});

conexion.connect(err => {
  if (err) {
    console.log('❌ Error de conexión:', err.message);
    return;
  }
  console.log('✅ Conectado correctamente a lisbeth_base2026 en Alwaysdata');
});

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 📋 RUTAS DE CLIENTES
app.get('/api/clientes', (req, res) => {
  const sql = `SELECT cli_id, cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_ciudad, cli_pais FROM clientes`;
  conexion.query(sql, (err, resultados) => {
    if (err) return res.json({ ok: false, mensaje: err.message });
    res.json({ ok: true, clientes: resultados });
  });
});

app.get('/api/clientes/:id', (req, res) => {
  const sql = `SELECT cli_id, cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_ciudad, cli_pais FROM clientes WHERE cli_id = ?`;
  conexion.query(sql, [req.params.id], (err, resultado) => {
    if (err) return res.json({ ok: false, mensaje: err.message });
    if (resultado.length === 0) return res.json({ ok: false, mensaje: 'Cliente no encontrado' });
    res.json({ ok: true, cliente: resultado[0] });
  });
});

app.post('/api/clientes', (req, res) => {
  const { identificacion, nombre, telefono, correo, direccion, ciudad, pais } = req.body;
  const sql = `INSERT INTO clientes (cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_ciudad, cli_pais) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  conexion.query(sql, [identificacion, nombre, telefono, correo, direccion, ciudad, pais], (err, resultado) => {
    if (err) return res.json({ ok: false, mensaje: err.message });
    res.json({ ok: true, mensaje: 'Cliente guardado', id: resultado.insertId });
  });
});

app.put('/api/clientes/:id', (req, res) => {
  const { identificacion, nombre, telefono, correo, direccion, ciudad, pais } = req.body;
  const sql = `UPDATE clientes SET cli_identificacion=?, cli_nombre=?, cli_telefono=?, cli_correo=?, cli_direccion=?, cli_ciudad=?, cli_pais=? WHERE cli_id = ?`;
  conexion.query(sql, [identificacion, nombre, telefono, correo, direccion, ciudad, pais, req.params.id], (err) => {
    if (err) return res.json({ ok: false, mensaje: err.message });
    res.json({ ok: true, mensaje: 'Cliente actualizado' });
  });
});

app.delete('/api/clientes/:id', (req, res) => {
  const sql = `DELETE FROM clientes WHERE cli_id = ?`;
  conexion.query(sql, [req.params.id], (err) => {
    if (err) return res.json({ ok: false, mensaje: err.message });
    res.json({ ok: true, mensaje: 'Cliente eliminado' });
  });
});

// 🔐 RUTA DE INICIO DE SESIÓN
app.post('/api/login', (req, res) => {
  const { usuario, clave } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE usr_usuario = ? AND usr_clave = ? LIMIT 1';
  conexion.query(sql, [usuario, clave], (err, resultado) => {
    if (err) return res.json({ ok: false, mensaje: 'Error: ' + err.message });
    if (resultado.length > 0) {
      return res.json({ ok: true, mensaje: '✅ Acceso permitido' });
    } else {
      return res.json({ ok: false, mensaje: '❌ Usuario o contraseña incorrectos' });
    }
  });
});

app.listen(PUERTO, () => console.log(`🚀 API lista en puerto ${PUERTO}`));