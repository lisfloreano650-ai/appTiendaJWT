const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Para que se puedan ver las imágenes guardadas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Activar la ruta de productos
app.use('/api/productos', require('./routes/productos'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API corriendo en el puerto ${PORT}`));