---
layout: post
title: "Vision-Based Autonomous Landing of a UAV on a Moving Ship"
category: [research, hardware, uav, control, gps-denied, shipboard-landing, computer-vision, projects]
image: assets/images/posts/shipboard_landing/vision-based-landing.png
featured: true
---

This is an extension of the [Autonomous Landing of a UAV on a Moving Ship]({{site.baseurl}}/shipboard-landing/) project.
Here, a GPS-denied environment is assumed and a vision-based localization method is utilized.

A monocular monochrome camera (Point Grey Chameleon camera) with a global shutter was mounted on the UAV.
Although the camera was capable of handling a USB 3.0 connection, a USB 2.0 cable was used between the camera and the computing module to avoid interferences with the GPS signals.
Further, the camera frame rate was reduced to 15 FPS given the limited bandwidth of the USB 2.0 connection.
To compensate for the added weight of the camera hardware, an octocopter was used as the UAV.

<figure>
    <img src="{{site.baseurl}}/assets/images/posts/shipboard_landing/octo.jpg" alt="Octocopter UAV">
    <figcaption>Developed octocopter UAV for autonomous operations in ocean environments</figcaption>
</figure>

The objective is to adopt a method that is robust and computationally-efficient for real-time localization with the onboard computing. 
As such, an optimization-based tightly-coupled visual-inertial odometry method was utilized for vision processing to integrate inertial measurements and image data, while using semi-direct visual odometry (SVO) proposed in [RPG-SVO library](https://github.com/uzh-rpg/rpg_svo_pro_open) as the image processing front end.

This library was modified to be compiled in the Jetson TX2, which is based on the ARM architecture.
While the localization in the RPG SVO-library was fast compared to other existing visual-inertial odometry methods, there exists a non-trivial delay as it is executed on the low powered Jetson TX2 running multiple threads. 
To address this, the vision-position was integrated though the delay-corrected extended Kalman filter.

<figure>
    <img src="{{site.baseurl}}/assets/images/posts/shipboard_landing/vision-based-landing.png" alt="Vision-Based UAV Shipboard Landing">
    <figcaption>Developed UAV during real-time flight tests on the US Naval Academy research vessel YP689 at the Chesapeake Bay, MD</figcaption>
</figure>

With the above UAV platform, the flight tests were performed onboard the US Naval Academy research vessel YP689 at Chesapeake Bay.
All the computations, including the estimation, control, vision-processing and motor control were processed inside the single onboard computer, Jetson TX2.
The results of this paper has been published in the journal paper "Delayed Kalman filter for vision-based autonomous flight in ocean environments" published in Control Engineering Practice [DOI: [10.1016/j.conengprac.2023.105791](https://doi.org/10.1016/j.conengprac.2023.105791)].

**Features**
* Jetson TX2 as the onboard computer
* In-house developed multi-threaded C++ code
* In-house developed geometric decoupled-yaw controller [[paper](https://doi.org/10.23919/ACC.2019.8815189)]
* In-house developed delayed Kalman filter as the estimator [[paper](https://doi.org/10.1109/TAES.2021.3061795)]
* Sensors: IMU - VN100; GPS - SwiftNav Piksi Multi; Camera - Point Grey Chameleon
* Custom designed PCB for voltage regulation, sensor/ESC communication with the TX2
* TCP/IP connection through Wi-Fi for UAV communication for sending commands/real-time data monitoring
* Water-tight encloser for the components
* Thermal solution for removing heat from the encloser


<br>
Below video shows the developed system being operated  off of US Naval Academy research vessel YP689 at Chesapeake Bay.

<div class="video-container">
<iframe src="https://www.youtube.com/embed/v8euxR5UpUY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

<br>
<br>