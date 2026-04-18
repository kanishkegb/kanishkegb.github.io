---
layout: post
title: "Averaging Filters"
tags: [filters, signal-processing, tutorials]
image: assets/images/posts/filters/moving-average-filter.png
excerpt: "An introduction to simple averaging and moving average filters — two foundational techniques for reducing measurement noise — with an interactive comparison."
---

Any practical measurement carries some level of noise. Whether from sensor electronics, environmental disturbances, or quantization effects, this noise can obscure the underlying signal of interest. Filters are tools that attenuate noise while preserving the structure of the true signal. This post introduces two foundational averaging-based filters and contrasts their behavior through an interactive demonstration.

## Simple Average Filter

The simplest form of filtering is to compute the running mean of all measurements collected so far. Let $$x_k$$ denote the measurement at discrete time step $$k$$. The output of the average filter is:

$$\bar{x}_k = \frac{1}{k} \sum_{i=1}^{k} x_i$$

A naive implementation requires storing the entire measurement history. This is avoided by recasting the expression recursively. Noting that $$\sum_{i=1}^{k} x_i = \sum_{i=1}^{k-1} x_i + x_k = (k-1)\bar{x}_{k-1} + x_k$$, the update equation becomes:

$$\bar{x}_k = \frac{k-1}{k}\,\bar{x}_{k-1} + \frac{1}{k}\,x_k$$

Defining $$\alpha_k = \frac{k-1}{k} \in [0, 1)$$, this takes the compact form:

$$\bar{x}_k = \alpha_k\,\bar{x}_{k-1} + (1 - \alpha_k)\,x_k$$

This is the **recursive averaging equation**. It requires only the previous filtered value $$\bar{x}_{k-1}$$ and the current measurement $$x_k$$, making it computationally efficient and memory-friendly.

Note that $$\alpha_k \to 1$$ as $$k \to \infty$$. This means the filter places progressively less weight on new measurements over time — a property that ensures convergence but also limits adaptability.

### Example

Consider a voltmeter measuring a constant voltage of 14 V. The measurement noise is modeled as zero-mean white noise with standard deviation $$\sigma = 2\,\text{V}$$. As shown in the interactive plot below, the filtered estimate converges steadily toward the true value as more measurements are incorporated. The convergence rate slows over time, consistent with the diminishing weight $$(1 - \alpha_k) = 1/k$$ assigned to each new observation.

### Characteristics

The average filter is unbiased for stationary signals — given sufficient measurements, it converges to the true mean regardless of noise amplitude. It requires minimal computation and no tuning parameters. However, because every past measurement receives nonzero weight, the filter has a memory that extends to the first sample. For a signal whose true value changes over time, this historical weighting introduces **systematic lag**: the filtered output trails the true value, and the lag grows with the number of samples accumulated. The average filter is therefore best suited to quasi-static or slowly drifting signals.

---

## Moving Average Filter

The moving average filter addresses the lag problem by restricting the average to the $$n$$ most recent measurements. This finite, sliding window discards old data, allowing the filter to track changes in the underlying signal. The $$n$$-point moving average is:

$$\bar{x}_k = \frac{1}{n} \sum_{i=k-(n-1)}^{k} x_i$$

An equivalent recursive formulation avoids recomputing the full sum at each step:

$$\bar{x}_k = \bar{x}_{k-1} + \frac{x_k - x_{k-n}}{n}$$

This requires only the current measurement $$x_k$$ and the oldest measurement in the window $$x_{k-n}$$, so storage is proportional to $$n$$ rather than the total sample count.

### Example

Consider a sinusoidally varying signal with additive noise. The average filter, anchored to all past data, cannot track the oscillation and produces a flat, lagged output. The moving average filter, by contrast, follows the signal envelope — though with a phase delay that increases with $$n$$. Use the interactive demo below to explore this trade-off directly.

### The Window Length Trade-off

The parameter $$n$$ governs a fundamental trade-off:

- **Small $$n$$**: The filter responds quickly to changes but provides weaker noise attenuation. In the frequency domain, the passband is wider and high-frequency noise is less suppressed.
- **Large $$n$$**: Noise is averaged out more aggressively, but the filter introduces greater lag and may blur sharp transitions in the signal.

This trade-off is inherent to any finite-impulse-response (FIR) averaging filter. The choice of $$n$$ should be guided by the expected rate of change of the signal relative to the noise bandwidth.

---

## Interactive Comparison

