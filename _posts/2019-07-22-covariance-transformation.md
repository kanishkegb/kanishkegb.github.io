---
layout: post
title: "Covariance Transformation Between Coordinate Frames"
tags: [estimation, linear-algebra, navigation, reference]
excerpt: "A concise reference for transforming a covariance matrix from one coordinate frame to another via a rotation matrix, with derivation and worked example."
---

Covariance matrices are frame-dependent: a covariance expressed in frame $A$ is generally not valid in frame $B$. This article derives the transformation rule and summarizes the key result.

## Setup

Let $\mathbf{x}^A \in \mathbb{R}^n$ be a random vector expressed in frame $A$, with covariance

$$
P^A = \mathbb{E}\!\left[(\mathbf{x}^A - \boldsymbol{\mu}^A)(\mathbf{x}^A - \boldsymbol{\mu}^A)^\top\right].
$$

Let $R \in \mathbb{R}^{n \times n}$ be the rotation (or, more generally, linear) matrix that maps vectors from frame $A$ to frame $B$:

$$
\mathbf{x}^B = R\,\mathbf{x}^A.
$$

The goal is to find $P^B$, the covariance of $\mathbf{x}^B$ in frame $B$.

---

## Derivation

Define the zero-mean deviation $\delta\mathbf{x}^A = \mathbf{x}^A - \boldsymbol{\mu}^A$. Under the linear map $R$, the corresponding deviation in frame $B$ is

$$
\delta\mathbf{x}^B = R\,\delta\mathbf{x}^A.
$$

Substituting into the definition of covariance:

$$
P^B = \mathbb{E}\!\left[\delta\mathbf{x}^B\,(\delta\mathbf{x}^B)^\top\right]
     = \mathbb{E}\!\left[R\,\delta\mathbf{x}^A\,(\delta\mathbf{x}^A)^\top R^\top\right].
$$

Since $R$ is deterministic, it factors out of the expectation:

$$
\boxed{P^B = R\,P^A\,R^\top.}
$$

This result holds for any invertible linear map $R$, not just rotations. For a pure rotation, $R^\top = R^{-1}$, so $P^B$ is guaranteed to remain symmetric positive semi-definite whenever $P^A$ is.

---

## Inverse Transformation

Given $P^B$, recovering $P^A$ follows by applying $R^{-1}$ (or $R^\top$ for rotations):

$$
P^A = R^\top P^B\, R.
$$

This is simply the same formula with $R$ replaced by $R^{-1}$.

---

## Partial Rotation (Subspace Case)

When only a subset of the state vector is rotated — for instance, the 3-D position block within a larger navigation state — construct the full transformation matrix $\mathcal{R}$ by embedding $R_{3\times3}$ into the identity:

$$
\mathcal{R} = \begin{pmatrix} R & \mathbf{0} \\ \mathbf{0} & I \end{pmatrix}, \qquad P^B = \mathcal{R}\,P^A\,\mathcal{R}^\top.
$$

The off-diagonal blocks of $P^A$ coupling the rotated subspace to the rest are transformed consistently, which is the key advantage of applying the full sandwich product rather than rotating only the diagonal block.

---

## Worked Example

**Given.** A 2-D position covariance in a body frame $A$:

$$
P^A = \begin{pmatrix} 4 & 1 \\ 1 & 2 \end{pmatrix} \text{ m}^2,
$$

and a rotation of $\theta = 30°$ counter-clockwise to a world frame $B$:

$$
R = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \phantom{-}\cos\theta \end{pmatrix}
  = \begin{pmatrix} \tfrac{\sqrt{3}}{2} & -\tfrac{1}{2} \\ \tfrac{1}{2} & \phantom{-}\tfrac{\sqrt{3}}{2} \end{pmatrix}.
$$

**Compute $P^B = R P^A R^\top$.**

First, $R P^A$:

$$
R P^A = \begin{pmatrix} \tfrac{\sqrt{3}}{2}(4) + (-\tfrac{1}{2})(1) & \tfrac{\sqrt{3}}{2}(1) + (-\tfrac{1}{2})(2) \\ \tfrac{1}{2}(4) + \tfrac{\sqrt{3}}{2}(1) & \tfrac{1}{2}(1) + \tfrac{\sqrt{3}}{2}(2) \end{pmatrix}
= \begin{pmatrix} 2\sqrt{3}-\tfrac{1}{2} & \tfrac{\sqrt{3}-2}{2} \\ 2+\tfrac{\sqrt{3}}{2} & \tfrac{1+2\sqrt{3}}{2} \end{pmatrix}.
$$

Then right-multiply by $R^\top$ and evaluate numerically:

$$
P^B \approx \begin{pmatrix} 3.10 & 2.10 \\ 2.10 & 2.90 \end{pmatrix} \text{ m}^2.
$$

Note that $\operatorname{tr}(P^B) = 6.00 = \operatorname{tr}(P^A)$, as expected — trace is invariant under similarity transforms with orthogonal matrices.

---

## Summary

<div class="cov-summary">
  <table>
    <thead>
      <tr><th>Quantity</th><th>Expression</th></tr>
    </thead>
    <tbody>
      <tr><td>Forward transform</td><td>$$P^B = R\,P^A\,R^\top$$</td></tr>
      <tr><td>Inverse transform</td><td>$$P^A = R^\top P^B\, R$$</td></tr>
      <tr><td>Preserves symmetry?</td><td>Yes, for any $R$</td></tr>
      <tr><td>Preserves positive semi-definiteness?</td><td>Yes, for any invertible $R$</td></tr>
      <tr><td>Preserves trace?</td><td>Yes, iff $R$ is orthogonal ($R^\top = R^{-1}$)</td></tr>
      <tr><td>Preserves determinant?</td><td>Yes, iff $|\det R| = 1$</td></tr>
    </tbody>
  </table>
</div>

<style>
.cov-summary {
  margin: 1.5rem 0;
  overflow-x: auto;
}

.cov-summary table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.cov-summary th,
.cov-summary td {
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--border);
  text-align: left;
  vertical-align: middle;
}

.cov-summary th {
  background: var(--bg-alt);
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.cov-summary td:first-child {
  color: var(--text-muted);
  font-size: 0.85rem;
  white-space: nowrap;
}

.cov-summary .katex-display {
  margin: 0.25rem 0;
}
</style>

---

## Common Pitfalls

**Applying $R$ to only the diagonal.** Rotating only the diagonal variances while ignoring off-diagonal covariances is incorrect and produces an inconsistent (non-positive-definite) result in general. Always apply the full sandwich product.

**Using the wrong convention for $R$.** Verify whether $R$ maps $A \to B$ or $B \to A$ before applying the formula. If $R$ maps $B \to A$, transpose it first.

**Confusing coordinate frame rotation with body rotation.** A rotation of the coordinate frame by $+\theta$ is equivalent to rotating the body by $-\theta$. The transformation formula is the same; only the sign of $\theta$ in $R$ changes.