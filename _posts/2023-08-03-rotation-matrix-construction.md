---
layout: post
title: "Rotation Matrix Construction"
category: [tutorials, guides]
image: assets/images/posts/tutorial.png
# featured: true
---

This a quick guide to creating a rotation matrix, mainly for the purpose of coordinate transformations.

## Basic Introduction

Rotation matrix in `SO(3)` is a linear transformation from one coordinate frame to another.
Let `e` and `b` be some arbitrary Euclidean coordinate frames, and `x_e` and `x_b` be vectors represented in those coordinate frame, respectively.

The rotation `R_eb` represents the rotation of frame `e`, relative to frame `b`.
If we pre-multiply a vector in `b` frame (`x_b`) by this matrix, the resulting vector is how the `x_b` is represented in frame `e`.
That is,
```
x_e = R_eb · x_b .
```

Given the properties of `SO(3)`, the inverse of `R_eb` is simply the transpose of it.
That is,
```
R_be = R_eb^T .
```

This `R_be` can be used transform a vector in frame `e` to frame `b`.


## Constructing the Rotation Matrix

Let's construct the matrix `R_eb`.

<br>
<figure>
    <img src="/assets/images/posts/rotation-matrix-construction/coordinate-frames.png" alt="Coordinate frames">
    <figcaption><i>Definitions of e-frame and b-frame</i></figcaption>
</figure>
<br>

Consider the frames defined above.
In this figure, each of `ei` and `bi` are unit vectors.
As mention above, this represents the rotation of the `e` frame relative to the `b` frame.
All we have to do is define each of the axes of `e` frame in `b` frame.

Let's start with `e1`.
This vector is facing `-b3` direction, and no projection on `b1` or `b2`.
So, the vector `e1` in `b` frame can be written as
```
[ 0]
[ 0]
[-1].
```

Similarly, `e2` can be written as
```
[ 0]
[-1]
[ 0],
```
and `e3` can be written as
```
[-1]
[ 0]
[ 0].
```

Combining all above vectors, `e` frame relative to `b` frame, or `R_eb`, can be written as
```
       [ 0,  0, -1]
R_eb = [ 0, -1,  0]
       [-1,  0,  0].
```

## Verifying the Rotation Matrix

If you are still not sure, the easiest way to verify your rotation matrix is to do a transformation.
We know that, if we pre-multiply a vector in `b` frame by `R_eb`, it is transformed to the `e` frame.

Let's take `b1`.
This in `b` frame is
```
[ 1]
[ 0]
[ 0].
```

Pre-multiply this by `R_eb`, we get
```
[ 0]
[ 0]
[-1],
```
which makes sense.
If you repeat the same calculation for `b2` and `b3`, you will see similar results.