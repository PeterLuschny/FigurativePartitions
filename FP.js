let target = 27;
let figures = [];
let nextId = 1;
let clickCount = 0;
let activeId = null;
// compute value (Pebble n=0 is always 1)
function computeValue(n, k) {
    return n === 0 ? 1 : k + (n * (k - 1) * k) / 2;
}
// which shapes are already on-board
function getUsedShapes() {
    return new Set(figures.map(f => f.n));
}
// --- RENDERING ---
function renderPalette() {
    const palette = document.getElementById("palette");
    if (!palette)
        return;
    palette.innerHTML = "<h2>🛠️ Choose a Shape</h2>";
    const used = getUsedShapes();
    const labels = {
        0: "Pebble", 1: "Triangle", 2: "Square",
        3: "Pentagon", 4: "Hexagon", 5: "Heptagon", 6: "Octagon"
    };
    const oeis = {
        0: "", 1: "A000217", 2: "A000290",
        3: "A000326", 4: "A000384", 5: "A000566", 6: "A000567"
    };
    for (let n = 0; n <= 6; n++) {
        const btn = document.createElement("button");
        btn.textContent = labels[n];
        btn.dataset["n"] = String(n);
        btn.title = oeis[n] ? `OEIS ${oeis[n]}` : "Pebble — value 1";
        if (used.has(n)) {
            btn.disabled = true;
            btn.classList.add("used");
        }
        palette.appendChild(btn);
    }
}
function renderBoard() {
    const board = document.getElementById("board");
    const emptyNote = document.getElementById("board-empty");
    board.innerHTML = "";
    let sum = 0;
    for (const fig of figures) {
        sum += fig.v;
        const div = document.createElement("div");
        div.className = "figure";
        div.dataset["id"] = String(fig.id);
        if (fig.id === activeId)
            div.classList.add("active");
        // two columns: shape | info
        const u = fig.n === 0 ? 1 : fig.n + 2;
        div.innerHTML = `
      <div class="shape sides-${fig.n}"></div>
      <div class="info">
        <div>S = ${u}</div>
        <div>M = ${fig.k}</div>
        <div>V = ${fig.v}</div>
      </div>
    `;
        board.appendChild(div);
    }
    emptyNote.style.display = figures.length === 0 ? "block" : "none";
    // update sum and win sound
    const sumDiv = document.getElementById("sum");
    const won = sum === target;
    sumDiv.innerHTML = `<span style="font-size: 1.3em;"><strong>Current sum: ${sum}</strong></span>` + (won ? ` <span style="color:green; font-weight:bold;font-size: 1.3em;">🎉 You got it in ${clickCount} clicks!</span>` : "");
    if (won) {
        document.getElementById("winSound")?.play();
    }
}
function updateActionButtons() {
    const addBtn = document.getElementById("btnAdd");
    const adjBtn = document.getElementById("btnAdjust");
    const rmBtn = document.getElementById("btnRemove");
    if (activeId === null) {
        addBtn.disabled = adjBtn.disabled = rmBtn.disabled = true;
        return;
    }
    const fig = figures.find(f => f.id === activeId);
    rmBtn.disabled = false;
    // disable Add/Adjust for Pebble
    if (fig.n === 0) {
        addBtn.disabled = adjBtn.disabled = true;
    }
    else {
        addBtn.disabled = false;
        adjBtn.disabled = fig.k <= 1;
    }
}
function render() {
    renderPalette();
    renderBoard();
    updateActionButtons();
}
// --- EVENT HANDLERS ---
// Set new target → clear board
document.getElementById("setTargetBtn")
    .addEventListener("click", () => {
    const inp = document.getElementById("targetInput");
    const v = parseInt(inp.value, 10);
    if (v > 0) {
        target = v;
        figures = [];
        nextId = 1;
        clickCount = 0;
        activeId = null;
        render();
    }
});
// Palette → add shape
document.getElementById("palette")
    .addEventListener("click", ev => {
    const btn = ev.target.closest("button");
    if (!btn || btn.disabled)
        return;
    const n = Number(btn.dataset["n"]);
    if (!isNaN(n)) {
        figures.push({
            id: nextId++,
            n,
            k: 1,
            v: computeValue(n, 1)
        });
        clickCount++;
        activeId = nextId - 1;
        render();
    }
});
// Board → select active figure
document.getElementById("board")
    .addEventListener("click", ev => {
    const figEl = ev.target.closest(".figure");
    if (!figEl)
        return;
    activeId = Number(figEl.dataset["id"]);
    render();
});
// Global Add / Adjust / Remove
document.getElementById("btnAdd")
    .addEventListener("click", () => {
    if (activeId === null)
        return;
    const fig = figures.find(f => f.id === activeId);
    if (fig.n !== 0) {
        fig.k++;
        fig.v = computeValue(fig.n, fig.k);
        clickCount++;
        render();
    }
});
document.getElementById("btnAdjust")
    .addEventListener("click", () => {
    if (activeId === null)
        return;
    const fig = figures.find(f => f.id === activeId);
    if (fig.n !== 0 && fig.k > 1) {
        fig.k--;
        fig.v = computeValue(fig.n, fig.k);
        clickCount++;
        render();
    }
});
document.getElementById("btnRemove")
    .addEventListener("click", () => {
    if (activeId === null)
        return;
    const idx = figures.findIndex(f => f.id === activeId);
    if (idx >= 0) {
        figures.splice(idx, 1);
        clickCount++;
        activeId = null;
        render();
    }
});
// initial render
window.addEventListener("DOMContentLoaded", render);