The simulation below generates a noisy sinusoidal signal and applies both the average filter and the moving average filter in real time. Adjust the window length $$n$$ to observe how it affects noise suppression and tracking delay.

<div id="filter-demo" style="
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  background: var(--bg-alt);
  padding: 1.5rem;
  margin: 2rem 0;
">

  <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
    <div>
      <label for="window-slider" style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500; display: block; margin-bottom: 0.3rem;">
        Moving average window: <span id="window-label" style="color: var(--text); font-weight: 600;">n = 10</span>
      </label>
      <input type="range" id="window-slider" min="2" max="60" value="10" style="
        width: 220px;
        accent-color: var(--accent);
        cursor: pointer;
      ">
    </div>
    <div>
      <label for="noise-slider" style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500; display: block; margin-bottom: 0.3rem;">
        Noise amplitude: <span id="noise-label" style="color: var(--text); font-weight: 600;">σ = 0.40</span>
      </label>
      <input type="range" id="noise-slider" min="5" max="80" value="40" style="
        width: 220px;
        accent-color: var(--accent);
        cursor: pointer;
      ">
    </div>
    <button id="reseed-btn" style="
      font-size: 0.8rem;
      font-weight: 500;
      font-family: inherit;
      color: var(--text-muted);
      background: none;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 0.4rem 0.9rem;
      cursor: pointer;
      transition: color 0.15s, border-color 0.15s, background 0.15s;
      white-space: nowrap;
    " onmouseover="this.style.color='var(--text)';this.style.borderColor='var(--text-muted)';this.style.background='var(--bg)';"
       onmouseout="this.style.color='var(--text-muted)';this.style.borderColor='var(--border)';this.style.background='none';">
      New noise sample
    </button>
  </div>

  <canvas id="filter-canvas" style="
    width: 100%;
    border-radius: var(--radius);
    background: var(--bg);
    border: 1px solid var(--border);
    display: block;
  "></canvas>

  <div style="display: flex; flex-wrap: wrap; gap: 1.25rem; margin-top: 1rem;">
    <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.78rem; color: var(--text-muted);">
      <span style="width: 24px; height: 2px; background: #94a3b8; display: inline-block; border-radius: 2px;"></span> Noisy measurement
    </div>
    <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.78rem; color: var(--text-muted);">
      <span style="width: 24px; height: 2px; background: #10b981; display: inline-block; border-radius: 2px;"></span> True signal
    </div>
    <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.78rem; color: var(--text-muted);">
      <span style="width: 24px; height: 2px; background: #f59e0b; display: inline-block; border-radius: 2px;"></span> Average filter
    </div>
    <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.78rem; color: var(--text-muted);">
      <span style="width: 24px; height: 2px; background: #3b82f6; display: inline-block; border-radius: 2px;"></span> Moving average (n)
    </div>
  </div>

  <div id="filter-stats" style="
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1rem;
  "></div>
</div>

