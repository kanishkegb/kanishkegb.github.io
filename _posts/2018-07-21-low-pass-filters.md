---
layout: post
title: "Low-Pass Filters"
tags: [filters, signal-processing, tutorials]
excerpt: "A first-order low-pass filter passes low-frequency signals while attenuating high-frequency noise. This post derives the discrete-time update equation, explains the role of the smoothing factor α, and provides an interactive demo."
---

Low-pass filters are a natural extension of [averaging filters](https://kanishkegb.github.io/averaging-filters/).
If you are unfamiliar with averaging filters, it is worth reviewing them first, as the motivation here builds directly on those ideas.

## Motivation

Sensor measurements are rarely clean.
In practice, noise tends to occupy the high-frequency portion of a signal's spectrum, while the true underlying state evolves slowly at low frequencies.
A low-pass filter is designed precisely for this situation: it passes low-frequency content while attenuating high-frequency components, hence the name.

The moving average filter is one simple example, but it assigns equal weight to all past measurements.
This is inefficient: a measurement from ten samples ago should carry less information about the *current* state than a measurement from one sample ago.
The low-pass filter addresses this by weighting the most recent measurement more heavily.

## Discrete-Time Update Equation

The first-order discrete-time low-pass filter is:

$$\hat{x}_k = \alpha \cdot \hat{x}_{k-1} + (1 - \alpha) \cdot z_k, \qquad 0 < \alpha < 1$$

where $$\hat{x}_k$$ is the filtered estimate at time step $$k$$, $$z_k$$ is the raw measurement, and $$\alpha$$ is the *smoothing factor*.

The equation is a convex combination of the previous estimate and the new measurement.
Expanding it recursively reveals that the filter is an infinite impulse response (IIR) filter whose weights decay geometrically:

$$\hat{x}_k = (1 - \alpha) \sum_{i=0}^{k} \alpha^i \cdot z_{k-i}$$

Each past measurement contributes, but with exponentially diminishing influence.

**Note on notation.** Some texts write the equation as $$\hat{x}_k = \alpha \cdot z_k + (1-\alpha) \cdot \hat{x}_{k-1}$$, which is identical — just with $$\alpha$$ and $$(1-\alpha)$$ swapped in meaning.
Always verify which convention a reference is using before implementing.

## Role of the Smoothing Factor α

The scalar $$\alpha$$ governs the trade-off between noise rejection and tracking speed:

- **$$\alpha \to 1$$**: the filter "trusts" its own previous estimate almost entirely, resulting in heavy smoothing but significant lag when the true signal changes.
- **$$\alpha \to 0$$**: the filter adopts each new measurement almost immediately, reducing lag but admitting more noise.

Neither extreme is desirable in practice. The appropriate value depends on the noise characteristics of the sensor and the dynamics of the system being observed.

## Continuous-Time Transfer Function

In the Laplace domain, the equivalent first-order low-pass filter has the transfer function:

$$\frac{Y(s)}{X(s)} = \frac{1}{\tau s + 1}$$

where $$\tau$$ is the *time constant*.
The cutoff frequency is $$f_c = \frac{1}{2\pi\tau}$$ Hz.
Signals at frequencies well below $$f_c$$ pass with near-unity gain; signals well above $$f_c$$ are attenuated at $$-20\,\text{dB/dec}$$.

The discrete-time smoothing factor relates to the continuous-time cutoff frequency and sample period $$T_s$$ as:

$$\alpha = \frac{\tau}{\tau + T_s} = \frac{1}{1 + 2\pi f_c T_s}$$

This provides a principled way to choose $$\alpha$$ from physical specifications rather than by trial and error.

## Interactive Demo

The plot below simulates a noisy sinusoidal signal and applies the first-order low-pass filter.
Adjust $$\alpha$$ to observe how the smoothing factor affects the filtered output.

<div class="lp-demo">
  <div class="lp-controls">
    <label for="lp-alpha">Smoothing factor &alpha; = <span id="lp-alpha-val">0.85</span></label>
    <input type="range" id="lp-alpha" min="0.01" max="0.99" step="0.01" value="0.85">
  </div>
  <canvas id="lp-canvas"></canvas>
  <p class="lp-hint">Blue — noisy measurement &nbsp;|&nbsp; Orange — filtered estimate</p>
</div>

<style>
.lp-demo {
  margin: 2rem 0;
  padding: 1.25rem 1.5rem;
  background: var(--bg-alt);
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
}

.lp-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text);
}

.lp-controls input[type="range"] {
  width: 100%;
  max-width: 360px;
  accent-color: var(--accent);
  cursor: pointer;
}

#lp-canvas {
  width: 100%;
  height: 260px;
  display: block;
  border-radius: var(--radius);
}

.lp-hint {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 0.75rem;
  margin-bottom: 0;
}
</style>

