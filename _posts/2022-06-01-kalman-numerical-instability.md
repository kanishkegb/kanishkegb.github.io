---
layout: post
title: "Numerical Instabilities in Kalman Filters: Causes, Consequences, and Mitigations"
tags: [estimation, kalman-filter, numerical-methods, signal-processing]
excerpt: "The Kalman filter, despite its optimality guarantees under Gaussian assumptions, is susceptible to numerical degradation in practice. This post examines the root causes of instability, their long-term consequences on state estimation, and the principal algorithmic remedies developed over five decades of research."
---

<style>
  .kf-note {
    background: var(--bg-alt);
    border-left: 3px solid var(--accent);
    border-radius: 0 var(--radius) var(--radius) 0;
    padding: 0.85rem 1.25rem;
    margin: 1.75rem 0;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .kf-note strong {
    color: var(--text);
    display: block;
    margin-bottom: 0.3rem;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .ref-list {
    counter-reset: ref-counter;
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  .ref-list li {
    counter-increment: ref-counter;
    display: grid;
    grid-template-columns: 2rem 1fr;
    gap: 0.5rem;
    font-size: 0.855rem;
    color: var(--text-muted);
    line-height: 1.65;
    padding: 0.6rem 0;
    border-bottom: 1px solid var(--border);
  }

  .ref-list li:last-child {
    border-bottom: none;
  }

  .ref-list li::before {
    content: "[" counter(ref-counter) "]";
    font-size: 0.78rem;
    color: var(--text-muted);
    padding-top: 0.05rem;
    font-variant-numeric: tabular-nums;
  }

  .ref-list li a {
    color: var(--accent);
    text-decoration: none;
  }

  .ref-list li a:hover {
    text-decoration: underline;
    opacity: 0.8;
  }

  .algo-block {
    background: var(--bg-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.1rem 1.4rem;
    margin: 1.5rem 0;
    font-size: 0.875rem;
    line-height: 1.85;
  }

  .algo-block .algo-title {
    font-size: 0.73rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid var(--border);
  }

  .algo-block .step {
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0.4rem;
  }

  .algo-block .step-num {
    color: var(--text-muted);
    font-size: 0.8rem;
    padding-top: 0.05rem;
  }
</style>

The discrete-time Kalman filter [1] provides the minimum-variance unbiased linear estimator for systems with Gaussian process and measurement noise. Its recursive structure makes it computationally attractive for real-time applications, yet this same recursive nature accumulates floating-point errors that can, over extended operation, destroy the estimator's theoretical properties. The failure modes range from subtle covariance asymmetry to catastrophic filter divergence, and the mitigation strategies span numerical linear algebra, information-theoretic reformulations, and adaptive covariance management.

## The Standard Formulation and Its Arithmetic Vulnerabilities

The conventional time-update and measurement-update equations are, respectively,

$$
\hat{x}_{k|k-1} = F_k \hat{x}_{k-1|k-1}
$$

$$
P_{k|k-1} = F_k P_{k-1|k-1} F_k^\top + Q_k
$$

$$
K_k = P_{k|k-1} H_k^\top \left( H_k P_{k|k-1} H_k^\top + R_k \right)^{-1}
$$

$$
\hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k \left( z_k - H_k \hat{x}_{k|k-1} \right)
$$

$$
P_{k|k} = \left( I - K_k H_k \right) P_{k|k-1}
$$

The state covariance matrix $$P$$ is the central object of concern. By construction it must remain symmetric positive definite (SPD) at every step; its eigenvalues represent the uncertainty ellipsoid of the estimate. Three arithmetic pathways undermine this requirement in finite-precision arithmetic.

**Catastrophic cancellation in the Joseph form.** The gain computation involves subtracting two quantities of potentially similar magnitude — $$P_{k|k-1}$$ and $$K_k H_k P_{k|k-1}$$ — leading to significant loss of significant bits when the Kalman gain is near unity. In double precision, one can lose 8–10 decimal digits of precision in a single update [2].

**Asymmetry accumulation.** The simplified covariance update $$(I - K_k H_k) P_{k|k-1}$$ is not symmetric in exact arithmetic due to representation error in $$K_k$$. Repeated application causes $$P$$ to drift from symmetry. Once $$P$$ is asymmetric, the eigenstructure degrades and eventually an eigenvalue crosses zero, rendering the matrix indefinite.

**Ill-conditioning of the innovation covariance.** The matrix inversion $$(H_k P_{k|k-1} H_k^\top + R_k)^{-1}$$ is increasingly ill-conditioned when the state uncertainty is much larger or much smaller than the measurement noise. Condition numbers exceeding $$10^{12}$$ are common in inertial navigation over extended trajectories.

## Long-Run Consequences

### Filter Divergence

The most dramatic failure mode is divergence: the filter's estimated covariance $$P_{k|k}$$ decreases (indicating growing confidence) while the true mean-squared error grows. This occurs because an indefinite $$P$$ can produce Kalman gains with incorrect signs, causing the filter to steer the state estimate *away* from the truth. Divergence is notoriously difficult to detect from filter-internal quantities alone, since $$P$$ may appear plausible while being numerically corrupted.

### Covariance Collapse

In systems with poorly observable states, rounding errors can artificially suppress the diagonal elements of $$P$$ corresponding to those states. The filter then assigns near-zero uncertainty to directions it has never actually observed, rejecting future measurements in those directions via near-zero Kalman gains. This is particularly pernicious in GPS-denied navigation where specific error modes are unobservable for extended intervals.

### Rank Deficiency

Over hundreds of thousands of recursive steps — common in continuous INS/GNSS integration — $$P$$ may lose rank entirely. A rank-deficient covariance matrix has a null space that the filter treats as perfectly known, permanently blocking correction in those directions even when valid measurements arrive.

<div class="kf-note">
  <strong>Illustrative magnitude</strong>
  A 15-state INS error model integrated at 100 Hz for one hour accumulates 360,000 covariance updates. At each step, double-precision arithmetic introduces relative errors of order $$\epsilon_\text{mach} \approx 2.2 \times 10^{-16}$$. Over such a sequence, without mitigation, condition numbers routinely reach $$10^{10}$$–$$10^{14}$$, well into the regime where matrix factorizations become unreliable.
</div>

## Mitigation Techniques

### 1. Joseph Stabilized Form

The numerically robust symmetric form of the covariance update replaces the simple update with

$$
P_{k|k} = (I - K_k H_k)\, P_{k|k-1}\, (I - K_k H_k)^\top + K_k R_k K_k^\top
$$

This is algebraically equivalent to the standard form but guarantees symmetry by construction, since it is a sum of products of the form $$A M A^\top$$. It doubles the number of multiplications but eliminates the asymmetry accumulation pathway [3]. It does not, however, resolve ill-conditioning.

### 2. Square-Root Filtering (Potter / Carlson)

Rather than propagating $$P$$ directly, square-root filters maintain its Cholesky factor $$S$$ such that $$P = S S^\top$$. The time and measurement updates are formulated in terms of orthogonal triangularization (QR decomposition or Givens rotations applied to $$S$$), ensuring that $$P$$ remains SPD by the fundamental property that $$S S^\top \succeq 0$$ whenever $$S$$ exists.

The square-root time update uses the QR decomposition:

$$
\begin{bmatrix} S_{k|k-1} \end{bmatrix} = \text{qr}\!\left(\begin{bmatrix} S_{k-1|k-1} F_k^\top \\ S_Q \end{bmatrix}\right)
$$

where $$S_Q$$ is the Cholesky factor of $$Q_k$$. The effective condition number of $$S$$ is the square root of that of $$P$$, providing roughly 8 additional decimal digits of headroom in double precision [4]. The Carlson [5] and Bierman [6] UD-factorization variants operate on the unit lower-triangular times diagonal factorization $$P = U D U^\top$$, which avoids square roots and is particularly efficient for sequential scalar measurement processing.

<div class="algo-block">
  <div class="algo-title">Square-Root Measurement Update (Scalar Observation)</div>
  <div class="step"><span class="step-num">1.</span><span>Compute innovation variance: $$\alpha = h^\top P_{k|k-1} h + r$$</span></div>
  <div class="step"><span class="step-num">2.</span><span>Compute gain: $$K = P_{k|k-1} h \,/\, \alpha$$</span></div>
  <div class="step"><span class="step-num">3.</span><span>Rank-1 update of Cholesky factor via Givens or hyperbolic rotation: $$S_{k|k} = \text{cholupdate}(S_{k|k-1},\, K\sqrt{\alpha},\, \text{`−'})$$</span></div>
  <div class="step"><span class="step-num">4.</span><span>Update mean: $$\hat{x}_{k|k} = \hat{x}_{k|k-1} + K(z_k - h^\top \hat{x}_{k|k-1})$$</span></div>
</div>

### 3. Information Filter Formulation

The information filter propagates the Fisher information matrix $$\Omega = P^{-1}$$ and the information vector $$\xi = P^{-1}\hat{x}$$. The measurement update becomes purely additive:

$$
\Omega_{k|k} = \Omega_{k|k-1} + H_k^\top R_k^{-1} H_k
$$

$$
\xi_{k|k} = \xi_{k|k-1} + H_k^\top R_k^{-1} z_k
$$

This eliminates matrix inversion from the measurement step entirely. The time update is the less convenient side: it requires $$\Omega_{k|k-1}^{-1}$$ to form $$P_{k|k-1}$$. The information form is therefore preferable in sensor fusion architectures with many simultaneous measurements (e.g., SLAM with dense feature maps) and in distributed estimation, where additive information fusion across nodes is structurally clean [7].

### 4. Covariance Symmetrization

A pragmatic and computationally cheap intervention is to enforce symmetry explicitly after each update:

$$
P \leftarrow \tfrac{1}{2}(P + P^\top)
$$

This is $$O(n^2)$$ and adds negligible overhead. While it does not address ill-conditioning, it prevents the asymmetry pathway from corrupting the eigenstructure and is universally recommended as a baseline hygiene measure [8]. Some implementations combine symmetrization with a periodic eigenvalue check: if the minimum eigenvalue of $$P$$ falls below a threshold (e.g., $$10^{-12}$$ times the trace), the matrix is projected back to the SPD cone via $$P \leftarrow P + \delta I$$.

### 5. Sequential Measurement Processing

When the measurement noise covariance $$R_k$$ is diagonal, each scalar component of $$z_k$$ can be processed independently. This reduces the simultaneous update to a sequence of rank-1 updates, each of which requires only a scalar division rather than a full matrix inversion. Sequential processing is thus both numerically safer (smaller, better-conditioned operations) and enables early termination when measurements fail consistency checks [6].

### 6. Adaptive Covariance Inflation

Filter divergence driven by model mismatch — unmodeled dynamics, incorrect noise statistics — is not a purely numerical problem, but its symptoms are indistinguishable from arithmetic degradation from the filter's perspective. Adaptive methods [9] estimate the innovation sequence statistics online:

$$
\hat{R}_k = \frac{1}{N}\sum_{i=k-N+1}^{k} \nu_i \nu_i^\top - H_k P_{k|k-1} H_k^\top
$$

where $$\nu_i = z_i - H_i \hat{x}_{i|i-1}$$ is the innovation. When $$\hat{R}_k$$ is inconsistent with the filter's predicted innovation covariance, $$Q$$ or $$R$$ are adjusted to restore normalized innovation squared (NIS) consistency. This prevents the covariance collapse that follows from overly optimistic noise models.

## Practical Recommendations

The choice of implementation should be driven by the system's observability structure and the expected duration of operation:

For **short-duration, well-conditioned** systems (e.g., tightly coupled GPS/INS over minutes), the Joseph form with explicit symmetrization provides a good balance of simplicity and robustness.

For **long-duration or poorly observable** systems (e.g., submarine INS, deep-space navigation), square-root or UD-factored implementations are essentially mandatory. The Bierman-Thornton UD filter [6] remains the standard in precision navigation due to its numerical stability, computational efficiency, and amenability to sequential processing.

For **distributed or high-measurement-rate** architectures (e.g., multi-sensor SLAM), the information filter's additive fusion structure offers structural advantages that outweigh its more expensive time update.

In all cases, the normalized innovation squared,

$$
\text{NIS}_k = \nu_k^\top S_k^{-1} \nu_k \sim \chi^2(m)
$$

where $$m$$ is the measurement dimension, provides an online diagnostic. Sustained NIS values outside the $$95\%$$ confidence interval $$[\chi^2_{m,0.025},\, \chi^2_{m,0.975}]$$ indicate either filter divergence or model mismatch and should trigger corrective action.

---

## References

<ol class="ref-list">
  <li>R. E. Kalman, "A new approach to linear filtering and prediction problems," <em>Journal of Basic Engineering</em>, vol. 82, no. 1, pp. 35–45, 1960.</li>
  <li>G. J. Bierman, <em>Factorization Methods for Discrete Sequential Estimation</em>. Academic Press, 1977. (Dover reprint, 2006.)</li>
  <li>P. D. Joseph, as cited in A. H. Jazwinski, <em>Stochastic Processes and Filtering Theory</em>. Academic Press, 1970.</li>
  <li>A. Andrews, "A square root formulation of the Kalman covariance equations," <em>AIAA Journal</em>, vol. 6, no. 6, pp. 1165–1166, 1968.</li>
  <li>G. L. Carlson, "Fast triangular factorization of the square root filter," <em>AIAA Journal</em>, vol. 11, no. 9, pp. 1259–1265, 1973.</li>
  <li>G. J. Bierman and C. L. Thornton, "Numerical comparison of Kalman filter algorithms: Orbit determination case study," <em>Automatica</em>, vol. 13, no. 1, pp. 23–35, 1977.</li>
  <li>H. E. Durrant-Whyte and T. Bailey, "Simultaneous localization and mapping: Part I," <em>IEEE Robotics & Automation Magazine</em>, vol. 13, no. 2, pp. 99–108, 2006.</li>
  <li>R. G. Brown and P. Y. C. Hwang, <em>Introduction to Random Signals and Applied Kalman Filtering</em>, 4th ed. Wiley, 2012.</li>
  <li>R. Mehra, "Approaches to adaptive filtering," <em>IEEE Transactions on Automatic Control</em>, vol. 17, no. 5, pp. 693–698, 1972.</li>
</ol>