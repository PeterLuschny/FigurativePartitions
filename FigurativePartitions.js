// tsc --target ES2020 FigurativePartitions.ts
let target = 27;
let figures = [];
let nextId = 1;
let clickCount = 0;
// Compute value for figurate (n, k)
function computeValue(n, k) {
    return n === 0 ? 1 : k + (n * (k - 1) * k) / 2;
}
// Get used shapes for disabling buttons
function getUsedShapes() {
    const used = new Set();
    for (const fig of figures)
        used.add(fig.n);
    return used;
}
// Render shape palette
function renderPalette() {
    const palette = document.getElementById("palette");
    if (!palette)
        return;
    palette.innerHTML = "<h2>🛠️ Choose a Shape</h2>";
    const usedShapes = getUsedShapes();
    const labels = {
        0: "Pebble",
        1: "Triangle",
        2: "Square",
        3: "Pentagon",
        4: "Hexagon",
        5: "Heptagon",
        6: "Octagon",
    };
    const oeisLinks = {
        0: "A012", // Pebble
        1: "A217", // Triangle
        2: "A290", // Square
        3: "A326", // Pentagon
        4: "A384", // Hexagon
        5: "A566", // Heptagon
        6: "A567", // Octagon
    };
    const order = [0, 1, 2, 3, 4, 5, 6];
    for (const n of order) {
        const button = document.createElement("button");
        button.textContent = labels[n];
        button.dataset["n"] = String(n);
        button.title = oeisLinks[n] ? `OEIS ${oeisLinks[n]}` : "Pebble — value 1";
        if (usedShapes.has(n)) {
            button.disabled = true;
            button.classList.add("used");
        }
        palette.appendChild(button);
    }
}
// Render board and figures
function render() {
    renderPalette();
    const board = document.getElementById("board");
    if (!board)
        return;
    board.innerHTML = "";
    let sum = 0;
    for (const fig of figures) {
        sum += fig.v;
        const div = document.createElement("div");
        div.className = "figure";
        if (fig.n !== 0) {
            div.innerHTML = `
        <div class="shape sides-${fig.n}"></div>
        <div>n=${fig.n}, k=${fig.k}, v=${fig.v}</div>
      `;
            div.innerHTML += `
        <button data-action="inc" data-id="${fig.id}">+</button>
        <button data-action="dec" data-id="${fig.id}">–</button>
      `;
        }
        else {
            div.innerHTML = `
        <div class="shape sides-${fig.n}"></div>
        <div style="font-style: italic;">Pebble v = 1  </div>
      `;
        }
        div.innerHTML += `<button data-action="rm" data-id="${fig.id}">✕</button>`;
        board.appendChild(div);
    }
    const sumDiv = document.getElementById("sum");
    if (sumDiv) {
        sumDiv.textContent =
            `Current sum: ${sum}` + (sum === target ? ` 🎉 You got it in ${clickCount} clicks!` : "");
    }
    const emptyDiv = document.getElementById("board-empty");
    if (emptyDiv) {
        emptyDiv.style.display = figures.length === 0 ? "block" : "none";
    }
}
// Add new figure to the board
function addShape(n) {
    if (getUsedShapes().has(n))
        return; // just in case
    const fig = {
        id: nextId++,
        n,
        k: 1,
        v: computeValue(n, 1),
    };
    figures.push(fig);
    clickCount++;
    render();
}
// Handle board figure clicks
function onBoardClick(ev) {
    const btn = ev.target.closest("button");
    if (!btn)
        return;
    const action = btn.dataset["action"];
    const id = Number(btn.dataset["id"]);
    const idx = figures.findIndex(f => f.id === id);
    if (idx < 0)
        return;
    const fig = figures[idx];
    if (action === "inc" && fig.n !== 0) {
        fig.k++;
        fig.v = computeValue(fig.n, fig.k);
        clickCount++;
    }
    else if (action === "dec" && fig.n !== 0 && fig.k > 1) {
        fig.k--;
        fig.v = computeValue(fig.n, fig.k);
        clickCount++;
    }
    else if (action === "rm") {
        figures.splice(idx, 1);
        clickCount++;
    }
    render();
}
// Initial setup
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("setTargetBtn")?.addEventListener("click", () => {
        const inp = document.getElementById("targetInput");
        if (!inp)
            return;
        const v = parseInt(inp.value, 10);
        if (v > 0) {
            target = v;
            figures = []; // reset the board!
            nextId = 1; // optional: reset ID counter
            clickCount = 0; // reset click count
            render();
        }
    });
    // Shape clicks
    document.getElementById("palette")?.addEventListener("click", ev => {
        const btn = ev.target.closest("button");
        if (!btn || btn.disabled)
            return;
        const n = Number(btn.dataset["n"]);
        if (!isNaN(n))
            addShape(n);
    });
    document.getElementById("board")?.addEventListener("click", onBoardClick);
    render();
});
