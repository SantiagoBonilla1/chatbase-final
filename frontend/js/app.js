// En Vercel el backend está en el mismo dominio (/api/chat).
// En local (Live Server o abriendo el archivo) se usa el servidor Express del puerto 3000.
const IS_LOCAL = ["", "localhost", "127.0.0.1"].includes(location.hostname);
const API_URL =
    IS_LOCAL && location.port !== "3000"
        ? "http://localhost:3000/api/chat"
        : "/api/chat";
const STORAGE_KEY = "wt-trainer-state";

const SUGGESTIONS = [
    "Soy nuevo, ¿por dónde empiezo?",
    "¿Cómo gano Silver Lions más rápido?",
    "¿Qué es la penetración de blindaje?",
    "Armame una ruta de novato a avanzado"
];

const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messagesContainer = document.getElementById("messages");
const newChatButton = document.getElementById("new-chat");
const historyList = document.getElementById("chat-history");
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menu-button");

const profileFields = {
    level: document.getElementById("profile-level"),
    nation: document.getElementById("profile-nation"),
    mode: document.getElementById("profile-mode")
};

// Estado: conversaciones [{ id, title, messages: [{ role, text, sources }] }]
let state = loadState();
let sending = false;

/* ---------- Persistencia ---------- */

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved && Array.isArray(saved.chats)) return saved;
    } catch (error) {
        // Si el almacenamiento falla, se arranca con un estado vacío
    }
    return { chats: [], currentId: null, profile: {} };
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.warn("No se pudo guardar el historial:", error);
    }
}

function currentChat() {
    return state.chats.find((chat) => chat.id === state.currentId);
}

/* ---------- Formato de texto (Markdown básico y seguro) ---------- */

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function inlineFormat(text) {
    return escapeHtml(text)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
        .replace(
            /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );
}

// Convierte títulos, listas y párrafos; todo el texto se escapa antes
function renderMarkdown(text) {
    const lines = text.split("\n");
    let html = "";
    let list = null; // "ul" | "ol"

    const closeList = () => {
        if (list) {
            html += `</${list}>`;
            list = null;
        }
    };

    for (const raw of lines) {
        const line = raw.trim();
        const heading = line.match(/^#{1,4}\s+(.*)$/);
        const bullet = line.match(/^[-*•]\s+(.*)$/);
        const numbered = line.match(/^\d+[.)]\s+(.*)$/);

        if (heading) {
            closeList();
            html += `<h4>${inlineFormat(heading[1])}</h4>`;
        } else if (bullet || numbered) {
            const type = bullet ? "ul" : "ol";
            if (list !== type) {
                closeList();
                html += `<${type}>`;
                list = type;
            }
            html += `<li>${inlineFormat((bullet || numbered)[1])}</li>`;
        } else if (line === "") {
            closeList();
        } else {
            closeList();
            html += `<p>${inlineFormat(line)}</p>`;
        }
    }

    closeList();
    return html;
}

/* ---------- Pantalla ---------- */

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Logo oficial de War Thunder: se carga desde el sitio de Gaijin y se muestra sin modificar
const WT_LOGO = "https://warthunder.com/assets/img/svg/colored/logo-warthunder-new.svg";
const SUGGESTION_ICONS = ["🎯", "💰", "🛡️", "🗺️"];

function renderWelcome() {
    messagesContainer.innerHTML = `
        <div class="welcome">
            <div class="welcome-hero">
                <img class="welcome-logo" src="${WT_LOGO}" alt="War Thunder">
                <h2>¿Listo para mejorar?</h2>
                <p>
                    Tu entrenador virtual para tanques, aviones y barcos.
                    Preguntame lo que quieras o elegí una de estas ideas.
                </p>
            </div>
            <div class="suggestions" id="suggestions"></div>
            <p class="welcome-note">Proyecto educativo. No está afiliado a Gaijin Entertainment.</p>
        </div>
    `;

    const container = document.getElementById("suggestions");

    SUGGESTIONS.forEach((text, index) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chip";
        chip.innerHTML = `<span class="chip-icon">${SUGGESTION_ICONS[index % SUGGESTION_ICONS.length]}</span>`;
        chip.append(text);
        chip.addEventListener("click", () => handleSend(text));
        container.appendChild(chip);
    });
}

// Copia el texto de una respuesta al portapapeles
function copyButton(text) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-btn";
    button.textContent = "Copiar";
    button.setAttribute("aria-label", "Copiar respuesta");

    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(text);
            button.textContent = "¡Copiado!";
        } catch (error) {
            button.textContent = "No se pudo";
        }
        setTimeout(() => (button.textContent = "Copiar"), 1500);
    });

    return button;
}

function avatarElement(role) {
    const avatar = document.createElement("div");
    avatar.className = "msg-avatar " + (role === "user" ? "user" : "assistant");
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = role === "user" ? "Tú" : "✦";
    return avatar;
}

function createMessageElement({ role, text, sources, error }) {
    const row = document.createElement("div");
    row.className = "msg-row " + (role === "user" ? "user" : "assistant");

    const element = document.createElement("div");
    element.classList.add("message", role === "user" ? "user" : "assistant");

    if (error) element.classList.add("error");

    if (role === "user" || error) {
        element.textContent = text;
    } else {
        element.innerHTML = renderMarkdown(text);

        if (sources && sources.length) {
            const box = document.createElement("div");
            box.className = "sources";
            box.innerHTML = "<span>Fuentes:</span>";

            sources.forEach((source) => {
                const link = document.createElement("a");
                link.href = source.url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = source.title;
                box.appendChild(link);
            });

            element.appendChild(box);
        }

        element.appendChild(copyButton(text));
    }

    row.append(avatarElement(role), element);
    return row;
}

