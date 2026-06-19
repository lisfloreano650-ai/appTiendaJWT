const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');

// 🔌 Conexión a tu base de datos AlwaysData
const pool = mysql.createPool({
  host: 'mysql-lisbeth.alwaysdata.net',
  user: 'lisbeth',
  password: 'AQUÍ_PON_TU_CONTRASEÑA', // ⚠️ Cambia esto por tu contraseña real
  database: 'lisbeth_base2026'
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
    res.status(500).json({ error: 'Error al cargar productos' });
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
    res.status(500).json({ error: '❌ Error al guardar producto' });
  }
});

module.exports = router;