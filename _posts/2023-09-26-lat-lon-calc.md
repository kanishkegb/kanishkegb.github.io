---
layout: post
title: "Quick Reference: Converting Latitude/Longitude Differences to Meters"
tags: [navigation, geodesy, reference]
excerpt: >
  A practical reference for converting small angular differences in latitude or longitude
  into metric distances, with interactive tools and the Haversine formula for arbitrary point pairs.
---

Converting angular coordinate differences into metric distances is a routine task in navigation, mapping, and geospatial engineering. This post serves as a self-contained reference, covering three cases in increasing generality: meridional distance (latitude-only change), parallel distance (longitude-only change), and the general two-point case via the Haversine formula.

---

## Earth Model & Notation

All derivations here treat the Earth as a **sphere of mean radius**

$$R = 6{,}371{,}000 \text{ m}$$

This introduces errors on the order of 0.3 % relative to a WGS-84 ellipsoid — acceptable for most engineering work at scales below a few hundred kilometres. Where sub-metre accuracy is required, consult ellipsoidal formulae (Vincenty, Karney).

| Symbol | Meaning |
|--------|---------|
| $$\varphi$$ | Geodetic latitude (radians, positive North) |
| $$\lambda$$ | Longitude (radians, positive East) |
| $$\Delta\varphi,\,\Delta\lambda$$ | Small differences in latitude / longitude |
| $$R$$ | Mean Earth radius (6 371 000 m) |

---

## 1 — Distance Along a Meridian (Latitude Difference)

> **Assumption.** The two points share the same longitude, or their longitude separation is negligible compared with their latitude separation. Under the spherical model, a meridian is a great circle of radius $$R$$, so arc length is simply proportional to the subtended angle.

$$\boxed{d_{\varphi} = R \,|\Delta\varphi|}$$

where $$\Delta\varphi$$ is in **radians**. In terms of decimal degrees $$\Delta\varphi_{\circ}$$:

$$d_{\varphi} = R \cdot \frac{\pi}{180}\,|\Delta\varphi_{\circ}|$$

**Scale factor.** One degree of latitude ≈ **111 139 m** (111.1 km), and this value is *constant* across all latitudes under the spherical assumption — meridians are all great circles of the same radius.

<div class="calc-box">
  <p class="calc-label">Latitude difference → metres</p>
  <div class="calc-row">
    <label for="dlat-deg">Δφ (degrees)</label>
    <input type="number" id="dlat-deg" value="1.0" step="0.001" min="0">
    <span class="calc-result" id="dlat-result">— m</span>
  </div>
  <p class="calc-note">Uses <em>d</em> = 6 371 000 × |Δφ| × π/180</p>
</div>

<!-- SVG: meridian arc diagram -->
<svg class="geo-diagram" viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg" aria-label="Meridian arc diagram">
  <!-- Globe outline -->
  <ellipse cx="130" cy="110" rx="90" ry="90" class="gd-globe"/>
  <!-- Equator dashed -->
  <ellipse cx="130" cy="110" rx="90" ry="22" class="gd-equator"/>
  <!-- Meridian arc (the highlighted one) -->
  <path d="M 130 20 A 90 90 0 0 1 130 200" class="gd-meridian-bg"/>
  <!-- Arc segment representing Δφ -->
  <path d="M 175 68 A 90 90 0 0 1 175 152" class="gd-arc-highlight"/>
  <!-- Radius lines -->
  <line x1="130" y1="110" x2="175" y2="68" class="gd-radius"/>
  <line x1="130" y1="110" x2="175" y2="152" class="gd-radius"/>
  <!-- Angle label -->
  <text x="148" y="115" class="gd-label">Δφ</text>
  <!-- Arc label -->
  <text x="185" y="113" class="gd-label gd-label-arc">d<tspan dy="4" font-size="7">φ</tspan></text>
  <!-- Point dots -->
  <circle cx="175" cy="68"  r="3.5" class="gd-dot"/>
  <circle cx="175" cy="152" r="3.5" class="gd-dot"/>
  <!-- R label -->
  <text x="138" y="85" class="gd-label gd-label-r">R</text>
</svg>

---

## 2 — Distance Along a Parallel (Longitude Difference)

> **Assumption.** The two points share the same latitude $$\varphi$$, or their latitude separation is negligible. A parallel at latitude $$\varphi$$ is **not** a great circle; its radius shrinks with the cosine of latitude.

The radius of a parallel at latitude $$\varphi$$ is $$R\cos\varphi$$, so the arc length for a longitude change $$\Delta\lambda$$ (radians) is:

$$\boxed{d_{\lambda} = R\cos\varphi\,|\Delta\lambda|}$$

In decimal degrees:

$$d_{\lambda} = R\cos\varphi \cdot \frac{\pi}{180}\,|\Delta\lambda_{\circ}|}$$

**Key consequence.** One degree of longitude spans ≈ 111.1 km at the equator, but shrinks to zero at the poles. At 45° latitude it is ≈ 78.6 km; at 60° ≈ 55.6 km.

