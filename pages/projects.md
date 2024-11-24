---
layout: page
permalink: "/projects/"
title: "Projects"
# image: assets/images/screenshot.png
---

Here are a few of the projects I have been involved in.
Most of the work here were completed when I was in [Flight Dynamics and Control Lab](https://www2.seas.gwu.edu/~tylee/) at GWU.

## Autonomous Landing of a UAV on a Moving Ship

<div class="video-container">
<iframe src="https://www.youtube.com/embed/o3fbh8TyZOs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

I developed a UAV and its estimator/controller system for autonomous landing of a UAV on a moving ship, which includes estimating and compensating for the disturbances incurred by the ship's air wake. 
Further, after noticing that there is a delay in GPS position measurement, I augmented the estimator to forward propagate the delayed measurements to the correct time horizon using IMU measurements. 
All these improvements have been tested in a successful autonomous landing of a UAV on a US Naval Academy research vessel at Chesapeake bay.

**Features**
* Jetson TX2 as the onboard computer
* In-house developed multi-threaded C++ code
* In-house developed geometric decoupled-yaw controller [[paper](https://doi.org/10.23919/ACC.2019.8815189)]
* In-house developed delayed Kalman filter as the estimator [[paper](https://doi.org/10.1109/TAES.2021.3061795)]
* Sensors: IMU - VN100; GPS - SwiftNav Piksi Multi
* Custom designed PCB for voltage regulation, sensor/ESC communication with the TX2
* TCP/IP connection through Wi-Fi for UAV communication for sending commands/real-time data monitoring
* Water-tight encloser for the components
* Thermal solution for removing heat from the encloser

[↑ back to top](#top)


## Decoupled-Yaw Geometric Controllers for Unmanned Aerial Vehicles

<div class="video-container">
<iframe src="https://www.youtube.com/embed/w4UcEp5jb0E" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

I developed a geometric control algorithm to reduce the trajectory errors when an unmanned aerial vehicle (UAV) follows a path with large yaw angle rotations, such as scanning an area for mapping. 
The decoupling of yaw significantly reduced the error, and its efficacy has demonstrated by autonomous UAV flight tests in both indoor (using motion capture) and outdoor (with GPS positioning) settings.
This has been further augmented to include an adaptive controller, making the UAV control more robust in heavy disturbances such as strong wind.

**Features**
* Same custom-developed hardware/software system as the UAV used in [Autonomous Landing](#autonomous-landing-of-a-uav-on-a-moving-ship) project
* Use Vicon motion capture system for position data
* TCP/IP connection through Wi-Fi for UAV communication for sending commands/real-time data monitoring

[↑ back to top](#top)


## Ship Air-Wake Detection Using Unmanned Aerial Vehicles 

<div class="video-container">
<iframe src="https://www.youtube.com/embed/9FUpj1PZaP8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

I have developed several hardware and software systems to detect ship air-wake of a ship using unmanned aerial vehicles (UAVs) as a collaboration between GWU and US Naval Academy. 
This includes a data package to measure the wind speed behind a ship using an octocopter and a fixed-wing aircraft. 
The data package can measure the relative position of the UAV relative to the ship up to 2 cm accuracy, and includes a telemetry/software system for real time monitoring. 
The data has been collected using US Naval Academy research vessel YP 700 at Chesapeake Bay.

**Features**
* Raspberry-Pi as the onboard computer
* Arduino-based system for reading and logging pilot RC commands
* In-house developed multi-threaded Python code
* In-house developed Kalman filter for sensor fusion [[paper](https://doi.org/10.2514/6.2019-2377)]
* Sensors: Anemomters - AT Type A, Anemoment TriSonica Mini; IMU - VN100; GPS - SwiftNav Piksi Multi
* Custom designed PCB for voltage regulation, sensor communication with the Raspberry-Pi
* TCP/IP connection through Wi-Fi for UAV communication for sending commands/real-time data monitoring
* Water-tight encloser for the components
* Real-time data monitoring and plotting on the base laptop

[↑ back to top](#top)


## Implementing an Intrinsic Nonlinear PID Controller

<div class="video-container">
<iframe src="https://www.youtube.com/embed/k5eI8baoQec" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

As my undergraduate year-long group project, my group-mates and I developed hardware/software system for controlling a quadrotor UAV using an almost-globally stable geomtric attitude controller with a large region of stability.
The project was completed satisfactorily winning the The Professor E.F. Bartholomeusz Prize for the best final year project at the University of Peradeniya.

**Features**
* Multi-Wii as the onboard computer
* In-house developed controller for UAV control [[paper](https://doi.org/10.1109/ICIINFS.2015.7399049)]
* Platform independent simulator with real-time data monitoring

## Mathematical Modelling Simulation and Control of a SpiderCam System

<div class="video-container">
<iframe src="https://www.youtube.com/embed/x7ThRxnTI9M" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

Spider Cam is a camera which can move over a pre-determined 3 dimensional space, where the dynamics are determined by cables fixed to the camera. 
By varying the tensions of the cables, the motion of the camera can be varied. The system was mathematically modeled considering the rigid body motion of the camera and sagging of the cables, designed the controller and also developed a way-point tracking controller. 
Considering the entire system, system has been mathematically modelled and has been simulated using MATLAB.

[↑ back to top](#top)