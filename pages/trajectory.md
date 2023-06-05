---
layout: page
title: Jerk-Limited Trajectory
permalink: "/trajectory/"
# image: assets/images/screenshot.png
---

This plot shows the position, velocity, acceleration, and jerk as a function of time for a 1-dimensional jerk-limited trajectort starting with all zero, except a positive jerk of 4 m/s^3.
Then it reaches a maximum accelration limit of 5 m/s^2, and stays there for a second.
After that, the a negative jerk of 4 m/s^3 is applied until the acceleration is reached 0 m/s^2.

In other words, the object starts stationary, and reaches a constant velocity of 11.25 m/s, in a jerk-limited fashion.

{% include_relative jerk_limited_trajectory.html %} 