<script>
(function () {
  const canvas = document.getElementById('filter-canvas');
  const ctx = canvas.getContext('2d');
  const windowSlider = document.getElementById('window-slider');
  const noiseSlider  = document.getElementById('noise-slider');
  const windowLabel  = document.getElementById('window-label');
  const noiseLabel   = document.getElementById('noise-label');
  const reseedBtn    = document.getElementById('reseed-btn');
  const statsDiv     = document.getElementById('filter-stats');

  const N = 200;
  let noiseValues = [];

  function seededRandom(seed) {
    let s = seed;
    return function() {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0xffffffff;
    };
  }

  let rng = seededRandom(42);

  function generateNoise() {
    noiseValues = [];
    for (let i = 0; i < N; i++) {
      // Box-Muller for Gaussian noise
      const u1 = Math.max(rng(), 1e-10);
      const u2 = rng();
      noiseValues.push(Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2));
    }
  }

  function reseed() {
    rng = seededRandom(Math.floor(Math.random() * 1e9));
    generateNoise();
    render();
  }

  generateNoise();

  function computeFilters(n, sigma) {
    const true_sig = [], noisy = [], avg = [], mavg = [];
    let runningSum = 0;
    const window = [];

    for (let k = 0; k < N; k++) {
      const t  = k / (N - 1);
      const s  = Math.sin(2 * Math.PI * 1.5 * t);
      true_sig.push(s);

      const xk = s + sigma * noiseValues[k];
      noisy.push(xk);

      // Simple average filter
      runningSum += xk;
      avg.push(runningSum / (k + 1));

      // Moving average filter
      window.push(xk);
      if (window.length > n) window.shift();
      const wsum = window.reduce((a, b) => a + b, 0);
      mavg.push(wsum / window.length);
    }
    return { true_sig, noisy, avg, mavg };
  }

  function rmse(a, b) {
    const sum = a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0);
    return Math.sqrt(sum / a.length).toFixed(4);
  }

  function getCSS(prop) {
    return getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
  }

  function render() {
    const n = parseInt(windowSlider.value);
    const sigma = parseInt(noiseSlider.value) / 100;
    windowLabel.textContent = `n = ${n}`;
    noiseLabel.textContent  = `σ = ${sigma.toFixed(2)}`;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth;
    const H = Math.round(W * 0.38);
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    const { true_sig, noisy, avg, mavg } = computeFilters(n, sigma);

    const pad = { top: 20, right: 16, bottom: 28, left: 40 };
    const pw = W - pad.left - pad.right;
    const ph = H - pad.top  - pad.bottom;

    const allVals = [...noisy, ...avg, ...mavg, ...true_sig];
    const yMin = Math.min(...allVals) - 0.1;
    const yMax = Math.max(...allVals) + 0.1;

    const xScale = (i) => pad.left + (i / (N - 1)) * pw;
    const yScale = (v) => pad.top + ph - ((v - yMin) / (yMax - yMin)) * ph;

    // Background
    const bgColor = getCSS('--bg') || '#ffffff';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    const gridColor = getCSS('--border') || '#e5e5e5';
    const mutedColor = getCSS('--text-muted') || '#737373';
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    const ticks = 5;
    for (let t = 0; t <= ticks; t++) {
      const v = yMin + (yMax - yMin) * (t / ticks);
      const y = yScale(v);
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + pw, y);
      ctx.stroke();
      ctx.fillStyle = mutedColor;
      ctx.font = `${10 / dpr + 10}px Inter, sans-serif`;
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(v.toFixed(1), pad.left - 5, y + 3.5);
    }

    // x-axis label
    ctx.fillStyle = mutedColor;
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Sample index k', pad.left + pw / 2, H - 4);

    function drawLine(data, color, lw, dashed) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.setLineDash(dashed || []);
      data.forEach((v, i) => {
        const x = xScale(i), y = yScale(v);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    drawLine(noisy,    '#94a3b8', 0.8);
    drawLine(true_sig, '#10b981', 1.5, [6, 4]);
    drawLine(avg,      '#f59e0b', 2);
    drawLine(mavg,     '#3b82f6', 2);

    // Stats
    const avgRmse  = rmse(true_sig, avg);
    const mavgRmse = rmse(true_sig, mavg);

    const statStyle = `
      font-size: 0.78rem;
      color: var(--text-muted);
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 0.3rem 0.75rem;
    `;
    statsDiv.innerHTML = `
      <span style="${statStyle}">Average filter RMSE: <strong style="color:var(--text)">${avgRmse}</strong></span>
      <span style="${statStyle}">Moving average RMSE (n=${n}): <strong style="color:var(--text)">${mavgRmse}</strong></span>
    `;
  }

  windowSlider.addEventListener('input', render);
  noiseSlider.addEventListener('input', render);
  reseedBtn.addEventListener('click', reseed);
  window.addEventListener('resize', render);

  // Re-render when theme changes (MutationObserver on <html>)
  const observer = new MutationObserver(render);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  render();
})();
</script>

---

## Comparison Summary

| Property | Average Filter | Moving Average (window $$n$$) |
|---|---|---|
| Memory required | $$O(1)$$ (recursive) | $$O(n)$$ |
| Tuning parameter | None | Window length $$n$$ |
| Lag behavior | Grows unboundedly | Bounded by $$n/2$$ samples |
| Noise suppression | Improves with $$k$$ | Fixed, governed by $$n$$ |
| Suitable signal | Stationary or quasi-static | Slowly time-varying |

Both filters are **linear** and **shift-invariant** (once transients decay), and their frequency responses are well-defined sinc-like functions. More selective attenuation of specific frequency bands requires higher-order filters such as Butterworth or Chebyshev designs — discussed in the companion post on low-pass filters.

## See Also

- [Low-Pass Filters](https://kanishkegb.github.io/low-pass-filters/)

## References

1. Kim, P. (2011). *Kalman Filter for Beginners: with MATLAB Examples*. CreateSpace Independent Publishing Platform.