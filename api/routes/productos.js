const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');

// CONEXIÓN FINAL
const pool = mysql.createPool({
  host: 'mysql-lisbeth.alwaysdata.net',
  user: 'lisbeth',
  password: 'lisbeth2026',
  database: 'lisbeth_base2026',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});
const filtroImagen = (req, file, cb) => file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Solo imágenes'), false);
const subir = multer({ storage, fileFilter: filtroImagen });

router.get('/', async (req, res) => {
  try {
    const [productos] = await pool.query('SELECT * FROM productos ORDER BY id DESC');
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error', detalle: err.message });
  }
});

router.post('/', subir.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const ruta = req.file ? `/uploads/${req.file.filename}` : null;
    await pool.query('INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, ruta]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Error', detalle: err.message });
  }
});

module.exports = router;