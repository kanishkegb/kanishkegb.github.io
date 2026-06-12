---
layout: post
title: "Rotation Matrix Construction"
tags: [guides, tutorials, math, linear-algebra]
excerpt: "A concise guide to constructing a rotation matrix in SO(3) for coordinate frame transformations, with an interactive visualizer."
---


This is a quick reference for constructing a rotation matrix in $$SO(3)$$, primarily for coordinate frame transformations.

## Basic Introduction

A rotation matrix in $$SO(3)$$ is a linear transformation between coordinate frames.
Let $$\{e\}$$ and $$\{b\}$$ be two arbitrary Euclidean coordinate frames, and let $$x^e$$ and $$x^b$$ denote the same vector expressed in each frame, respectively.

The rotation matrix $$R^e_b \in SO(3)$$ describes the orientation of frame $$\{b\}$$ relative to frame $$\{e\}$$.
Pre-multiplying a vector expressed in $$\{b\}$$ by this matrix yields its representation in $$\{e\}$$:

$$x^e = R^e_b \, x^b.$$

Since $$R^e_b \in SO(3)$$, its inverse equals its transpose:

$$R^b_e = \left(R^e_b\right)^T.$$

Therefore, $$R^b_e$$ transforms a vector from frame $$\{e\}$$ into frame $$\{b\}$$.

## SO(3) Properties

A matrix $$R$$ belongs to $$SO(3)$$ if and only if it satisfies two conditions:

$$R^T R = I, \qquad \det(R) = +1.$$

The first condition enforces orthonormality of columns (and rows); the second rules out improper rotations (reflections). These constraints imply that each column of $$R$$ is a unit vector, and any two distinct columns are mutually orthogonal.

## Constructing the Rotation Matrix

The key insight is:

> The $$i$$-th column of $$R^e_b$$ is the unit vector $$b_i$$ expressed in the coordinates of frame $$\{e\}$$.

Consider two frames illustrated below, where each $$e_i$$ and $$b_i$$ is a unit basis vector.

![Coordinate frames](/assets/images/posts/rotation-matrix-construction/coordinate-frames.png)

To find each column, project $$b_i$$ onto each axis of $$\{e\}$$ using the dot product:

$$\left(R^e_b\right)_{ji} = e_j \cdot b_i.$$

Inspecting the figure for the example configuration:

- $$b_1$$ is aligned with $$-e_3$$, with no projection onto $$e_1$$ or $$e_2$$:

$$b_1^e = \begin{bmatrix} 0 \\ 0 \\ -1 \end{bmatrix}$$

- $$b_2$$ is aligned with $$-e_2$$:

$$b_2^e = \begin{bmatrix} 0 \\ -1 \\ 0 \end{bmatrix}$$

- $$b_3$$ is aligned with $$-e_1$$:

$$b_3^e = \begin{bmatrix} -1 \\ 0 \\ 0 \end{bmatrix}$$

Assembling these column vectors gives the rotation matrix:

$$R^e_b = \begin{bmatrix} b_1^e & b_2^e & b_3^e \end{bmatrix} = \begin{bmatrix} 0 & 0 & -1 \\ 0 & -1 & 0 \\ -1 & 0 & 0 \end{bmatrix}.$$

One can verify the $$SO(3)$$ conditions: the columns are mutually orthogonal unit vectors, and $$\det(R^e_b) = +1$$.

## Interactive Visualizer

The demo below lets you freely orient the body frame $$\{b\}$$ relative to the fixed frame $$\{e\}$$ using Euler angle sliders. The rotation matrix is updated live, and the bottom panel shows how it transforms an arbitrary vector.

<style>
.rot-demo {
  background: var(--bg-alt);
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  padding: 1.25rem;
  margin: 1.75rem 0;
  font-size: 0.85rem;
}

.rot-demo-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  align-items: start;
}

.rot-canvas-wrap {
  aspect-ratio: 1 / 1;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg);
  border: 1px solid var(--border);
}

