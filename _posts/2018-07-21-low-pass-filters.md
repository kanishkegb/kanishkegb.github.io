---
layout: post
title: "Low-Pass Filters"
category: [tutorials, filters]
image: assets/images/posts/filters/low-pass-filter.png
---

Low-pass filters are basically an upgrade from the [Averaging filters]({{site.baseurl}}/averaging-filters/).
If you are not familiar with averaging filter, may be it is a good idea to go through them first.

Usually, the noise is in high frequency bands.
The low-pass filter is designed to pass-through low frequency signals, while blocking high frequency signals, hence the name "low-pass filter".

The moving average filter has the same weight for all measurements.
However, in reality, the most recent measurements have more to say about the current state.
The low-pass filter overcome this by using a heavier weight on the most recent data.

The first order low-pass filter can be written as follows with $$0 < \alpha < 1$$.

$$
x_k = \alpha \cdot x_{k - 1} + (1 - \alpha) \cdot x_k
$$

This is a bit similar to average filter, but $$\alpha$$ can be set arbitrarily.
Higher $$\alpha$$  (closer to 1) means less noise, but lags, while lower $$\alpha$$ (closer to 0) means less lag, but noisy.


The first order low-pass filter in Laplace domain is:

$$
\frac{Y(s)}{X(s)} = K \cdot \frac{1}{\tau s + 1}
$$

<br>

**Examples**

<br>
<figure>
    <img src="/assets/images/posts/filters/low-pass-filter.png" alt="Low-pass filter">
    <figcaption><i>Comparison between the low-pass filter (α=0.75) and the moving average filter: the low-pass filter (n=5) has a lesser lag compared to the moving average filter, bit more susceptible to the noise.</i></figcaption>
</figure>
<br>


<br>
<figure>
    <img src="/assets/images/posts/filters/low-pass-filter-comparison.png" alt="Low-pass filter comparison">
    <figcaption><i>Comparison between low-pass filter with different α values: high α value (green line with α=0.9) smoothens out the data more but has a lag, low α value (red line with α=0.4) has a lesser lag but affected more by the noise.</i></figcaption>
</figure>
<br>


## See Also
- [Averaging filters]({{site.baseurl}}/averaging-filters/)

## References

1. Kim, P. (2011). *Kalman Filter for Beginners: with MATLAB Examples*. CreateSpace Independent Publishing Platform