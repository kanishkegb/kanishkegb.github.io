---
layout: post
title: "A Taxonomy of Kalman Filters"
tags: [estimation, signal-processing, navigation, robotics]
excerpt: "A comparative treatment of the standard, extended, unscented, and particle filter families — covering their theoretical foundations, computational properties, and practical trade-offs."
---

State estimation is a central problem in engineering: given a sequence of noisy measurements, infer the hidden state of a dynamical system over time. The Kalman filter and its descendants are the dominant tools for this task. This article surveys the principal variants — the **Kalman Filter (KF)**, **Extended Kalman Filter (EKF)**, **Unscented Kalman Filter (UKF)**, and **Particle Filter (PF)** — and examines how they are related, where they diverge, and when each is appropriate.

---

## 1. The Estimation Problem

Consider a discrete-time state-space model:

$$
\mathbf{x}_k = f(\mathbf{x}_{k-1}, \mathbf{u}_k) + \mathbf{w}_k, \qquad \mathbf{w}_k \sim \mathcal{N}(\mathbf{0}, \mathbf{Q}_k)
$$

$$
\mathbf{z}_k = h(\mathbf{x}_k) + \mathbf{v}_k, \qquad \mathbf{v}_k \sim \mathcal{N}(\mathbf{0}, \mathbf{R}_k)
$$

where $\mathbf{x}_k \in \mathbb{R}^n$ is the hidden state, $\mathbf{z}_k \in \mathbb{R}^m$ is the observation, $f$ and $h$ are the process and measurement models respectively, and $\mathbf{Q}_k$, $\mathbf{R}_k$ are the process and measurement noise covariances. The goal is to compute the posterior $p(\mathbf{x}_k \mid \mathbf{z}_{1:k})$ recursively.

When $f$ and $h$ are linear and the noise is Gaussian, the posterior is itself Gaussian and is computed exactly by the Kalman filter. All other variants are approximations, each with different assumptions about how to handle nonlinearity or non-Gaussianity.

---

## 2. The Kalman Filter (KF)

The KF [1] is the optimal minimum-mean-square-error (MMSE) estimator for **linear, Gaussian** systems. Setting $f(\mathbf{x}) = \mathbf{F}\mathbf{x}$ and $h(\mathbf{x}) = \mathbf{H}\mathbf{x}$, the filter proceeds in two stages per time step.

**Predict:**

$$
\hat{\mathbf{x}}_{k|k-1} = \mathbf{F}\hat{\mathbf{x}}_{k-1|k-1}
$$

$$
\mathbf{P}_{k|k-1} = \mathbf{F}\mathbf{P}_{k-1|k-1}\mathbf{F}^\top + \mathbf{Q}_k
$$

**Update:**

$$
\mathbf{K}_k = \mathbf{P}_{k|k-1}\mathbf{H}^\top\!\left(\mathbf{H}\mathbf{P}_{k|k-1}\mathbf{H}^\top + \mathbf{R}_k\right)^{-1}
$$

$$
\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_k\!\left(\mathbf{z}_k - \mathbf{H}\hat{\mathbf{x}}_{k|k-1}\right)
$$

$$
\mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_k\mathbf{H})\mathbf{P}_{k|k-1}
$$

The **Kalman gain** $\mathbf{K}_k$ optimally weights the prediction against the measurement, balancing process and measurement uncertainty.

<div class="pros-cons">
  <div class="kf-col kf-pros">
    <div class="kf-col-label">Strengths</div>
    <ul>
      <li>Exact MMSE optimality under linear-Gaussian assumptions</li>
      <li>Closed-form, deterministic recursion</li>
      <li>$\mathcal{O}(n^2 m + m^3)$ per step — highly efficient</li>
      <li>Interpretable covariance propagation</li>
    </ul>
  </div>
  <div class="kf-col kf-cons">
    <div class="kf-col-label">Limitations</div>
    <ul>
      <li>Restricted to linear dynamics and observation models</li>
      <li>Assumes Gaussian noise throughout</li>
      <li>Diverges under model mismatch</li>
    </ul>
  </div>
</div>

**Canonical use cases:** GPS/INS integration with linear kinematics, channel equalization, structural health monitoring with linear sensor models, econometric state-space models.

---

## 3. The Extended Kalman Filter (EKF)

The EKF [2] extends the KF to **nonlinear** systems by linearising $f$ and $h$ around the current estimate via a first-order Taylor expansion. Jacobians replace the linear matrices:

$$
\mathbf{F}_k = \left.\frac{\partial f}{\partial \mathbf{x}}\right|_{\hat{\mathbf{x}}_{k-1|k-1}}, \qquad \mathbf{H}_k = \left.\frac{\partial h}{\partial \mathbf{x}}\right|_{\hat{\mathbf{x}}_{k|k-1}}
$$

These Jacobians are substituted into the standard KF equations. The resulting estimator is no longer optimal even under Gaussian noise, but is computationally identical in structure to the KF.

