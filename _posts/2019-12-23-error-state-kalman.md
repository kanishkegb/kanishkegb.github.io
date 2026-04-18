---
layout: post
title: "Error-State Extended Kalman Filter for GNSS/INS Navigation"
tags: [navigation, kalman-filter, inertial, gnss, SO3]
excerpt: "A detailed walkthrough of the error-state EKF with SO(3) attitude, ECEF-frame INS propagation, and GPS PVT corrections — including an interactive visualization of how covariance shapes the Kalman gain."
---

This post builds up the error-state extended Kalman filter (ES-EKF) used in tightly-coupled GNSS/INS navigation. The treatment assumes familiarity with the vanilla EKF and basic Lie group concepts. We work entirely in the Earth-Centered Earth-Fixed (ECEF) frame, which is natural for GPS receivers and avoids the singularities of geodetic coordinates during propagation.

---

## 1. Why an Error-State Filter?

The inertial navigation equations are nonlinear. One approach is to linearize them directly and run an EKF on the full state. The error-state formulation instead integrates the nonlinear equations **nominally** (high-rate, open-loop) and runs the Kalman filter only on the *small perturbations* from that nominal trajectory. This buys two things:

1. The error dynamics are much closer to linear, so EKF linearization errors are smaller.
2. The attitude lives on SO(3), a Lie group. Representing it as a rotation matrix and evolving it on the manifold avoids gimbal lock and keeps the state geometrically consistent. The error state for attitude is a 3-vector in the Lie algebra $$\mathfrak{so}(3)$$, not a redundant parameterization.

---

## 2. State Definition

### 2.1 Nominal State

The nominal (true) state at time $$t$$ is:

$$
\mathbf{x} = \begin{bmatrix} \mathbf{p} \\ \mathbf{v} \\ \mathbf{R} \\ \mathbf{b}_g \\ \mathbf{b}_a \end{bmatrix}
$$

where $$\mathbf{p} \in \mathbb{R}^3$$ and $$\mathbf{v} \in \mathbb{R}^3$$ are position and velocity in ECEF, $$\mathbf{R} \in SO(3)$$ is the rotation from body frame to ECEF, and $$\mathbf{b}_g, \mathbf{b}_a \in \mathbb{R}^3$$ are gyroscope and accelerometer biases in the body frame.

### 2.2 Error State

The error state $$\delta\mathbf{x} \in \mathbb{R}^{15}$$ is:

$$
\delta\mathbf{x} = \begin{bmatrix} \delta\mathbf{p} \\ \delta\mathbf{v} \\ \boldsymbol{\phi} \\ \delta\mathbf{b}_g \\ \delta\mathbf{b}_a \end{bmatrix}
$$

Position and velocity errors are the usual Euclidean differences: $$\delta\mathbf{p} = \mathbf{p}_{\text{true}} - \hat{\mathbf{p}}$$, $$\delta\mathbf{v} = \mathbf{v}_{\text{true}} - \hat{\mathbf{v}}$$.

The **attitude error** $$\boldsymbol{\phi} \in \mathbb{R}^3$$ lives in the tangent space of SO(3) at the estimate $$\hat{\mathbf{R}}$$. It is defined via the left perturbation:

$$
\mathbf{R}_{\text{true}} = \exp(\boldsymbol{\phi}^\times) \, \hat{\mathbf{R}}
$$

where $$(\cdot)^\times : \mathbb{R}^3 \to \mathfrak{so}(3)$$ is the skew-symmetric map and $$\exp : \mathfrak{so}(3) \to SO(3)$$ is the matrix exponential. For small $$\boldsymbol{\phi}$$, $$\exp(\boldsymbol{\phi}^\times) \approx \mathbf{I} + \boldsymbol{\phi}^\times$$.

Bias errors are again Euclidean: $$\delta\mathbf{b}_g = \mathbf{b}_{g,\text{true}} - \hat{\mathbf{b}}_g$$, similarly for $$\delta\mathbf{b}_a$$.

---

## 3. Nominal State Propagation (IMU Integration)

Let $$\tilde{\boldsymbol{\omega}}$$ and $$\tilde{\mathbf{a}}$$ be the raw gyroscope and accelerometer readings. The corrected measurements are:

