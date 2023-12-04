---
layout: post
title: "Implementing an Intrinsic Nonlinear PID Controller"
category: [research, hardware, uav, quadrotor, projects]
image: assets/images/posts/intrinsic_nonlinear_pid/flight_test.png
---

For the final year undergrad group project at the Mechanical Engineering Department at the University of Peradeniya, I was involved in an implementation of an intrinsic nonlinear PID controller for a quadrotor UAV.

The implemented controller is developed directly on the configuration space and does not suffer from issues related to local attitude coordinate systems such as Euler angles or quaternions.
Also, this controller estimates the gyro bias which is common in low-cost off the shelf IMUs.
An Arduino based Multi-Wii flight controller was used as the flight controller and the implementation was tested and verified with real-time flight tests.

<figure>
    <img src="/assets/images/posts/intrinsic_nonlinear_pid/large_roll.png" alt="Large roll angle test results">
    <figcaption>The UAV during a 90 degree roll</figcaption>
</figure>

Further, as a part of this project, an OS independent GUI was developed for real-time data visualization.
This utilized the OpenGL to draw 3D objects, the Boost library to communicate with the serial port, and the wxWidget library to realize the GUI.

<figure>
    <img src="/assets/images/posts/intrinsic_nonlinear_pid/gui.png" alt="GUI">
    <figcaption>The GUI developed for real-time data monitoring</figcaption>
</figure>

**Features**
* Multi-Wii as the onboard computer
* In-house developed controller for UAV control [[paper](https://doi.org/10.1109/ICIINFS.2015.7399049)]
* Platform independent GUI with real-time data monitoring

Below video shows the quadrotor during a flight test at the University of Peradeniya, using the implemented nonlinear UAV controller.


<div class="video-container">
<iframe src="https://www.youtube.com/embed/k5eI8baoQec" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

<br>
<br>