---
layout: post
title: "Rotation Matrix Construction"
category: [tutorials, guides]
image: assets/images/posts/tutorial.png
# featured: true
---

This a quick guide to creating a rotation matrix, mainly for the purpose of coordinate transformations.

## Basic Introduction

Rotation matrix in $$SO(3)$$ is a linear transformation from one coordinate frame to another.
Let $$e$$ and $$b$$ be some arbitrary Euclidean coordinate frames, and $$x^e$$ and $$x^b$$ be vectors represented in those coordinate frame, respectively.

The rotation $$R^e_b$$ represents the rotation of frame $$b$$, relative to frame $$e$$.
Though counter-intuitive, if we pre-multiply a vector in $$b$$ frame ($$x^b$$) by this matrix, the resulting vector is how the $$x^b$$ is represented in frame $$e$$.
That is,

$$x^e = R^e_b · x^b.$$

Given the properties of $$SO(3)$$, the inverse of $$R^e_b$$ is simply the transpose of it.
That is,

$$R^b_e = (R^e_b)^T.$$

This $$R^b_e$$ can be used transform a vector in frame $$e$$ to frame $$b$$.


## Constructing the Rotation Matrix

Let's construct the matrix $$R^e_b$$.

<br>
<figure>
    <img src="/assets/images/posts/rotation-matrix-construction/coordinate-frames.png" alt="Coordinate frames">
    <figcaption><i>Definitions of e-frame and b-frame</i></figcaption>
</figure>
<br>

Consider the frames defined above.
In this figure, each of $$e_i$$ and $$b_i$$ are unit vectors.
As mentioned above, $$R^e_b$$ represents the rotation of the $$b$$ frame relative to the $$e$$ frame.
In other words, $$i$$-th column of $$R^e_b$$ represents the direction of $$b_i$$ with respect to the frame $$e$$.

<!-- For example,
$$b_1 = R^e_b(1,1)\cdot e_1 + R^e_b(2,1)\cdot e_2 + R^e_b(3,1)\cdot e_3.$$ -->


Let's start with $$b_1$$.
This vector is facing $$-e_3$$ direction, and no projection on $$e_1$$ or $$e_2$$.
So, the vector $$b_1$$ in $$e$$ frame can be written as

$$
b_1 =
\begin{bmatrix} 
0 \\
0 \\
-1
\end{bmatrix}.
$$

Similarly, $$b_2$$ can be written as

$$
b_2 =
\begin{bmatrix} 
0 \\
-1 \\
0
\end{bmatrix},
$$

and $$b_3$$ can be written as

$$
b_3 =
\begin{bmatrix} 
-1 \\
0 \\
0
\end{bmatrix}.
$$

Combining all above vectors, the rotation of $$b$$ frame relative to $$e$$ frame, or $$R^e_b$$, can be written as

$$
R^e_b =
\begin{bmatrix} 
0 &  0 & -1 \\
0 & -1 & 0 \\
-1 &  0 &  0
\end{bmatrix}.
$$

<!--  ## Verifying the Rotation Matrix

If you are still not sure, the easiest way to verify your rotation matrix is to do a transformation.
We know that, if we pre-multiply a vector in $$b$$ frame by $$R^e_b$$, it is transformed to the $$e$$ frame.

Let's take $b_1$.
This in $$b$$ frame is
```
[ 1]
[ 0]
[ 0].
```

Pre-multiply this by $$R^e_b$$, we get
```
[ 0]
[ 0]
[-1],
```
which makes sense.
If you repeat the same calculation for $b_2$ and $b_3$, you will see similar results. -->