$$
\boldsymbol{\omega} = \tilde{\boldsymbol{\omega}} - \hat{\mathbf{b}}_g - \boldsymbol{\eta}_g, \qquad
\mathbf{a} = \tilde{\mathbf{a}} - \hat{\mathbf{b}}_a - \boldsymbol{\eta}_a
$$

where $$\boldsymbol{\eta}_g, \boldsymbol{\eta}_a$$ are zero-mean white noise. The continuous-time nominal equations in ECEF are:

$$
\dot{\mathbf{p}} = \mathbf{v}
$$

$$
\dot{\mathbf{v}} = \hat{\mathbf{R}} \, \mathbf{a} + \mathbf{g}_e(\mathbf{p}) - 2\boldsymbol{\Omega}_e \times \mathbf{v}
$$

$$
\dot{\mathbf{R}} = \mathbf{R} \, \boldsymbol{\omega}^\times
$$

$$
\dot{\mathbf{b}}_g = \boldsymbol{\eta}_{bg}, \qquad \dot{\mathbf{b}}_a = \boldsymbol{\eta}_{ba}
$$

Here $$\mathbf{g}_e(\mathbf{p})$$ is the ECEF gravity vector (including centrifugal relief) and $$\boldsymbol{\Omega}_e = [0, 0, \omega_e]^\top$$ is the Earth rotation vector. In discrete time at rate $$\Delta t$$ (typically 100–400 Hz for tactical IMUs), the rotation update is:

$$
\hat{\mathbf{R}}_{k+1} = \hat{\mathbf{R}}_k \, \exp(\boldsymbol{\omega}_k^\times \Delta t)
$$

computed via Rodrigues' formula for numerical exactness.

---

## 4. Error-State Dynamics

Perturbing the nominal equations and keeping first-order terms gives the linear error-state system:

$$
\delta\dot{\mathbf{x}} = \mathbf{F}\,\delta\mathbf{x} + \mathbf{G}\,\mathbf{n}
$$

The continuous-time system matrix $$\mathbf{F} \in \mathbb{R}^{15\times15}$$ has the structure:

$$
\mathbf{F} = \begin{bmatrix}
\mathbf{0} & \mathbf{I} & \mathbf{0} & \mathbf{0} & \mathbf{0} \\
\mathbf{0} & -2\boldsymbol{\Omega}_e^\times & -(\hat{\mathbf{R}}\mathbf{a})^\times & \mathbf{0} & -\hat{\mathbf{R}} \\
\mathbf{0} & \mathbf{0} & -\boldsymbol{\omega}^\times & -\mathbf{I} & \mathbf{0} \\
\mathbf{0} & \mathbf{0} & \mathbf{0} & -\frac{1}{\tau_g}\mathbf{I} & \mathbf{0} \\
\mathbf{0} & \mathbf{0} & \mathbf{0} & \mathbf{0} & -\frac{1}{\tau_a}\mathbf{I}
\end{bmatrix}
$$

Key couplings to note:

- **Velocity ← Attitude**: $$-(\hat{\mathbf{R}}\mathbf{a})^\times$$ — attitude error rotates the specific force into velocity error.
- **Attitude ← Gyro bias**: $$-\mathbf{I}$$ — uncompensated gyro bias drives attitude drift.
- **Velocity ← Accel bias**: $$-\hat{\mathbf{R}}$$ — uncompensated accel bias drives velocity error after rotation into ECEF.

The bias models use first-order Gauss–Markov with time constants $$\tau_g, \tau_a$$ (set $$\tau \to \infty$$ for a random walk model).

The noise input matrix $$\mathbf{G} \in \mathbb{R}^{15 \times 12}$$ maps $$\mathbf{n} = [\boldsymbol{\eta}_g, \boldsymbol{\eta}_a, \boldsymbol{\eta}_{bg}, \boldsymbol{\eta}_{ba}]^\top$$:

