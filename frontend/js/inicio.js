const STORAGE_KEY = "wt-inicio-filtros";

const levelButtons = document.getElementById("level-buttons");
const levelInfo = document.getElementById("level-info");
const typeButtons = document.getElementById("type-buttons");
const guidesBox = document.getElementById("guides");
const tipsBox = document.getElementById("tips");
const tipsText = document.getElementById("tips-text");

let filters = loadFilters();

function loadFilters() {
    const defaults = { level: "principiante", type: "todos" };

    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved && LEVELS[saved.level]) {
            return {
                level: saved.level,
                type: TYPES[saved.type] || saved.type === "todos" ? saved.type : "todos"
            };
        }
    } catch (error) {
        // Sin almacenamiento disponible: se usan los valores por defecto
    }

    return defaults;
}

function saveFilters() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch (error) {
        // No es importante si no se puede guardar
    }
}

function list(items) {
    return items.map((item) => `<li>${item}</li>`).join("");
}

/* ---------- Filtros ---------- */

function renderLevelButtons() {
    levelButtons.innerHTML = "";

    Object.entries(LEVELS).forEach(([key, level]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "level-btn level-" + key;
        button.setAttribute("aria-pressed", filters.level === key);
        button.innerHTML = `<strong>${level.nombre}</strong><span>${level.br}</span>`;

        if (filters.level === key) button.classList.add("active");

        button.addEventListener("click", () => {
            filters.level = key;
            saveFilters();
            render();
        });

        levelButtons.appendChild(button);
    });
}

function renderTypeButtons() {
    typeButtons.innerHTML = "";

    const options = { todos: "Todos", ...TYPES };

    Object.entries(options).forEach(([key, label]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tab";
        button.textContent = label;
        button.setAttribute("aria-pressed", filters.type === key);

        if (filters.type === key) button.classList.add("active");

        button.addEventListener("click", () => {
            filters.type = key;
            saveFilters();
            render();
        });

        typeButtons.appendChild(button);
    });
}

/* ---------- Contenido ---------- */

function renderLevelInfo() {
    const level = LEVELS[filters.level];

    const skip = level.noPorAhora.length
        ? `<div>
               <h3>Todavía no lo necesitás</h3>
               <ul class="skip">${list(level.noPorAhora)}</ul>
           </div>`
        : "";

    levelInfo.innerHTML = `
        <p>${level.resumen}</p>
        <div class="level-columns">
            <div>
                <h3>Lo que vas a aprender</h3>
                <ul>${list(level.aprender)}</ul>
            </div>
            ${skip}
        </div>
        <p class="note">Los rangos de BR son aproximados y pueden cambiar con las actualizaciones del juego.</p>
    `;
}

function guideCard(guide) {
    const concepts = guide.concepts
        .map(([term, text]) => `<dt>${term}</dt><dd>${text}</dd>`)
        .join("");

    const question = encodeURIComponent(guide.ask);

    return `
        <article class="card">
            <img src="${guide.img}" alt="${guide.alt}" loading="lazy">
            <div class="card-body">
                <div class="badges">
                    <span class="level-tag level-${guide.level}">${LEVELS[guide.level].nombre}</span>
                    <span class="type-tag">${TYPES[guide.type]}</span>
                </div>

                <h3>${guide.title}</h3>
                <p class="example">${guide.vehicle}</p>
                <p>${guide.intro}</p>

                <details open>
                    <summary>Paso a paso</summary>
                    <ol>${list(guide.steps)}</ol>
                </details>

                <details>
                    <summary>Conceptos clave</summary>
                    <dl>${concepts}</dl>
                </details>

                <details>
                    <summary>Errores comunes</summary>
                    <ul>${list(guide.mistakes)}</ul>
                </details>

                <details>
                    <summary>Práctica sugerida</summary>
                    <p>${guide.practice}</p>
                </details>

                <a class="ask" href="chat.html?q=${question}">Preguntale a la IA sobre esto →</a>
            </div>
        </article>
    `;
}

function renderGuides() {
    const guides = GUIDES.filter(
        (guide) =>
            guide.level === filters.level &&
            (filters.type === "todos" || guide.type === filters.type)
    );

    guidesBox.innerHTML = guides.length
        ? guides.map(guideCard).join("")
        : '<p class="empty">No hay guías para esta combinación.</p>';
}

function renderTips() {
    const level = LEVELS[filters.level];
    tipsText.textContent = `Consejos pensados para el nivel ${level.nombre.toLowerCase()}.`;

    tipsBox.innerHTML = TIPS
        .filter((tip) => tip.level === filters.level)
        .map(
            (tip) => `
                <div class="tip">
                    <h3>${tip.icon} ${tip.title}</h3>
                    <p>${tip.text}</p>
                </div>
            `
        )
        .join("");
}

function render() {
    renderLevelButtons();
    renderLevelInfo();
    renderTypeButtons();
    renderGuides();
    renderTips();
}

render();
