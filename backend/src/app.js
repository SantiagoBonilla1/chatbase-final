const path = require("path");
// En local se lee backend/.env; en Vercel las variables vienen del panel del proyecto
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
//importamos Express
const express = require("express");
const cors = require("cors");

//importamos las rutas del chat
const chatRoutes = require("./routes/chat.routes");

//creamos nuestra aplicación
const app = express();

const PORT = process.env.PORT || 3000;

// Permitir peticiones desde el frontend- Configuración de CORS
app.use(cors());

//le dice a Express que pueda recibir información en formato JSON
app.use(express.json({ limit: "100kb" }));

// Rutas
app.use("/api/chat", chatRoutes);

// Ruta inicial
app.get("/", (req, res) => {
    res.json({
        message: "Backend Chat IA funcionando"
    });
});

// JSON mal formado u otros errores no controlados
app.use((err, req, res, next) => {
    console.error("Error no controlado:", err.message);

    res.status(err.status || 500).json({
        success: false,
        message: "Solicitud inválida."
    });
});

// Iniciar servidor solo al ejecutar el archivo directamente (en Vercel lo importa api/index.js)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}

module.exports = app;
