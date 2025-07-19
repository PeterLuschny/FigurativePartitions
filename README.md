## 🎯 Figurative Partitions — A Mathematical Puzzle Game

Welcome to a visual and interactive exploration of **figurate numbers**, where geometry meets number theory in a hands-on challenge.

Your goal:  
**Construct a combination of figurative shapes whose total value matches the target sum.**

---

### 🧩 What are figurative shapes?

Each shape corresponds to a class of polygonal numbers:

| Shape     | OEIS ID    | Description                    |
|-----------|------------|--------------------------------|
| Pebble    | —          | Always worth 1 (base unit)     |
| Triangle  | A000217    | Classic triangular numbers     |
| Square    | A000290    | Perfect squares                |
| Pentagon  | A000326    | Generalized pentagonal numbers |
| Hexagon   | A000384    | Polygonal with six sides       |
| Heptagon  | A000566    | Seven-sided figurates          |
| Octagon   | A000567    | Eight-sided figurates          |

Each shape carries a value based on its type and “size” \(k\). You can increase or decrease the size of a shape to adjust its value — or remove it entirely.

---

### 🛠️ How to play

- **Choose a target sum** using the input box
- **Add shapes** by clicking the buttons in the palette (each shape can only be used once per board)
- **Adjust shapes**: click **+** or **–** to grow or shrink their size
- **Track your moves**: every value-changing click is counted
- **Win condition**: reach the exact target sum — and you'll see a 🎉 with your click count

You can **reset the board** any time by choosing a new target.

---

### 🌟 Tips

- Pebbles are fixed at value 1
- Only one of each shape may appear on the board
- Tooltips on buttons link to OEIS sequences for further exploration


Dive in and see what combinations unlock your perfect partition. 🧠✨

---

## This is a TypeScript project. 

1. Install dependencies:
   ```sh
   npm install
   ```
2. Build the project:
   ```sh
   npx tsc
   ```
3. Run the compiled code:
   ```sh
   node dist/FigurativePartitions.js
   ```

## Project Structure
- `src/FigurativePartitions.ts`: Main TypeScript entry point.
- `tsconfig.json`: TypeScript configuration.

## Customization
Edit `src/FigurativePartitions.ts` to start building the application.