<div class="calc-box">
  <p class="calc-label">Longitude difference → metres</p>
  <div class="calc-row">
    <label for="dlon-deg">Δλ (degrees)</label>
    <input type="number" id="dlon-deg" value="1.0" step="0.001" min="0">
    <span class="calc-result" id="dlon-result">— m</span>
  </div>
  <div class="calc-row slider-row">
    <label for="lat-slider">Latitude φ</label>
    <input type="range" id="lat-slider" min="-90" max="90" value="0" step="0.5">
    <span class="slider-val" id="lat-val">0.0°</span>
  </div>
  <p class="calc-note">Uses <em>d</em> = 6 371 000 × cos(φ) × |Δλ| × π/180</p>
</div>

<!-- SVG: parallel radius diagram -->
<svg class="geo-diagram" viewBox="0 0 280 220" xmlns="http://www.w3.org/2000/svg" aria-label="Parallel arc diagram">
  <!-- Globe -->
  <ellipse cx="130" cy="130" rx="90" ry="90" class="gd-globe"/>
  <!-- Equator -->
  <ellipse cx="130" cy="130" rx="90" ry="22" class="gd-equator"/>
  <!-- Parallel at ~40° N -->
  <ellipse cx="130" cy="72" rx="69" ry="17" class="gd-parallel-highlight"/>
  <!-- Axis line -->
  <line x1="130" y1="40" x2="130" y2="220" class="gd-axis"/>
  <!-- R to surface -->
  <line x1="130" y1="130" x2="199" y2="72"  class="gd-radius" stroke-dasharray="4 3"/>
  <!-- r = R cos φ horizontal -->
  <line x1="130" y1="72"  x2="199" y2="72"  class="gd-radius-r"/>
  <!-- φ angle arc -->
  <path d="M 130 105 A 25 25 0 0 0 148 84" class="gd-phi-arc"/>
  <text x="138" y="101" class="gd-label">φ</text>
  <!-- Labels -->
  <text x="156" y="67"  class="gd-label gd-label-r">r = R cosφ</text>
  <text x="168" y="105" class="gd-label gd-label-r">R</text>
  <!-- Points on parallel -->
  <circle cx="199" cy="72" r="3.5" class="gd-dot"/>
  <circle cx="61"  cy="72" r="3.5" class="gd-dot"/>
  <!-- Arc label -->
  <text x="118" y="56" class="gd-label gd-label-arc">d<tspan dy="4" font-size="7">λ</tspan></text>
</svg>

---

## 3 — General Two-Point Distance: Haversine Formula

For two arbitrary positions $$(\varphi_1, \lambda_1)$$ and $$(\varphi_2, \lambda_2)$$, the **Haversine formula** computes the great-circle distance on a sphere exactly (within the spherical assumption):

$$a = \sin^2\!\left(\frac{\Delta\varphi}{2}\right) + \cos\varphi_1\,\cos\varphi_2\,\sin^2\!\left(\frac{\Delta\lambda}{2}\right)$$

$$\boxed{d = 2R\,\arctan2\!\left(\sqrt{a},\,\sqrt{1-a}\right)}$$

where all angles are in radians. The use of $$\arctan2$$ rather than $$\arcsin$$ avoids numerical instability for antipodal points.

> **Why Haversine?** The naïve law of cosines form $$d = R\arccos(\sin\varphi_1\sin\varphi_2 + \cos\varphi_1\cos\varphi_2\cos\Delta\lambda)$$ suffers from catastrophic cancellation for small separations in floating-point arithmetic. Haversine remains numerically stable at all scales.

<div class="calc-box">
  <p class="calc-label">Haversine: two-point great-circle distance</p>
  <div class="calc-row">
    <label for="hav-lat1">φ₁ (°)</label>
    <input type="number" id="hav-lat1" value="48.8566" step="0.0001">
    <label for="hav-lon1">λ₁ (°)</label>
    <input type="number" id="hav-lon1" value="2.3522" step="0.0001">
  </div>
  <div class="calc-row">
    <label for="hav-lat2">φ₂ (°)</label>
    <input type="number" id="hav-lat2" value="51.5074" step="0.0001">
    <label for="hav-lon2">λ₂ (°)</label>
    <input type="number" id="hav-lon2" value="-0.1278" step="0.0001">
  </div>
  <div class="hav-result-row">
    <span class="calc-result" id="hav-result">— m</span>
    <span class="calc-result-km" id="hav-result-km"></span>
  </div>
  <p class="calc-note">Paris → London by default. Uses Haversine with R = 6 371 000 m.</p>
</div>

---

## Summary

| Case | Formula | Notes |
|------|---------|-------|
| Latitude diff only | $$d = R\,\|\Delta\varphi\|$$ | ~111.1 km / degree, latitude-independent |
| Longitude diff only | $$d = R\cos\varphi\,\|\Delta\lambda\|$$ | scales with $$\cos\varphi$$; zero at poles |
| General | Haversine | Numerically stable great-circle distance |

All three converge for small $$\Delta\varphi, \Delta\lambda$$ — the first two are simply the component projections of the Haversine result in the limit of small separation.

---