<div class="pros-cons">
  <div class="kf-col kf-pros">
    <div class="kf-col-label">Strengths</div>
    <ul>
      <li>Handles mildly nonlinear systems well</li>
      <li>Same $\mathcal{O}(n^2 m + m^3)$ complexity as KF</li>
      <li>Widely implemented; mature tooling ecosystem</li>
      <li>Suitable for real-time embedded systems</li>
    </ul>
  </div>
  <div class="kf-col kf-cons">
    <div class="kf-col-label">Limitations</div>
    <ul>
      <li>Linearisation error can cause filter divergence for strongly nonlinear models</li>
      <li>Requires analytic Jacobians — error-prone to derive and implement</li>
      <li>Covariance estimates can become inconsistent</li>
      <li>Poor performance when the posterior is non-Gaussian</li>
    </ul>
  </div>
</div>

**Canonical use cases:** Inertial navigation systems, SLAM (simultaneous localisation and mapping), orbit determination, robot pose tracking in low-curvature environments.

---

## 4. The Unscented Kalman Filter (UKF)

The UKF [3] takes a fundamentally different approach to nonlinearity. Rather than linearising the model, it propagates a small, deterministic set of points — **sigma points** — through the exact nonlinear functions and reconstructs the posterior statistics from the transformed set.

A set of $2n+1$ sigma points $\{\boldsymbol{\chi}_i\}$ is chosen to match the mean and covariance of the prior exactly. After propagation through $f$ (or $h$), the predicted mean and covariance are recovered as weighted sums:

$$
\hat{\mathbf{x}}_{k|k-1} = \sum_{i=0}^{2n} W_i^m \, f(\boldsymbol{\chi}_i)
$$

$$
\mathbf{P}_{k|k-1} = \sum_{i=0}^{2n} W_i^c \left[f(\boldsymbol{\chi}_i) - \hat{\mathbf{x}}_{k|k-1}\right]\!\left[f(\boldsymbol{\chi}_i) - \hat{\mathbf{x}}_{k|k-1}\right]^\top + \mathbf{Q}_k
$$

This approach, known as the **Unscented Transform**, captures mean and covariance to at least second-order accuracy — one order better than the EKF — without requiring any derivatives.

<div class="pros-cons">
  <div class="kf-col kf-pros">
    <div class="kf-col-label">Strengths</div>
    <ul>
      <li>Second-order accuracy in mean and covariance propagation</li>
      <li>No Jacobians required — simpler to implement for complex models</li>
      <li>More robust to strong nonlinearities than the EKF</li>
      <li>Better covariance consistency in practice</li>
    </ul>
  </div>
  <div class="kf-col kf-cons">
    <div class="kf-col-label">Limitations</div>
    <ul>
      <li>Complexity scales as $\mathcal{O}(n^3)$ — costly for high-dimensional state vectors</li>
      <li>Sigma point placement can be numerically problematic for near-singular covariances</li>
      <li>Still assumes Gaussian posterior; fails for multimodal distributions</li>
      <li>Tuning parameters ($\alpha$, $\beta$, $\kappa$) require domain knowledge</li>
    </ul>
  </div>
</div>

**Canonical use cases:** Spacecraft attitude estimation, terrain-referenced navigation, sensor fusion with highly nonlinear measurement models (e.g., bearing-only tracking), neural network parameter estimation.

---

## 5. The Particle Filter (PF)

The particle filter [4] — also known as **Sequential Monte Carlo (SMC)** — makes no Gaussian or parametric assumption about the posterior. It represents $p(\mathbf{x}_k \mid \mathbf{z}_{1:k})$ as a weighted empirical distribution over $N$ **particles** $\{\mathbf{x}_k^{(i)}, w_k^{(i)}\}_{i=1}^N$:

$$
p(\mathbf{x}_k \mid \mathbf{z}_{1:k}) \approx \sum_{i=1}^{N} w_k^{(i)} \, \delta\!\left(\mathbf{x}_k - \mathbf{x}_k^{(i)}\right)
$$

At each step, particles are propagated through the process model, re-weighted by the likelihood of the observation, and **resampled** to prevent weight degeneracy. The posterior mean and other statistics are extracted as weighted averages. Convergence to the true posterior is guaranteed as $N \to \infty$ by the law of large numbers.

<div class="pros-cons">
  <div class="kf-col kf-pros">
    <div class="kf-col-label">Strengths</div>
    <ul>
      <li>Handles arbitrary nonlinearity and non-Gaussian noise</li>
      <li>Naturally represents multimodal posteriors</li>
      <li>Asymptotically exact as $N \to \infty$</li>
      <li>Flexible: any process or measurement model can be used</li>
    </ul>
  </div>
  <div class="kf-col kf-cons">
    <div class="kf-col-label">Limitations</div>
    <ul>
      <li>$\mathcal{O}(N \cdot n)$ per step — computationally expensive; $N$ may need to be very large</li>
      <li>Suffers from the <em>curse of dimensionality</em>: particle count grows exponentially with state dimension</li>
      <li>Weight degeneracy and sample impoverishment without careful resampling strategies</li>
      <li>Non-deterministic output; results vary between runs</li>
    </ul>
  </div>