$$
\mathbf{G} = \begin{bmatrix}
\mathbf{0} & \mathbf{0} & \mathbf{0} & \mathbf{0} \\
\mathbf{0} & -\hat{\mathbf{R}} & \mathbf{0} & \mathbf{0} \\
-\mathbf{I} & \mathbf{0} & \mathbf{0} & \mathbf{0} \\
\mathbf{0} & \mathbf{0} & \mathbf{I} & \mathbf{0} \\
\mathbf{0} & \mathbf{0} & \mathbf{0} & \mathbf{I}
\end{bmatrix}
$$

### 4.1 Discrete-Time Propagation

The covariance propagation step uses the discrete transition matrix $$\mathbf{\Phi}_k \approx \mathbf{I} + \mathbf{F}\Delta t + \frac{1}{2}\mathbf{F}^2\Delta t^2$$ (Van Loan's method gives a more accurate approximation of the process noise integral):

$$
\mathbf{P}_{k+1}^- = \mathbf{\Phi}_k \, \mathbf{P}_k^+ \, \mathbf{\Phi}_k^\top + \mathbf{Q}_k
$$

where $$\mathbf{Q}_k = \int_0^{\Delta t} \mathbf{\Phi}(\tau) \mathbf{G} \mathbf{Q}_c \mathbf{G}^\top \mathbf{\Phi}(\tau)^\top d\tau$$ and $$\mathbf{Q}_c = \text{diag}(\sigma_g^2 \mathbf{I}, \sigma_a^2 \mathbf{I}, \sigma_{bg}^2 \mathbf{I}, \sigma_{ba}^2 \mathbf{I})$$.

---

## 5. GPS PVT Measurement Update

A GPS receiver provides position and velocity in ECEF at typically 1–10 Hz. The measurement vector is:

$$
\mathbf{z}_k = \begin{bmatrix} \mathbf{p}_{\text{GPS}} \\ \mathbf{v}_{\text{GPS}} \end{bmatrix} \in \mathbb{R}^6
$$

The measurement model relating the *true* state to the observation is:

$$
\mathbf{z}_k = \begin{bmatrix} \mathbf{p}_{\text{true}} \\ \mathbf{v}_{\text{true}} \end{bmatrix} + \boldsymbol{\eta}_{\text{GPS}}
$$

where $$\boldsymbol{\eta}_{\text{GPS}} \sim \mathcal{N}(\mathbf{0}, \mathbf{R}_k)$$ and $$\mathbf{R}_k \in \mathbb{R}^{6\times6}$$ is the GPS noise covariance (typically diagonal, sourced from the receiver's DOP and reported accuracy).

The innovation (residual) is formed against the **nominal** estimate:

$$
\tilde{\mathbf{z}}_k = \mathbf{z}_k - \begin{bmatrix} \hat{\mathbf{p}}_k^- \\ \hat{\mathbf{v}}_k^- \end{bmatrix}
$$

The observation matrix $$\mathbf{H} \in \mathbb{R}^{6\times15}$$ maps error states to the innovation:

$$
\mathbf{H} = \begin{bmatrix}
\mathbf{I}_{3} & \mathbf{0} & \mathbf{0} & \mathbf{0} & \mathbf{0} \\
\mathbf{0} & \mathbf{I}_{3} & \mathbf{0} & \mathbf{0} & \mathbf{0}
\end{bmatrix}
$$

Note that attitude, gyro bias, and accel bias are **unobservable** from GPS PVT alone — they are excited only indirectly through velocity error coupling in $$\mathbf{F}$$.

### 5.1 Kalman Gain and Correction

The innovation covariance is:

$$
\mathbf{S}_k = \mathbf{H} \, \mathbf{P}_k^- \, \mathbf{H}^\top + \mathbf{R}_k
$$

The Kalman gain:

$$
\mathbf{K}_k = \mathbf{P}_k^- \, \mathbf{H}^\top \, \mathbf{S}_k^{-1}
$$

The error-state estimate and covariance updates:

$$
\delta\hat{\mathbf{x}}_k = \mathbf{K}_k \, \tilde{\mathbf{z}}_k
$$

$$
\mathbf{P}_k^+ = (\mathbf{I} - \mathbf{K}_k \mathbf{H}) \, \mathbf{P}_k^-
$$

(Joseph form is preferred numerically: $$\mathbf{P}_k^+ = (\mathbf{I} - \mathbf{K}_k \mathbf{H}) \mathbf{P}_k^- (\mathbf{I} - \mathbf{K}_k \mathbf{H})^\top + \mathbf{K}_k \mathbf{R}_k \mathbf{K}_k^\top$$.)

### 5.2 Injection into the Nominal State (SO(3) Correction)

The estimated error state is injected back into the nominal trajectory and then reset to zero:

$$
\hat{\mathbf{p}}^+ = \hat{\mathbf{p}}^- + \delta\hat{\mathbf{p}}
$$

$$
\hat{\mathbf{v}}^+ = \hat{\mathbf{v}}^- + \delta\hat{\mathbf{v}}
$$

$$
\hat{\mathbf{R}}^+ = \exp(\boldsymbol{\hat{\phi}}^\times) \, \hat{\mathbf{R}}^-
$$

$$
\hat{\mathbf{b}}_g^+ = \hat{\mathbf{b}}_g^- + \delta\hat{\mathbf{b}}_g, \qquad \hat{\mathbf{b}}_a^+ = \hat{\mathbf{b}}_a^- + \delta\hat{\mathbf{b}}_a
$$

The attitude update $$\exp(\boldsymbol{\hat{\phi}}^\times)\hat{\mathbf{R}}^-$$ is a group operation that keeps $$\hat{\mathbf{R}}^+ \in SO(3)$$ exactly — no orthonormalization needed. After injection, the error state is reset to zero (the covariance $$\mathbf{P}^+$$ already reflects this).

---

## 6. The Geometry of the Kalman Gain

The gain $$\mathbf{K} = \mathbf{P}^- \mathbf{H}^\top \mathbf{S}^{-1}$$ mediates a competition between two sources of uncertainty: **prior state uncertainty** (encoded in $$\mathbf{P}^-$$) and **measurement uncertainty** (encoded in $$\mathbf{R}$$). The interactive demo below makes this concrete for a 2D position-only case.

<div class="ekf-viz-container">
  <div class="ekf-viz-controls">
    <div class="ekf-ctrl-group">
      <label>Prior σ<sub>x</sub> (m)</label>
      <input type="range" id="sig-px" min="1" max="50" value="20" step="1">
      <span class="ekf-val" id="val-px">20</span>
    </div>
    <div class="ekf-ctrl-group">
      <label>Prior σ<sub>y</sub> (m)</label>
      <input type="range" id="sig-py" min="1" max="50" value="10" step="1">
      <span class="ekf-val" id="val-py">10</span>
    </div>
    <div class="ekf-ctrl-group">
      <label>Prior ρ<sub>xy</sub></label>
      <input type="range" id="rho-p" min="-80" max="80" value="50" step="5">
      <span class="ekf-val" id="val-rho">0.50</span>
    </div>
    <div class="ekf-ctrl-group">
      <label>GPS σ<sub>x</sub> (m)</label>
      <input type="range" id="sig-mx" min="1" max="30" value="5" step="1">
      <span class="ekf-val" id="val-mx">5</span>
    </div>
    <div class="ekf-ctrl-group">
      <label>GPS σ<sub>y</sub> (m)</label>
      <input type="range" id="sig-my" min="1" max="30" value="15" step="1">
      <span class="ekf-val" id="val-my">15</span>
    </div>
    <div class="ekf-viz-legend">
      <span class="ekf-dot prior-dot"></span> Prior &nbsp;
      <span class="ekf-dot meas-dot"></span> GPS meas. &nbsp;
      <span class="ekf-dot post-dot"></span> Posterior
    </div>
  </div>
  <canvas id="ekf-canvas" width="520" height="420"></canvas>
  <div class="ekf-gain-display" id="gain-display"></div>
</div>

<script>
(function() {
  const canvas = document.getElementById('ekf-canvas');
  const ctx    = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const scale = 4; // pixels per metre

  function getCSS(v) {
    return getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  }

  function ellipsePoints(cov, nSig) {
    // Eigendecompose 2x2 covariance, return parametric ellipse points
    const a = cov[0][0], b = cov[0][1], d = cov[1][1];
    const tr = a + d, det2 = a*d - b*b;
    const l1 = tr/2 + Math.sqrt(Math.max(0, tr*tr/4 - det2));
    const l2 = tr/2 - Math.sqrt(Math.max(0, tr*tr/4 - det2));
    let angle = 0;
    if (Math.abs(b) > 1e-9 || Math.abs(a - l1) > 1e-9) {
      angle = Math.atan2(l1 - a, b);
    }
    const r1 = nSig * Math.sqrt(Math.max(0, l1));
    const r2 = nSig * Math.sqrt(Math.max(0, l2));
    const pts = [];
    for (let t = 0; t <= 2*Math.PI; t += 0.05) {
      const ex = r1 * Math.cos(t) * Math.cos(angle) - r2 * Math.sin(t) * Math.sin(angle);
      const ey = r1 * Math.cos(t) * Math.sin(angle) + r2 * Math.sin(t) * Math.cos(angle);
      pts.push([cx + ex*scale, cy - ey*scale]);
    }
    return pts;
  }

  function drawEllipse(pts, strokeColor, fillColor) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.8;
    ctx.stroke();
  }

  function matMul22(A, B) {
    return [
      [A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]],
      [A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]]
    ];
  }
  function inv22(M) {
    const d = M[0][0]*M[1][1] - M[0][1]*M[1][0];
    return [[M[1][1]/d, -M[0][1]/d],[-M[1][0]/d, M[0][0]/d]];
  }
  function sub22(A,B) { return [[A[0][0]-B[0][0],A[0][1]-B[0][1]],[A[1][0]-B[1][0],A[1][1]-B[1][1]]]; }
  function add22(A,B) { return [[A[0][0]+B[0][0],A[0][1]+B[0][1]],[A[1][0]+B[1][0],A[1][1]+B[1][1]]]; }

  function compute() {
    const sPx = +document.getElementById('sig-px').value;
    const sPy = +document.getElementById('sig-py').value;
    const rho  = +document.getElementById('rho-p').value / 100;
    const sMx = +document.getElementById('sig-mx').value;
    const sMy = +document.getElementById('sig-my').value;

    document.getElementById('val-px').textContent = sPx;
    document.getElementById('val-py').textContent = sPy;
    document.getElementById('val-rho').textContent = (rho >= 0 ? '+' : '') + rho.toFixed(2);
    document.getElementById('val-mx').textContent = sMx;
    document.getElementById('val-my').textContent = sMy;

    // H = I (position-only observation)
    // P_prior
    const P = [
      [sPx*sPx,       rho*sPx*sPy],
      [rho*sPx*sPy,   sPy*sPy]
    ];
    // R
    const R = [[sMx*sMx, 0],[0, sMy*sMy]];
    // S = H P H^T + R = P + R (H=I)
    const S = add22(P, R);
    const Sinv = inv22(S);
    // K = P H^T S^-1 = P S^-1
    const K = matMul22(P, Sinv);
    // P_post = (I - K H) P = (I - K) P
    const IminusK = [[1-K[0][0], -K[0][1]],[-K[1][0], 1-K[1][1]]];
    const Ppost = matMul22(IminusK, P);

    // Innovation: prior mean at origin, GPS at (+15m, -8m)
    const zx = 15, zy = -8;
    // Correction = K * z
    const dx = K[0][0]*zx + K[0][1]*zy;
    const dy = K[1][0]*zx + K[1][1]*zy;

    return { P, R, Ppost, K, dx, dy, zx, zy };
  }

  function draw() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const bgColor   = isDark ? '#0f0f0f' : '#ffffff';
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const textColor = isDark ? '#888' : '#aaa';

    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,W,H);

    // Grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let x = cx % (10*scale); x < W; x += 10*scale) {
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
    }
    for (let y = cy % (10*scale); y < H; y += 10*scale) {
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(W,cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx,0); ctx.lineTo(cx,H); ctx.stroke();

    // Axis labels
    ctx.fillStyle = textColor;
    ctx.font = '11px monospace';
    ctx.fillText('x (ECEF)', W-60, cy-6);
    ctx.fillText('y (ECEF)', cx+6, 14);
    ctx.fillText('0', cx+4, cy-4);

    const { P, R, Ppost, K, dx, dy, zx, zy } = compute();

    // Prior ellipse (1σ, 2σ)
    for (const ns of [2, 1]) {
      drawEllipse(
        ellipsePoints(P, ns),
        ns===1 ? '#3b82f6' : 'rgba(59,130,246,0.35)',
        ns===1 ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.03)'
      );
    }

    // GPS measurement ellipse (centered at zx, zy)
    const mPts1 = ellipsePoints(R, 1).map(([px,py]) => [px + zx*scale, py - zy*scale]);
    const mPts2 = ellipsePoints(R, 2).map(([px,py]) => [px + zx*scale, py - zy*scale]);
    drawEllipse(mPts2, 'rgba(249,115,22,0.35)', 'rgba(249,115,22,0.03)');
    drawEllipse(mPts1, '#f97316', 'rgba(249,115,22,0.08)');

    // Posterior ellipse (centered at correction dx, dy)
    const pPts1 = ellipsePoints(Ppost, 1).map(([px,py]) => [px + dx*scale, py - dy*scale]);
    const pPts2 = ellipsePoints(Ppost, 2).map(([px,py]) => [px + dx*scale, py - dy*scale]);
    drawEllipse(pPts2, 'rgba(34,197,94,0.35)', 'rgba(34,197,94,0.05)');
    drawEllipse(pPts1, '#22c55e', 'rgba(34,197,94,0.18)');

    // Dots: prior mean
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, 2*Math.PI);
    ctx.fillStyle = '#3b82f6'; ctx.fill();

    // GPS mean
    ctx.beginPath(); ctx.arc(cx + zx*scale, cy - zy*scale, 5, 0, 2*Math.PI);
    ctx.fillStyle = '#f97316'; ctx.fill();

    // Posterior mean
    ctx.beginPath(); ctx.arc(cx + dx*scale, cy - dy*scale, 6, 0, 2*Math.PI);
    ctx.fillStyle = '#22c55e'; ctx.fill();

    // Arrow: prior to posterior
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + dx*scale, cy - dy*scale);
    ctx.strokeStyle = 'rgba(34,197,94,0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4,3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Arrow: GPS to posterior
    ctx.beginPath();
    ctx.moveTo(cx + zx*scale, cy - zy*scale);
    ctx.lineTo(cx + dx*scale, cy - dy*scale);
    ctx.strokeStyle = 'rgba(249,115,22,0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4,3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Gain display
    const fmt = v => v.toFixed(3);
    document.getElementById('gain-display').innerHTML =
      `<strong>K (position block)</strong><br>` +
      `K = [ [${fmt(K[0][0])}, ${fmt(K[0][1])}],<br>` +
      `&nbsp;&nbsp;&nbsp;&nbsp;[${fmt(K[1][0])}, ${fmt(K[1][1])}] ]<br><br>` +
      `<strong>Correction</strong>&nbsp;&nbsp;δp = K·z = [${fmt(dx)}, ${fmt(dy)}] m<br>` +
      `<strong>Prior trace</strong>&nbsp;&nbsp;tr(P⁻) = ${fmt(P[0][0]+P[1][1])} m²&nbsp;&nbsp;` +
      `<strong>Posterior trace</strong>&nbsp;&nbsp;tr(P⁺) = ${fmt(Ppost[0][0]+Ppost[1][1])} m²`;
  }

  ['sig-px','sig-py','rho-p','sig-mx','sig-my'].forEach(id => {
    document.getElementById(id).addEventListener('input', draw);
  });

  // Redraw on theme toggle
  const observer = new MutationObserver(draw);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  draw();
})();
</script>

