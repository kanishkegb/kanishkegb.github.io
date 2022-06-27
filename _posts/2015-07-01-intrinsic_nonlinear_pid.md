---
layout: posts
title: "Implementing an Intrinsic Nonlinear PID Controller"
date: 2015-07-01
category: [news]
tags: [research, hardware, uav, quadrotor, projects]
---

For the final year undergrad group project at the Mechanical Engineering Department at the University of Peradeniya, I was involved in an implementation of an intrinsic nonlinear PID controller for a quadrotor UAV.

The implemented controller is developed directly on the configuration space and does not suffer from issues related to local attitude coordinate systems such as Euler angles or quaternions.
Also, this controller estimates the gyro bias which is common in low-cost off the shelf IMUs.
An Arduino based Multi-Wii flight controller was used as the flight controller and the implementation was tested and verified with real-time flight tests.

<figure>
    <img src="/assets/images/intrinsic_pid_flight_test.png" alt="Large roll angle flight test">
    <img src="/assets/images/intrinsic_pid_large_roll.png" alt="Large roll angle test results">
    <figcaption>The UAV during a 90 degree roll</figcaption>
</figure>

Further, as a part of this project, an OS independent GUI was developed for real-time data visualization.
This utilized the OpenGL to draw 3D objects, the Boost library to communicate with the serial port, and the wxWidget library to realize the GUI.

<figure>
    <img src="/assets/images/intrinsic_pid_gui.png" alt="GUI">
    <figcaption>The GUI developed for real-time data monitoring</figcaption>
</figure>

**Features**
* Multi-Wii as the onboard computer
* In-house developed controller for UAV control [[paper](https://doi.org/10.1109/ICIINFS.2015.7399049)]
* Platform independent GUI with real-time data monitoring

Below video shows the quadrotor during a fligh test at the University of Peradeniya, using the implemented nonlinear UAV controller.


{% include video id="k5eI8baoQec" provider="youtube" %}

<br>
<br>