.rot-canvas-wrap canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.rot-right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rot-sliders {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.rot-slider-row {
  display: grid;
  grid-template-columns: 80px 1fr 44px;
  align-items: center;
  gap: 0.5rem;
}

.rot-slider-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.rot-slider-row input[type=range] {
  width: 100%;
  accent-color: var(--accent);
  cursor: pointer;
}

.rot-slider-val {
  font-size: 0.78rem;
  color: var(--text);
  text-align: right;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.rot-matrix-wrap {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
}

.rot-matrix-title {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.6rem;
}

.rot-matrix-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
}

.rot-cell {
  background: var(--bg-alt);
  border-radius: 3px;
  padding: 0.3rem 0.2rem;
  text-align: center;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.78rem;
  color: var(--text);
  transition: background 0.15s, color 0.15s;
}

.rot-cell.col-1 { color: #e05252; }
.rot-cell.col-2 { color: #4caf76; }
.rot-cell.col-3 { color: #4a9ede; }

[data-theme="dark"] .rot-cell.col-1 { color: #f48080; }
[data-theme="dark"] .rot-cell.col-2 { color: #6dcf96; }
[data-theme="dark"] .rot-cell.col-3 { color: #70b8f0; }

.rot-transform-wrap {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
}

.rot-transform-title {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.6rem;
}

.rot-transform-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.rot-vec {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rot-vec-cell {
  background: var(--bg-alt);
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.78rem;
  color: var(--text);
  width: 54px;
  text-align: center;
}

.rot-vec-cell input {
  width: 100%;
  background: none;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  text-align: center;
  padding: 0;
}

.rot-vec-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-align: center;
  margin-top: 2px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.rot-op {
  font-size: 1.1rem;
  color: var(--text-muted);
  flex-shrink: 0;
}

.rot-eq { color: var(--accent); font-weight: 600; }

.rot-reset-btn {
  font-size: 0.75rem;
  font-weight: 500;
  font-family: inherit;
  color: var(--text-muted);
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.3rem 0.75rem;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
  align-self: flex-start;
}

.rot-reset-btn:hover {
  color: var(--text);
  border-color: var(--text-muted);
  background: var(--bg-alt);
}

.rot-demo-hint {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.75rem;
  font-style: italic;
}

@media (max-width: 560px) {
  .rot-demo-top {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="rot-demo">
  <div class="rot-demo-top">
    <div class="rot-canvas-wrap">
      <canvas id="rotCanvas"></canvas>
    </div>
    <div class="rot-right">
      <div class="rot-sliders">
        <div class="rot-slider-row">
          <span class="rot-slider-label">α (Z-axis)</span>
          <input type="range" id="sliderAlpha" min="-180" max="180" value="0" step="1">
          <span class="rot-slider-val" id="valAlpha">0°</span>
        </div>
        <div class="rot-slider-row">
          <span class="rot-slider-label">β (Y-axis)</span>
          <input type="range" id="sliderBeta" min="-180" max="180" value="0" step="1">
          <span class="rot-slider-val" id="valBeta">0°</span>
        </div>
        <div class="rot-slider-row">
          <span class="rot-slider-label">γ (X-axis)</span>
          <input type="range" id="sliderGamma" min="-180" max="180" value="0" step="1">
          <span class="rot-slider-val" id="valGamma">0°</span>
        </div>
        <button class="rot-reset-btn" id="resetBtn">Reset to identity</button>
      </div>

      <div class="rot-matrix-wrap">
        <div class="rot-matrix-title">R<sup>e</sup><sub>b</sub> — columns are b<sub>i</sub> in {e}</div>
        <div class="rot-matrix-grid" id="matrixGrid">
          <!-- 9 cells filled by JS -->
        </div>
      </div>

      <div class="rot-transform-wrap">
        <div class="rot-transform-title">Vector transform: x<sup>e</sup> = R · x<sup>b</sup></div>
        <div class="rot-transform-row">
          <div class="rot-vec">
            <div class="rot-vec-cell"><input id="vb0" type="number" value="1" step="0.1"></div>
            <div class="rot-vec-cell"><input id="vb1" type="number" value="0" step="0.1"></div>
            <div class="rot-vec-cell"><input id="vb2" type="number" value="0" step="0.1"></div>
            <div class="rot-vec-label">x<sup>b</sup></div>
          </div>
          <div>
            <div class="rot-op">→</div>
          </div>
          <div class="rot-vec">
            <div class="rot-vec-cell" id="ve0">—</div>
            <div class="rot-vec-cell" id="ve1">—</div>
            <div class="rot-vec-cell" id="ve2">—</div>
            <div class="rot-vec-label">x<sup>e</sup></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="rot-demo-hint">Drag the sliders to rotate frame {b} relative to {e} using ZYX Euler angles. The matrix columns (colour-coded red/green/blue for b₁/b₂/b₃) update live. Edit x<sup>b</sup> to see the transformed vector.</p>
</div>

<script>
(function () {
  /* ── helpers ── */
  const deg = a => a * Math.PI / 180;
  const fmt = v => v.toFixed(2);

  /* ZYX Euler: Rz(α) · Ry(β) · Rx(γ) */
  function eulerToMatrix(alpha, beta, gamma) {
    const ca = Math.cos(deg(alpha)), sa = Math.sin(deg(alpha));
    const cb = Math.cos(deg(beta)),  sb = Math.sin(deg(beta));
    const cg = Math.cos(deg(gamma)), sg = Math.sin(deg(gamma));
    return [
      ca*cb,  ca*sb*sg - sa*cg,  ca*sb*cg + sa*sg,
      sa*cb,  sa*sb*sg + ca*cg,  sa*sb*cg - ca*sg,
      -sb,    cb*sg,             cb*cg
    ];
  }

  /* ── sliders ── */
  let alpha = 0, beta = 0, gamma = 0;
  const sA = document.getElementById('sliderAlpha');
  const sB = document.getElementById('sliderBeta');
  const sG = document.getElementById('sliderGamma');
  const vA = document.getElementById('valAlpha');
  const vB = document.getElementById('valBeta');
  const vG = document.getElementById('valGamma');

  sA.addEventListener('input', () => { alpha = +sA.value; vA.textContent = alpha + '°'; update(); });
  sB.addEventListener('input', () => { beta  = +sB.value; vB.textContent = beta  + '°'; update(); });
  sG.addEventListener('input', () => { gamma = +sG.value; vG.textContent = gamma + '°'; update(); });
  document.getElementById('resetBtn').addEventListener('click', () => {
    sA.value = sB.value = sG.value = 0;
    alpha = beta = gamma = 0;
    vA.textContent = vB.textContent = vG.textContent = '0°';
    update();
  });

  /* ── matrix display ── */
  const grid = document.getElementById('matrixGrid');
  const colClass = ['col-1','col-2','col-3'];
  // create 9 cells, row-major but colour by column
  const cells = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const d = document.createElement('div');
      d.className = 'rot-cell ' + colClass[c];
      grid.appendChild(d);
      cells.push(d);
    }
  }

  function updateMatrix(R) {
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        cells[r*3+c].textContent = fmt(R[r*3+c]);
  }

  /* ── vector transform ── */
  const vbInputs = [document.getElementById('vb0'), document.getElementById('vb1'), document.getElementById('vb2')];
  const veEls    = [document.getElementById('ve0'),  document.getElementById('ve1'),  document.getElementById('ve2')];
  vbInputs.forEach(el => el.addEventListener('input', update));

  function updateVec(R) {
    const xb = vbInputs.map(el => +el.value || 0);
    for (let r = 0; r < 3; r++) {
      const v = R[r*3]*xb[0] + R[r*3+1]*xb[1] + R[r*3+2]*xb[2];
      veEls[r].textContent = fmt(v);
    }
  }

  /* ── canvas 3D ── */
  const canvas = document.getElementById('rotCanvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width  = rect.width  * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  window.addEventListener('resize', () => { resize(); drawScene(eulerToMatrix(alpha, beta, gamma)); });
  resize();

  /* isometric-style projection */
  function project(x, y, z, W, H, scale) {
    /* simple oblique projection tilted for readability */
    const px = W/2 + scale*(x - z*0.45);
    const py = H/2 + scale*(-y + z*0.25);
    return [px, py];
  }

  const AXIS_COLORS = {
    e: ['#e05252','#4caf76','#4a9ede'],
    b: ['#f48080','#6dcf96','#70b8f0']
  };

  function drawArrow(ctx, x0, y0, x1, y1, color, label, dashed) {
    const dx = x1-x0, dy = y1-y0;
    const len = Math.sqrt(dx*dx+dy*dy);
    if (len < 1) return;
    const ux = dx/len, uy = dy/len;
    const headLen = 9, headAng = 0.42;
    ctx.beginPath();
    if (dashed) ctx.setLineDash([4,3]); else ctx.setLineDash([]);
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = dashed ? 1.5 : 2;
    ctx.stroke();
    ctx.setLineDash([]);
    /* arrowhead */
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - headLen*(ux*Math.cos(headAng)-uy*Math.sin(headAng)),
               y1 - headLen*(uy*Math.cos(headAng)+ux*Math.sin(headAng)));
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - headLen*(ux*Math.cos(-headAng)-uy*Math.sin(-headAng)),
               y1 - headLen*(uy*Math.cos(-headAng)+ux*Math.sin(-headAng)));
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    /* label */
    if (label) {
      ctx.fillStyle = color;
      ctx.font = '600 11px JetBrains Mono, Fira Code, monospace';
      ctx.fillText(label, x1 + ux*6 + 3, y1 + uy*6 + 4);
    }
  }

  function drawScene(R) {
    const W = canvas.width  / devicePixelRatio;
    const H = canvas.height / devicePixelRatio;
    const scale = Math.min(W, H) * 0.28;

    ctx.clearRect(0, 0, W, H);

    /* subtle grid */
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#e5e5e5';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 6]);
    for (let g = -2; g <= 2; g++) {
      const [ax, ay] = project(g, 0, -2, W, H, scale);
      const [bx, by] = project(g, 0,  2, W, H, scale);
      ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
      const [cx, cy] = project(-2, 0, g, W, H, scale);
      const [dx, dy] = project( 2, 0, g, W, H, scale);
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(dx,dy); ctx.stroke();
    }
    ctx.setLineDash([]);

    /* fixed frame {e} */
    const eAxes = [[1,0,0],[0,1,0],[0,0,1]];
    const eLabels = ['e₁','e₂','e₃'];
    const eColors = AXIS_COLORS.e;
    eAxes.forEach(([x,y,z], i) => {
      const [ox,oy] = project(0,0,0, W,H,scale);
      const [ax,ay] = project(x,y,z, W,H,scale);
      drawArrow(ctx, ox, oy, ax, ay, eColors[i], eLabels[i], false);
    });

    /* body frame {b} — columns of R */
    const bColors = AXIS_COLORS.b;
    const bLabels = ['b₁','b₂','b₃'];
    for (let c = 0; c < 3; c++) {
      const bx = R[0*3+c], by = R[1*3+c], bz = R[2*3+c];
      const [ox,oy] = project(0,0,0, W,H,scale);
      const [ax,ay] = project(bx,by,bz, W,H,scale);
      drawArrow(ctx, ox, oy, ax, ay, bColors[c], bLabels[c], true);
    }

    /* origin dot */
    const [ox,oy] = project(0,0,0,W,H,scale);
    ctx.beginPath();
    ctx.arc(ox,oy,3,0,Math.PI*2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#111';
    ctx.fill();

    /* legend */
    ctx.font = '500 10px JetBrains Mono, Fira Code, monospace';
    const legendY = H - 12;
    ctx.fillStyle = eColors[0]; ctx.fillText('— {e} frame', 10, legendY - 14);
    ctx.fillStyle = bColors[0]; ctx.fillText('⋯ {b} frame', 10, legendY);
  }

  /* ── main update ── */
  function update() {
    const R = eulerToMatrix(alpha, beta, gamma);
    drawScene(R);
    updateMatrix(R);
    updateVec(R);
  }

  update();
})();
</script>

## Verifying the Result

Given a valid $$R^e_b$$, one can verify the $$SO(3)$$ conditions numerically:

$$R^T R = I \quad \Longleftrightarrow \quad \text{columns are orthonormal},$$
$$\det(R) = +1 \quad \Longleftrightarrow \quad \text{proper rotation (no reflection)}.$$

For the example in the figure:

$$R^e_b = \begin{bmatrix} 0 & 0 & -1 \\ 0 & -1 & 0 \\ -1 & 0 & 0 \end{bmatrix}, \qquad \det(R^e_b) = (-1)\bigl[0\cdot 0 - (-1)(-1)\bigr] = (-1)(-1) = +1. \checkmark$$

Checking orthogonality, $$R^T R = I$$ holds since each column is a standard basis vector (up to sign), which are trivially orthonormal.