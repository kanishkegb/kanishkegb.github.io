---
layout: post
title: "Averaging Filters"
category: [tutorials, filters]
image: assets/images/posts/filters/moving-average-filter.png
---

Any practical measurement has a some level of noise.
To meaningfully utilize such measurements, we need to "filter" these noise levels.
This is where filters are useful.
There are a few commonly used filters, and this post discusses the most basic ones.

## Simple Average Filter

Simple averaging can be one of the simplest form of filtering.
Here, all of the measurements are used to calculate their mean value.
Assume that the measurement at `k`-th time step is `x_k`.
Then, the output of the average filter takes the form: 
```
x_k = (x_1 + x_2 + ... + x_k) / k
```

However, you may notice that for this calculation, you need to keep a log of all the measurements so far, starting from `k = 0`.
To avoid that, the above expression can be re-arranged as:
```
x_k = (k - 1)/k · x_{k - 1} + 1/k · x_k
```

If we let `α = (k - 1)/k`, we can further simplify the above expression to:
```
x_k = α · x_{k - 1} + (1 - α) · x_k
```

This is referred to as the **recursive averaging equation**.

<br>

**Example**

Consider the following example, adopted from the Reference 1 at the bottom of this page.
A voltmeter measures a constant voltage of 14 V.
The measurement noise is modeled as a white noise of 0 V mean and a standard deviation of 2 V.

<br>
<figure>
    <img src="/assets/images/posts/filters/average-filter.png" alt="Average filter">
    <figcaption><i>Voltage measured by a sensor, filtered by an averaging filter: with time the averaged value converges to the measured constant value.</i></figcaption>
</figure>
<br>


**Pros and Cons**

As shown in the above figure, the value converges to the actual value, even in the presence of large sensor noise.
Also, the algorithm is simple and computationally inexpensive.

However, since this averages all past data, the filtered is heavily weighted by them. 
This works fine for a constant measurement, but if the measured state changes with time, average filter is going to provide seriously lagged output.
Check the following section for visualizations.


## Moving Average Filter

Moving average filter is similar to the average filter, but only considers the few most recent data sets.
This way, the past data does not weigh down the filtered data as much as the averaging filter.
The equation for `n`-moving average filter:
```
x_k = (x_{k - (n - 1)} + x_{k - (n - 2)} + ... + x_k) / n
```

We can re-arrange this to get a cleaner looking moving average filter equation:
```
x_k = x_{k - 1} + (x_k - x_{k - n})/n
```

<br>

**Example**

Consider a case where the moving average filter applied to noisy sinusoidal data.

<br>
<figure>
    <img src="/assets/images/posts/filters/moving-average-filter.png" alt="Moving average filter">
    <figcaption><i>Voltage measured by a sensor, filtered by both the average filter and the moving average filter.</i></figcaption>
</figure>
<br>

Here, the measured value changes at a faster phase. 
The averaging filter we discussed in the previous section cannot keep up with the rate of change. 
However, the moving average filter deal with the situation better, with a slight lag.

It is also important to note that when the number of averaging points increases, it provides a better noise reductions, but increases the delay in responding to the changes.

## See Also
- [Low-pass filter]({{site.baseurl}}/low-pass-filters/)

## References

1. Kim, P. (2011). *Kalman Filter for Beginners: with MATLAB Examples*. CreateSpace Independent Publishing Platform