function renderMessages() {
    const chat = currentChat();

    if (!chat || chat.messages.length === 0) {
        renderWelcome();
        return;
    }

    messagesContainer.innerHTML = "";
    chat.messages.forEach((message) => {
        messagesContainer.appendChild(createMessageElement(message));
    });
    scrollToBottom();
}

function renderHistory() {
    historyList.innerHTML = "";

    state.chats.forEach((chat) => {
        const item = document.createElement("div");
        item.className = "history-item";
        if (chat.id === state.currentId) item.classList.add("active");

        const open = document.createElement("button");
        open.type = "button";
        open.className = "history-open";
        open.textContent = chat.title;
        open.addEventListener("click", () => selectChat(chat.id));

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "history-delete";
        remove.textContent = "×";
        remove.setAttribute("aria-label", `Eliminar "${chat.title}"`);
        remove.addEventListener("click", () => deleteChat(chat.id));

        item.append(open, remove);
        historyList.appendChild(item);
    });
}

function showTyping() {
    const typing = document.createElement("div");
    typing.className = "msg-row assistant";
    typing.id = "typing";

    const bubble = document.createElement("div");
    bubble.className = "message assistant typing";
    bubble.innerHTML = "<span></span><span></span><span></span>";

    typing.append(avatarElement("assistant"), bubble);
    messagesContainer.appendChild(typing);
    scrollToBottom();
}

function hideTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

function setSending(value) {
    sending = value;
    sendButton.disabled = value;
    messageInput.disabled = value;
    if (!value) messageInput.focus();
}

/* ---------- Conversaciones ---------- */

function newChat() {
    // Si el chat actual está vacío se reutiliza
    const existing = currentChat();
    if (existing && existing.messages.length === 0) return;

    const chat = { id: Date.now().toString(), title: "Nuevo chat", messages: [] };
    state.chats.unshift(chat);
    state.currentId = chat.id;
    saveState();
    renderHistory();
    renderMessages();
}

function selectChat(id) {
    if (sending) return;
    state.currentId = id;
    saveState();
    renderHistory();
    renderMessages();
    sidebar.classList.remove("open");
}

function deleteChat(id) {
    if (sending) return;
    state.chats = state.chats.filter((chat) => chat.id !== id);

    if (state.currentId === id) {
        state.currentId = state.chats[0]?.id || null;
    }

    if (!state.currentId) {
        newChat();
        return;
    }

    saveState();
    renderHistory();
    renderMessages();
}

/* ---------- Comunicación con el backend ---------- */

function getProfile() {
    return {
        level: profileFields.level.value,
        nation: profileFields.nation.value,
        mode: profileFields.mode.value
    };
}

async function requestReply(message, history) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history, profile: getProfile() })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Error del servidor");
    }

    return data;
}

async function handleSend(text) {
    text = text.trim();
    if (!text || sending) return;

    if (!currentChat()) newChat();
    const chat = currentChat();

    // El historial se toma antes de agregar el mensaje nuevo
    const history = chat.messages
        .filter((message) => !message.error)
        .map((message) => ({ role: message.role, text: message.text }));

    const userMessage = { role: "user", text };
    chat.messages.push(userMessage);

    if (chat.messages.length === 1) {
        chat.title = text.length > 32 ? text.slice(0, 32) + "…" : text;
    }

    saveState();
    renderHistory();
    renderMessages();

    messageInput.value = "";
    autoResize();
    setSending(true);
    showTyping();

    try {
        const data = await requestReply(text, history);
        chat.messages.push({
            role: "model",
            text: data.response,
            sources: data.sources
        });
    } catch (error) {
        console.error("Error al comunicarse con el backend:", error);

        const offline = error instanceof TypeError;
        chat.messages.push({
            role: "model",
            error: true,
            text: offline
                ? "No se pudo conectar con el servidor. ¿Está encendido el backend?"
                : error.message
        });
    }

    hideTyping();
    saveState();

    if (state.currentId === chat.id) renderMessages();
    setSending(false);
}

/* ---------- Eventos ---------- */

function autoResize() {
    messageInput.style.height = "auto";
    messageInput.style.height = Math.min(messageInput.scrollHeight, 160) + "px";
}

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSend(messageInput.value);
});

// Enter envía; Shift+Enter agrega una línea
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        chatForm.requestSubmit();
    }
});

messageInput.addEventListener("input", autoResize);

newChatButton.addEventListener("click", () => {
    newChat();
    sidebar.classList.remove("open");
    messageInput.focus();
});

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

Object.entries(profileFields).forEach(([key, field]) => {
    field.value = state.profile?.[key] || "";
    field.addEventListener("change", () => {
        state.profile = getProfile();
        saveState();
    });
});

/* ---------- Inicio ---------- */

// Desde la página de inicio se puede llegar con una pregunta sugerida (?q=...)
const suggestedQuestion = new URLSearchParams(location.search).get("q");

if (!currentChat()) {
    state.currentId = state.chats[0]?.id || null;
}

if (!state.currentId) {
    newChat();
} else {
    renderHistory();
    renderMessages();
}

if (suggestedQuestion) {
    // Solo se completa el cuadro de texto: el usuario decide si la envía
    messageInput.value = suggestedQuestion.slice(0, 2000);
    autoResize();
    messageInput.focus();
}
