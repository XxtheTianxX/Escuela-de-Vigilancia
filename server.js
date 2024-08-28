const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Asegúrate de que dotenv esté importado

// Configuración del servidor
const app = express();
const port = 3000;

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conexión a MongoDB Atlas exitosa');
}).catch(err => {
    console.error('Error al conectar a MongoDB Atlas:', err);
});

// Definir un esquema para los registros
const registroSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    fecha_registro: {
        type: Date,
        default: Date.now
    }
});

// Crear un modelo basado en el esquema
const Registro = mongoose.model('Registro', registroSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar el registro
app.post('/registrar', (req, res) => {
    const nuevoRegistro = new Registro({
        nombre: req.body.nombre,
        correo: req.body.correo
    });

    nuevoRegistro.save()
        .then(() => {
            res.json({ message: 'Registro exitoso' });
        })
        .catch(err => {
            console.error('Error al guardar el registro:', err);
            res.status(500).json({ message: 'Error al registrar los datos' });
        });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
