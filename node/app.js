import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import usuarioRoutes from "./routes/routes.js";  // Rutas de usuario

const app = express();

// Middlewares
app.use(cors());  // Habilitar CORS
app.use(express.json());  // Procesar datos JSON (sustituye a bodyParser.json())
app.use(express.urlencoded({ extended: true }));  // Procesar datos de formularios (sustituye a bodyParser.urlencoded())

// Rutas
app.use('/usuarios', usuarioRoutes);  // Usa las rutas de usuarios

// Conexión a la base de datos
try {
    await db.authenticate();
    console.log('Conexión exitosa a la DB');
} catch (error) {
    console.log(`El error de conexión es: ${error}`);
}

// Ruta básica para verificar el servidor
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

// Levantar el servidor en el puerto 8000
app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/');
});
