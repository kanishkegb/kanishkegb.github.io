---
layout: single
permalink: /projects/
title: ""
---

## Contents
* [Projects](#projects)
    * [Autonomous Landing of a UAV on a Moving Ship](#autonomous-landing-of-a-uav-on-a-moving-ship)
    * [Decoupled-Yaw Geometric Controllers for Unmanned Aerial Vehicles](#decoupled-yaw-geometric-controllers-for-unmanned-aerial-vehicles)
    * [Ship Air-Wake Detection Using Unmanned Aerial Vehicles](#ship-air-wake-detection-using-unmanned-aerial-vehicles)
    * [Implementing an Intrinsic Nonlinear PID Controller](#implementing-an-intrinsic-nonlinear-pid-controller)
    * [Mathematical Modelling, Simulation and Control of a SpiderCam System](#mathematical-modelling-simulation-and-control-of-a-spidercam-system)
* [Open-Source Contributions](#open-source-contributions)

# Projects
## Autonomous Landing of a UAV on a Moving Ship

{% include video id="o3fbh8TyZOs" provider="youtube" %}

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

[back to contents](#contents)


## Decoupled-Yaw Geometric Controllers for Unmanned Aerial Vehicles

{% include video id="w4UcEp5jb0E" provider="youtube" %}

I developed a geometric control algorithm to reduce the trajectory errors when an unmanned aerial vehicle (UAV) follows a path with large yaw angle rotations, such as scanning an area for mapping. 
The decoupling of yaw significantly reduced the error, and its efficacy has demonstrated by autonomous UAV flight tests in both indoor (using motion capture) and outdoor (with GPS positioning) settings.
This has been further augmented to include an adaptive controller, making the UAV control more robust in heavy disturbances such as strong wind.

**Features**
* Same custom-developed hardware/software system as the UAV used in [Autonomous Landing](#autonomous-landing-of-a-uav-on-a-moving-ship) project
* Use Vicon motion capture system for position data
* TCP/IP connection through Wi-Fi for UAV communication for sending commands/real-time data monitoring

[back to contents](#contents)


## Ship Air-Wake Detection Using Unmanned Aerial Vehicles 
{% include video id="9FUpj1PZaP8" provider="youtube" %}

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

[back to contents](#contents)


## Implementing an Intrinsic Nonlinear PID Controller

{% include video id="k5eI8baoQec" provider="youtube" %}

As my undergraduate year-long group project, my group-mates and I developed hardware/software system for controlling a quadrotor UAV using an almost-globallly stable geomtric attitude controller with a large region of stability.
The project was completed satisfactorily winning the The Professor E.F. Bartholomeusz Prize for the best final year project at the University of Peradeniya.

**Features**
* Multi-Wii as the onboard computer
* In-house developed controller for UAV control [[paper](https://doi.org/10.1109/ICIINFS.2015.7399049)]
* Platform independent simulator with real-time data monitoring

## Mathematical Modelling Simulation and Control of a SpiderCam System

{% include video id="x7ThRxnTI9M" provider="youtube" %}

Spider Cam is a camera which can move over a pre-determined 3 dimensional space, where the dynamics are determined by cables fixed to the camera. 
By varying the tensions of the cables, the motion of the camera can be varied. The system was mathematically modeled considering the rigid body motion of the camera and sagging of the cables, designed the controller and also developed a way-point tracking controller. 
Considering the entire system, system has been mathematically modelled and has been simulated using MATLAB.

[back to contents](#contents)
<br> 
<br> 
<br> 

# Open-Source Contributions

A selcted set of open-source repositories where I am the main contributor and maintainer. 
For most up-to-date details please visit [my GitHub page](https://github.com/kanishkegb).


## Working examples/tutorial for detection and pose estimation of ArUco markers with C++: [fdcl-gwu/aruco-markers](https://github.com/fdcl-gwu/aruco-markers)

![Drawing a cube on an AruCo marker](assets/images/aruco_markers.gif)

This is a side project that resulted from the work published in my paper “Attitude observer on SO (3) with time-varying reference directions”. 
This repository provides C++ codes for basic augmented reality related tasks using computer vision. 
In fact, this is usually withing the first three Google results when you search for ArUco markers using C++.

[back to contents](#contents)



## Geometric controllers developed at FDCL for UAVs : [fdcl-gwu/uav_geometric_control](https://github.com/fdcl-gwu/uav_geometric_control)

![Projects that used the controllers in the repository](assets/images/uav_geometric_control.png)

This repository includes the controller proposed in “Geometric controls of a quadrotor UAV with decoupled yaw control”.
In addition, this includes both coupled-yaw and decoupled-yaw controllers in Matlab, Python, and C++ for any interested person to use in their projects.

[back to contents](#contents)



## Python - Gazebo simulation environment for a UAV with geometric control: [fdcl-gwu/uav_simulator](https://github.com/fdcl-gwu/uav_simulator)

![UAV Simulator GUI](assets/images/uav_simulator.gif)

This is another output of the work published in “Geometric controls of a quadrotor UAV with decoupled yaw control”. 
This includes a complete framework for simulating a UAV, which includes controller, estimator, using an open-source physics engine.

[back to contents](#contents)



## Comparison of delayed Kalman filters, with application to the state estimation of a UAV: [fdcl-gwu/dkf-comparison](https://github.com/fdcl-gwu/dkf-comparison)

{% include video id="PfuGb5yhlLQ" provider="youtube" %}

This work includes the results published in “Quadrotor State Estimation with IMU and Delayed Real-time Kinematic GPS”, which compares different delayed Kalman filters for their performances.

[back to contents](#contents)