const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');

// 🔌 CONEXIÓN CORRECTA
const pool = mysql.createPool({
  host: 'mysql-lisbeth.alwaysdata.net',
  user: 'lisbeth',
  password: 'lisbeth2026',
  database: 'lisbeth_base2026',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

// 📁 Configuración para guardar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, nombreUnico);
  }
});

// ✅ Solo permitir archivos de imagen
const filtroImagen = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Solo se permiten imágenes'), false);
};

const subir = multer({ storage, fileFilter: filtroImagen });

// 📋 Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const [productos] = await pool.query('SELECT * FROM productos ORDER BY id DESC');
    res.json(productos);
  } catch (err) {
    console.error('🔴 Error en consulta:', err.message);
    res.status(500).json({ 
      error: 'Error al cargar productos',
      detalle: err.message
    });
  }
});

// 💾 Guardar producto con imagen
router.post('/', subir.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const rutaImagen = req.file ? `/uploads/${req.file.filename}` : null;

    await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, precio, rutaImagen]
    );

    res.json({ mensaje: '✅ Producto guardado correctamente' });
  } catch (err) {
    console.error('🔴 Error al guardar:', err.message);
    res.status(500).json({ 
      error: '❌ Error al guardar producto',
      detalle: err.message
    });
  }
});

module.exports = router;