</div>

**Canonical use cases:** Robot localisation in cluttered environments, target tracking with multimodal ambiguity, fault detection with discrete failure modes, finance (stochastic volatility estimation).

---

## 6. Comparative Summary

<div class="table-wrap">
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>KF</th>
      <th>EKF</th>
      <th>UKF</th>
      <th>PF</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>System linearity</td>
      <td>Linear only</td>
      <td>Mildly nonlinear</td>
      <td>Moderately nonlinear</td>
      <td>Arbitrary</td>
    </tr>
    <tr>
      <td>Noise assumption</td>
      <td>Gaussian</td>
      <td>Gaussian</td>
      <td>Gaussian</td>
      <td>Arbitrary</td>
    </tr>
    <tr>
      <td>Posterior representation</td>
      <td>Exact Gaussian</td>
      <td>Approx. Gaussian</td>
      <td>Approx. Gaussian</td>
      <td>Empirical (particles)</td>
    </tr>
    <tr>
      <td>Optimality</td>
      <td>MMSE optimal</td>
      <td>Suboptimal</td>
      <td>Suboptimal</td>
      <td>Asymptotically exact</td>
    </tr>
    <tr>
      <td>Complexity (per step)</td>
      <td>$\mathcal{O}(n^2 m)$</td>
      <td>$\mathcal{O}(n^2 m)$</td>
      <td>$\mathcal{O}(n^3)$</td>
      <td>$\mathcal{O}(N \cdot n)$</td>
    </tr>
    <tr>
      <td>Derivatives required</td>
      <td>No</td>
      <td>Yes (Jacobians)</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Multimodal posteriors</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Deterministic</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Real-time suitability</td>
      <td>Excellent</td>
      <td>Excellent</td>
      <td>Good</td>
      <td>Limited (high $N$)</td>
    </tr>
  </tbody>
</table>
</div>

---

## 7. Relationships Between the Filters

The four filters form a natural hierarchy. The **KF** sits at the apex: exact, efficient, but restricted. The **EKF** relaxes the linearity requirement by first-order approximation at no additional asymptotic cost, but sacrifices optimality and introduces numerical risk. The **UKF** replaces linearisation with deterministic sampling, achieving higher-order accuracy at the cost of $\mathcal{O}(n^3)$ operations and with no gain in distributional generality. Finally, the **PF** abandons the Gaussian assumption entirely, achieving the most expressive posterior representation at substantial computational cost.

A useful mental model: the KF, EKF, and UKF all maintain a **unimodal Gaussian belief** — they differ only in how precisely they propagate it through nonlinear maps. The PF discards this constraint, making it the method of choice whenever the posterior is genuinely multimodal or heavy-tailed, but demanding significantly more computation in return.

It is also worth noting that practical systems frequently combine these approaches. The **Rao-Blackwellised particle filter** (RBPF) [5] applies the KF analytically to the linear subsystem of a conditionally linear model while using particles only for the nonlinear component — reducing the required particle count substantially and illustrating that the boundaries between these classes are not always hard.

---

## 8. Selection Guide

The following heuristic covers the majority of practical scenarios:

1. **Is the system linear?** → Use the **KF**.
2. **Is the system mildly nonlinear with a unimodal posterior and analytic Jacobians?** → Use the **EKF**.
3. **Is the system strongly nonlinear or are Jacobians intractable?** → Use the **UKF**, provided $n$ is not too large ($n \lesssim 20$ is a reasonable rule of thumb).
4. **Is the posterior multimodal, the noise non-Gaussian, or the model highly complex?** → Use the **PF**, with $N$ chosen to balance accuracy against real-time constraints.

---

## References

<div class="references">

[1] Kalman, R. E. (1960). "A New Approach to Linear Filtering and Prediction Problems." *Journal of Basic Engineering*, 82(1), 35–45.

[2] Anderson, B. D. O., & Moore, J. B. (1979). *Optimal Filtering*. Prentice-Hall. *(Standard reference for EKF derivation.)*

[3] Julier, S. J., & Uhlmann, J. K. (1997). "A New Extension of the Kalman Filter to Nonlinear Systems." *Proceedings of AeroSense: The 11th International Symposium on Aerospace/Defense Sensing, Simulation and Controls*, 3068, 182–193.

[4] Doucet, A., de Freitas, N., & Gordon, N. (Eds.). (2001). *Sequential Monte Carlo Methods in Practice*. Springer, New York.

[5] Doucet, A., de Freitas, N., Murphy, K., & Russell, S. (2000). "Rao-Blackwellised Particle Filtering for Dynamic Bayesian Networks." *Proceedings of the 16th Conference on Uncertainty in Artificial Intelligence (UAI)*, 176–183.

</div>