**Reading the diagram.** The blue ellipse is the prior $$1\sigma/2\sigma$$ uncertainty from IMU propagation; the orange ellipse is the GPS measurement uncertainty centered at the GPS fix; the green ellipse is the posterior after the correction step. Observe that:

- When prior uncertainty **≫** GPS uncertainty, $$\mathbf{K} \approx \mathbf{I}$$ and the posterior collapses near the GPS measurement.
- When GPS uncertainty **≫** prior uncertainty, $$\mathbf{K} \approx \mathbf{0}$$ and the prior is barely updated.
- **Off-diagonal terms in $$\mathbf{P}$$** (controlled by $$\rho_{xy}$$) rotate the posterior ellipse; the correction in the un-observed direction is pulled along the correlation axis.

The last point is central to ES-EKF: even though GPS observes only position and velocity directly, the off-diagonal blocks of $$\mathbf{P}$$ propagate corrections into attitude and bias states indirectly.

---

## 7. Observability Considerations

With GPS PVT as the only aiding source, the system has an **unobservable subspace**. A pure PVT update is rank-6 in a 15-dimensional state space. Specifically:

- **Heading** (yaw about the local vertical, or more precisely the component of $$\boldsymbol{\phi}$$ aligned with gravity) is unobservable from PVT during straight-and-level flight. It becomes observable during coordinated maneuvers where the specific force is not aligned with the vertical.
- **Gyro bias** components about the observable attitude axes are indirectly estimated over time through error accumulation — but convergence is slow without dynamic maneuvers.
- **Accel bias** in the vertical direction is confounded with gravity uncertainty.

