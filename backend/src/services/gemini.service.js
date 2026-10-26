const { SYSTEM_PROMPT, buildProfileContext } = require("./prompt");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Falta configurar GEMINI_API_KEY en .env");
}

const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

const USE_SEARCH = process.env.GEMINI_SEARCH !== "false";

// Mensajes anteriores que se envían al modelo (ahorra cuota del nivel gratuito)
const MAX_HISTORY = 10;

let ai;

// @google/genai es un módulo ESM, por eso se importa de forma dinámica
async function getClient() {
  if (!ai) {
    const { GoogleGenAI } = await import("@google/genai");
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

// Extrae los enlaces que usó la búsqueda web (sin repetir)
function extractSources(response) {
  const chunks =
    response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

  const seen = new Set();
  const sources = [];

  for (const chunk of chunks) {
    const uri = chunk.web?.uri;
    if (uri && !seen.has(uri)) {
      seen.add(uri);
      sources.push({ title: chunk.web.title || uri, url: uri });
    }
  }

  return sources;
}

async function generateResponse({ message, history = [], profile = {} }) {
  const client = await getClient();

  const contents = [
    ...history.slice(-MAX_HISTORY).map((item) => ({
      role: item.role,
      parts: [{ text: item.text }]
    })),
    { role: "user", parts: [{ text: message }] }
  ];

  const response = await client.models.generateContent({
    model: MODEL,
    contents,
    config: {
      systemInstruction: SYSTEM_PROMPT + buildProfileContext(profile),
      // Búsqueda web para datos actualizados (se desactiva con GEMINI_SEARCH=false)
      ...(USE_SEARCH && { tools: [{ googleSearch: {} }] })
    }
  });

  return {
    text: response.text,
    sources: extractSources(response)
  };
}

async function listModels() {
  const client = await getClient();
  const models = await client.models.list();

  for await (const model of models) {
    console.log({
      nombre: model.name,
      metodos: model.supportedActions || model.supportedGenerationMethods
    });
  }
}

module.exports = {
  generateResponse,
  listModels
};