<script>
(function () {
  const canvas = document.getElementById('lp-canvas');
  const ctx = canvas.getContext('2d');
  const slider = document.getElementById('lp-alpha');
  const alphaLabel = document.getElementById('lp-alpha-val');

  const N = 200;
  const dt = 0.05;

  // Generate fixed noisy signal once
  const raw = [];
  for (let i = 0; i < N; i++) {
    const t = i * dt;
    raw.push(Math.sin(2 * Math.PI * 0.3 * t) + (Math.random() - 0.5) * 1.2);
  }

  function applyFilter(alpha) {
    const out = [raw[0]];
    for (let i = 1; i < N; i++) {
      out.push(alpha * out[i - 1] + (1 - alpha) * raw[i]);
    }
    return out;
  }

  function getColors() {
    const style = getComputedStyle(document.documentElement);
    return {
      bg:      style.getPropertyValue('--bg-alt').trim()      || '#f5f5f5',
      border:  style.getPropertyValue('--border').trim()      || '#e5e5e5',
      muted:   style.getPropertyValue('--text-muted').trim()  || '#737373',
      text:    style.getPropertyValue('--text').trim()        || '#111111',
      accent:  style.getPropertyValue('--accent').trim()      || '#0070f3',
    };
  }

  function draw() {
    const alpha = parseFloat(slider.value);
    alphaLabel.textContent = alpha.toFixed(2);
    const filtered = applyFilter(alpha);
    const c = getColors();

    // HiDPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    const pad = { top: 20, right: 20, bottom: 36, left: 44 };
    const plotW = W - pad.left - pad.right;
    const plotH = H - pad.top  - pad.bottom;

    const allVals = raw.concat(filtered);
    const yMin = Math.min(...allVals) - 0.2;
    const yMax = Math.max(...allVals) + 0.2;

    const xScale = (i) => pad.left + (i / (N - 1)) * plotW;
    const yScale = (v) => pad.top  + (1 - (v - yMin) / (yMax - yMin)) * plotH;

    // Background
    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = c.border;
    ctx.lineWidth = 0.75;
    for (let g = 0; g <= 4; g++) {
      const y = pad.top + (g / 4) * plotH;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + plotW, y); ctx.stroke();
      const val = yMax - (g / 4) * (yMax - yMin);
      ctx.fillStyle = c.muted;
      ctx.font = `${10}px Inter, sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillText(val.toFixed(1), pad.left - 6, y + 3.5);
    }

    // X-axis ticks
    ctx.fillStyle = c.muted;
    ctx.textAlign = 'center';
    for (let g = 0; g <= 4; g++) {
      const x = pad.left + (g / 4) * plotW;
      const t = ((g / 4) * (N - 1) * dt).toFixed(1);
      ctx.fillText(`${t}s`, x, H - pad.bottom + 16);
    }

    // Axes labels
    ctx.save();
    ctx.translate(11, pad.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = c.muted;
    ctx.font = `10px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('amplitude', 0, 0);
    ctx.restore();

    // Noisy signal
    ctx.beginPath();
    ctx.strokeStyle = c.accent + '70';
    ctx.lineWidth = 1.2;
    raw.forEach((v, i) => {
      i === 0 ? ctx.moveTo(xScale(i), yScale(v)) : ctx.lineTo(xScale(i), yScale(v));
    });
    ctx.stroke();

    // Filtered signal
    ctx.beginPath();
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2;
    filtered.forEach((v, i) => {
      i === 0 ? ctx.moveTo(xScale(i), yScale(v)) : ctx.lineTo(xScale(i), yScale(v));
    });
    ctx.stroke();
  }

  slider.addEventListener('input', draw);

  // Redraw on theme change
  const observer = new MutationObserver(draw);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Initial draw after layout
  requestAnimationFrame(draw);
  window.addEventListener('resize', draw);
})();
</script>

## Choosing α in Practice

In the absence of a formal system model, a reasonable approach is:

1. Record a representative signal segment with the sensor at rest (pure noise).
2. Compute the noise standard deviation $$\sigma_n$$.
3. Choose $$f_c$$ to be roughly one decade below the lowest frequency of interest in the true signal.
4. Convert to $$\alpha$$ using the relation above with the known sample period $$T_s$$.

When the dynamics are well-characterized, the Kalman filter provides an optimal, time-varying alternative that adapts its weighting based on the estimated process and measurement noise covariances.

## See Also

- [Averaging Filters](https://kanishkegb.github.io/averaging-filters/)

## References

1. Kim, P. (2011). *Kalman Filter for Beginners: with MATLAB Examples*. CreateSpace Independent Publishing Platform.
2. Brown, R. G., & Hwang, P. Y. C. (1997). *Introduction to Random Signals and Applied Kalman Filtering* (3rd ed.). Wiley.