The covariance will reflect this: unobservable modes grow with time (driven by $$\mathbf{Q}$$) and are not reduced by GPS updates. A well-tuned filter will not diverge — the $$\mathbf{P}$$ simply grows appropriately — but the practitioner should be wary of optimistic convergence in simulation when the trajectory is insufficiently exciting.

---

## 8. Summary

The ES-EKF with SO(3) attitude cleanly separates the deterministic nonlinear INS propagation from the stochastic estimation problem. The key design decisions are:

1. **Choose the left perturbation convention** $$\mathbf{R}_{\text{true}} = \exp(\boldsymbol{\phi}^\times)\hat{\mathbf{R}}$$ consistently throughout — the linearization of the attitude kinematics and the injection step must use the same convention.
2. **Work in ECEF throughout** to avoid frame conversion errors and to keep the GPS measurement model trivial ($$\mathbf{H}$$ is sparse).
3. **Use the Joseph form** for covariance update to maintain symmetry and positive definiteness under finite-precision arithmetic.
4. **Monitor the innovation sequence** $$\tilde{\mathbf{z}}_k \sim \mathcal{N}(\mathbf{0}, \mathbf{S}_k)$$ for whiteness and normalized magnitude — this is your primary diagnostic for filter consistency.

The architecture extends naturally to multi-constellation GNSS, GNSS-denied intervals (pure INS dead-reckoning with growing $$\mathbf{P}$$), and additional aiding sources such as barometric altitude or magnetometers, each adding rows to $$\mathbf{H}$$ and entries to $$\mathbf{R}$$.

