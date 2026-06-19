const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta de imágenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/productos', require('./routes/productos'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API corriendo en puerto ${PORT}`));