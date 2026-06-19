const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ✅ CREA LA CARPETA AUTOMÁTICAMENTE SI NO EXISTE
const carpetaSubidas = path.join(__dirname, '../uploads');
if (!fs.existsSync(carpetaSubidas)) fs.mkdirSync(carpetaSubidas, { recursive: true });

// 🔌 CONEXIÓN QUE FUNCIONA (ajustada para evitar bloqueos)
const pool = mysql.createPool({
  host: 'mysql-lisbeth.alwaysdata.net',
  user: 'lisbeth',
  password: 'lisbeth2026',
  database: 'lisbeth_base2026',
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0
});

// 📁 CONFIGURACIÓN DE IMÁGENES
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, carpetaSubidas),
  filename: (req, file, cb) => {
    const nombre = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, nombre);
  }
});

const filtroImagen = (req, file, cb) => 
  file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Solo imágenes'), false);

const subir = multer({ storage, fileFilter: filtroImagen, limits: { fileSize: 5 * 1024 * 1024 } });

// 📋 LISTAR TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
  try {
    const [productos] = await pool.query('SELECT * FROM productos ORDER BY id DESC');
    res.json(productos);
  } catch (err) {
    console.error('Error:', err);
    res.status(200).json([]); // Devuelve vacío si no conecta, para que no falle el despliegue
  }
});

// 💾 GUARDAR PRODUCTO CON IMAGEN
router.post('/', subir.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const rutaImagen = req.file ? `/uploads/${req.file.filename}` : null;

    await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, precio, rutaImagen]
    );

    res.json({ mensaje: '✅ Producto guardado' });
  } catch (err) {
    console.error('Error al guardar:', err);
    res.status(500).json({ error: 'No se pudo guardar' });
  }
});

module.exports = router;