---

*Further reading: Titterton & Weston, "Strapdown Inertial Navigation Technology"; Groves, "Principles of GNSS, Inertial, and Multisensor Integrated Navigation Systems"; Chirikjian, "Stochastic Models, Information Theory, and Lie Groups."*

<style>

  .ekf-viz-container {
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  background: var(--bg-alt);
  padding: 1.5rem;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ekf-viz-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  align-items: center;
}

.ekf-ctrl-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.ekf-ctrl-group label {
  min-width: 90px;
  color: var(--text);
}

.ekf-ctrl-group input[type=range] {
  width: 110px;
  accent-color: var(--accent);
}

.ekf-val {
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', monospace;
  color: var(--accent);
  min-width: 36px;
}

.ekf-viz-legend {
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}

.ekf-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid;
}

.prior-dot { border-color: #3b82f6; background: rgba(59,130,246,0.15); }
.meas-dot  { border-color: #f97316; background: rgba(249,115,22,0.15); }
.post-dot  { border-color: #22c55e; background: rgba(34,197,94,0.25); }

#ekf-canvas {
  border-radius: var(--radius);
  background: var(--bg);
  border: 1px solid var(--border);
  width: 100%;
  height: auto;
  display: block;
}

.ekf-gain-display {
  font-size: 0.78rem;
  font-family: 'JetBrains Mono', monospace;
  color: var(--text-muted);
  line-height: 1.7;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
}

</style>