<style>
/* ── Calculator boxes ── */
.calc-box {
  background: var(--bg-alt);
  border: 1px solid var(--border);
  border-radius: var(--card-radius);
  padding: 1.1rem 1.35rem 1rem;
  margin: 1.5rem 0;
}
.calc-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}
.calc-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  margin-bottom: 0.55rem;
}
.calc-row label {
  font-size: 0.85rem;
  color: var(--text-muted);
  min-width: 6rem;
}
.calc-row input[type="number"] {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9rem;
  width: 9rem;
  padding: 0.3rem 0.55rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  outline: none;
  transition: border-color 0.15s;
}
.calc-row input[type="number"]:focus {
  border-color: var(--accent);
}
.calc-result {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
}
.calc-note {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
  font-style: italic;
}
/* Latitude slider */
.slider-row input[type="range"] {
  flex: 1;
  min-width: 120px;
  accent-color: var(--accent);
  cursor: pointer;
}
.slider-val {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
  color: var(--text);
  min-width: 4rem;
  text-align: right;
}
/* Haversine result row */
.hav-result-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin: 0.5rem 0 0.25rem;
}
.calc-result-km {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* ── SVG Diagrams ── */
.geo-diagram {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 1.25rem auto 1.75rem;
}
.gd-globe      { fill: none; stroke: var(--border); stroke-width: 1.5; }
.gd-equator    { fill: none; stroke: var(--border); stroke-width: 1; stroke-dasharray: 5 3; }
.gd-meridian-bg{ fill: none; stroke: var(--border); stroke-width: 1; stroke-dasharray: 4 3; }
.gd-arc-highlight{ fill: none; stroke: var(--accent); stroke-width: 2.5; stroke-linecap: round; }
.gd-radius     { stroke: var(--text-muted); stroke-width: 1; fill: none; }
.gd-dot        { fill: var(--accent); }
.gd-label      { font-size: 11px; fill: var(--text); font-family: Georgia, serif; font-style: italic; }
.gd-label-arc  { fill: var(--accent); font-weight: 600; font-style: normal; }
.gd-label-r    { fill: var(--text-muted); }
.gd-parallel-highlight { fill: none; stroke: var(--accent); stroke-width: 2; }
.gd-axis       { stroke: var(--border); stroke-width: 1; stroke-dasharray: 3 3; }
.gd-radius-r   { stroke: var(--accent); stroke-width: 1.5; fill: none; stroke-dasharray: 3 2; }
.gd-phi-arc    { fill: none; stroke: var(--text-muted); stroke-width: 1; }
</style>

<script>
(function () {
  const R = 6371000;
  const toRad = d => d * Math.PI / 180;

  /* --- Section 1: latitude diff --- */
  function updateDLat() {
    const dDeg = parseFloat(document.getElementById('dlat-deg').value) || 0;
    const m = R * Math.abs(toRad(dDeg));
    document.getElementById('dlat-result').textContent =
      m >= 1000 ? (m / 1000).toFixed(3) + ' km' : m.toFixed(1) + ' m';
  }
  document.getElementById('dlat-deg').addEventListener('input', updateDLat);
  updateDLat();

  /* --- Section 2: longitude diff with slider --- */
  function updateDLon() {
    const dDeg = parseFloat(document.getElementById('dlon-deg').value) || 0;
    const lat  = parseFloat(document.getElementById('lat-slider').value) || 0;
    document.getElementById('lat-val').textContent = lat.toFixed(1) + '°';
    const m = R * Math.cos(toRad(lat)) * Math.abs(toRad(dDeg));
    document.getElementById('dlon-result').textContent =
      m >= 1000 ? (m / 1000).toFixed(3) + ' km' : m.toFixed(1) + ' m';
  }
  document.getElementById('dlon-deg').addEventListener('input', updateDLon);
  document.getElementById('lat-slider').addEventListener('input', updateDLon);
  updateDLon();

  /* --- Section 3: Haversine --- */
  function haversine(lat1, lon1, lat2, lon2) {
    const phi1 = toRad(lat1), phi2 = toRad(lat2);
    const dphi = toRad(lat2 - lat1);
    const dlam = toRad(lon2 - lon1);
    const a = Math.sin(dphi/2)**2 +
              Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlam/2)**2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function updateHav() {
    const lat1 = parseFloat(document.getElementById('hav-lat1').value);
    const lon1 = parseFloat(document.getElementById('hav-lon1').value);
    const lat2 = parseFloat(document.getElementById('hav-lat2').value);
    const lon2 = parseFloat(document.getElementById('hav-lon2').value);
    if ([lat1, lon1, lat2, lon2].some(isNaN)) return;
    const m = haversine(lat1, lon1, lat2, lon2);
    document.getElementById('hav-result').textContent    = m.toFixed(1) + ' m';
    document.getElementById('hav-result-km').textContent = '(' + (m/1000).toFixed(3) + ' km)';
  }

  ['hav-lat1','hav-lon1','hav-lat2','hav-lon2'].forEach(id =>
    document.getElementById(id).addEventListener('input', updateHav));
  updateHav();
})();
</script>