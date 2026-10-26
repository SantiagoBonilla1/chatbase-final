const express = require("express");
const { generateResponse, listModels } =
  require("../services/gemini.service");

const router = express.Router();

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_ITEMS = 20;

// Deja solo mensajes válidos ({ role: "user" | "model", text })
function sanitizeHistory(history) {
    if (!Array.isArray(history)) return [];

    return history
        .filter((item) =>
            item &&
            (item.role === "user" || item.role === "model") &&
            typeof item.text === "string" &&
            item.text.trim()
        )
        .slice(-MAX_HISTORY_ITEMS)
        .map((item) => ({
            role: item.role,
            text: item.text.slice(0, MAX_MESSAGE_LENGTH * 4)
        }));
}

// Traduce los errores de la API de Gemini a mensajes claros
function describeError(error) {
    const status = error.status || error.code;

    if (status === 429) {
        return {
            status: 429,
            message:
                "Se alcanzó el límite de solicitudes de la IA (nivel gratuito). Esperá un minuto e intentá de nuevo."
        };
    }

    if (status === 503) {
        return {
            status: 503,
            message: "El modelo está saturado en este momento. Probá de nuevo en unos segundos."
        };
    }

    if (status === 400 || status === 401 || status === 403 || status === 404) {
        return {
            status: 502,
            message: "Hay un problema con la configuración de la IA (clave o modelo). Revisá el backend."
        };
    }

    return {
        status: 500,
        message: "No se pudo obtener una respuesta de la IA."
    };
}

router.post("/", async (req, res) => {
    try {
        const { message, history, profile } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "El mensaje no puede estar vacío."
            });
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
            return res.status(400).json({
                success: false,
                message: `El mensaje es demasiado largo (máximo ${MAX_MESSAGE_LENGTH} caracteres).`
            });
        }

        const { text, sources } = await generateResponse({
            message: message.trim(),
            history: sanitizeHistory(history),
            profile: profile && typeof profile === "object" ? profile : {}
        });

        res.json({
            success: true,
            response: text,
            sources
        });

    } catch (error) {
        console.error("Error al consultar Gemini:", error.message);

        const { status, message } = describeError(error);

        res.status(status).json({
            success: false,
            message
        });
    }
});

// Utilidad de desarrollo: imprime en consola los modelos disponibles
router.get("/models", async (req, res) => {
    try {
        await listModels();

        res.json({
            success: true,
            message: "Modelos mostrados en la consola."
        });
    } catch (error) {
        console.error("Error al listar modelos:", error.message);

        res.status(500).json({
            success: false,
            message: "No se pudieron obtener los modelos."
        });
    }
});

module.exports = router;
