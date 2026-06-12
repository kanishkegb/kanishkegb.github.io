---
layout: post
title: "Simulink Matrix Concatenation: A Quick Reference"
tags: [simulink, matlab, signal-processing, reference]
excerpt: "A concise reference for horizontal and vertical matrix concatenation in Simulink — covering block behaviour, dimension rules, and worked examples."
---

Matrix concatenation in Simulink is performed by the **Matrix Concatenate** block (found under *Math Operations*). The block combines multiple input matrices along a specified dimension, governed by the **Concatenation method** parameter: `Horizontal` or `Vertical`.

---

## Horizontal Concatenation

Horizontal concatenation joins matrices **side-by-side**, appending columns. This corresponds to MATLAB's `[A, B]` syntax.

**Dimension rule:** all input matrices must share the same number of **rows**. The output column count is the sum of each input's column count.

$$
[A \mid B] \quad \Longrightarrow \quad \text{rows}_A = \text{rows}_B, \quad \text{cols}_{\text{out}} = \text{cols}_A + \text{cols}_B
$$

### Example

Given:

$$
A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}_{2 \times 2}
\qquad
B = \begin{bmatrix} 5 \\ 6 \end{bmatrix}_{2 \times 1}
$$

Horizontal concatenation yields:

$$
[A \mid B] = \begin{bmatrix} 1 & 2 & 5 \\ 3 & 4 & 6 \end{bmatrix}_{2 \times 3}
$$

<div class="concat-diagram">
  <div class="concat-matrix" style="--cols: 2; --rows: 2; --color: var(--accent);">
    <div class="concat-label">A &nbsp;<span class="concat-dim">2×2</span></div>
    <div class="concat-cells">
      <span>1</span><span>2</span>
      <span>3</span><span>4</span>
    </div>
  </div>
  <div class="concat-op">+</div>
  <div class="concat-matrix" style="--cols: 1; --rows: 2; --color: #f59e0b;">
    <div class="concat-label">B &nbsp;<span class="concat-dim">2×1</span></div>
    <div class="concat-cells">
      <span>5</span>
      <span>6</span>
    </div>
  </div>
  <div class="concat-op">→</div>
  <div class="concat-matrix" style="--cols: 3; --rows: 2; --color: #10b981;">
    <div class="concat-label">[A | B] &nbsp;<span class="concat-dim">2×3</span></div>
    <div class="concat-cells">
      <span style="background: color-mix(in srgb, var(--accent) 12%, transparent);">1</span>
      <span style="background: color-mix(in srgb, var(--accent) 12%, transparent);">2</span>
      <span style="background: color-mix(in srgb, #f59e0b 18%, transparent);">5</span>
      <span style="background: color-mix(in srgb, var(--accent) 12%, transparent);">3</span>
      <span style="background: color-mix(in srgb, var(--accent) 12%, transparent);">4</span>
      <span style="background: color-mix(in srgb, #f59e0b 18%, transparent);">6</span>
    </div>
  </div>
</div>

**Simulink block setting:** set *Concatenation method* to `Horizontal` and *Number of inputs* to `2`.

---

## Vertical Concatenation

Vertical concatenation stacks matrices **one above the other**, appending rows. This corresponds to MATLAB's `[A; B]` syntax.

**Dimension rule:** all input matrices must share the same number of **columns**. The output row count is the sum of each input's row count.

$$
\begin{bmatrix} A \\ B \end{bmatrix} \quad \Longrightarrow \quad \text{cols}_A = \text{cols}_B, \quad \text{rows}_{\text{out}} = \text{rows}_A + \text{rows}_B
$$

### Example

Given:

$$
A = \begin{bmatrix} 1 & 2 & 3 \end{bmatrix}_{1 \times 3}
\qquad
B = \begin{bmatrix} 4 & 5 & 6 \end{bmatrix}_{1 \times 3}
$$

Vertical concatenation yields:

$$
\begin{bmatrix} A \\ B \end{bmatrix} = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}_{2 \times 3}
$$

<div class="concat-diagram concat-diagram--vert">
  <div class="concat-matrix" style="--cols: 3; --rows: 1; --color: var(--accent);">
    <div class="concat-label">A &nbsp;<span class="concat-dim">1×3</span></div>
    <div class="concat-cells">
      <span>1</span><span>2</span><span>3</span>
    </div>
  </div>
  <div class="concat-op">+</div>
  <div class="concat-matrix" style="--cols: 3; --rows: 1; --color: #f59e0b;">
    <div class="concat-label">B &nbsp;<span class="concat-dim">1×3</span></div>
    <div class="concat-cells">
      <span>4</span><span>5</span><span>6</span>
    </div>
  </div>
  <div class="concat-op">→</div>
  <div class="concat-matrix" style="--cols: 3; --rows: 2; --color: #10b981;">
    <div class="concat-label">[A; B] &nbsp;<span class="concat-dim">2×3</span></div>
    <div class="concat-cells">
      <span style="background: color-mix(in srgb, var(--accent) 12%, transparent);">1</span>
      <span style="background: color-mix(in srgb, var(--accent) 12%, transparent);">2</span>
      <span style="background: color-mix(in srgb, var(--accent) 12%, transparent);">3</span>
      <span style="background: color-mix(in srgb, #f59e0b 18%, transparent);">4</span>
      <span style="background: color-mix(in srgb, #f59e0b 18%, transparent);">5</span>
      <span style="background: color-mix(in srgb, #f59e0b 18%, transparent);">6</span>
    </div>
  </div>
</div>

**Simulink block setting:** set *Concatenation method* to `Vertical` and *Number of inputs* to `2`.

---

## Summary

| Property | Horizontal `[A, B]` | Vertical `[A; B]` |
|---|---|---|
| Growth direction | Along columns (→) | Along rows (↓) |
| Shared constraint | Row count must match | Column count must match |
| Output rows | Same as inputs | Sum of input rows |
| Output columns | Sum of input columns | Same as inputs |
| MATLAB equivalent | `[A, B]` | `[A; B]` |

---

## Common Pitfall

Simulink will throw a **dimension mismatch error** at simulation start if the constrained dimension is inconsistent across inputs. Check signal dimensions using *Simulation → Update Diagram* (`Ctrl+D`) before running to surface these errors early.

<style>
.concat-diagram {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1.5rem 0 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--bg-alt);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.concat-diagram--vert {
  align-items: center;
}

.concat-matrix {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.concat-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.concat-dim {
  font-weight: 400;
  color: var(--text-muted);
}

.concat-cells {
  display: grid;
  grid-template-columns: repeat(var(--cols), 2rem);
  grid-template-rows: repeat(var(--rows), 2rem);
  gap: 3px;
  border: 1.5px solid var(--color);
  border-radius: 4px;
  padding: 4px;
}

.concat-cells span {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-weight: 500;
  color: var(--text);
  border-radius: 2px;
  background: transparent;
}

.concat-op {
  font-size: 1.2rem;
  font-weight: 300;
  color: var(--text-muted);
  flex-shrink: 0;
}
</style>