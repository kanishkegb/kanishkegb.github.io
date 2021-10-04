---
layout: archive
---

I am a current PhD candidate at the [Flight Dynamics and Control Lab](http://www2.seas.gwu.edu/~tylee/), at the George Washington University, expecting to graduate soon. 

I have received my master's degree at GWU, in Mechanical and Aerospace Engineering, and completed my bachelor's degree from the University of Peradeniya, Sri Lanka in Mechanical Engineering. 

# Projects
## Autonomous Landing of a UAV on a Moving Ship

[![Autonomous Ship Landing Video](http://img.youtube.com/vi/_WXyo45Oo1Y/0.jpg)](http://www.youtube.com/watch?v=_WXyo45Oo1Y "Preliminary results for autonomous landing of a UAV on a moving ship"){:target="_blank"}

I developed a UAV and its estimator/controller system for autonomous landing of a UAV on a moving ship, which includes estimating and compensating for the disturbances incurred by the ship's air wake. 
Further, after noticing that there is a delay in GPS position measurement, I augmented the estimator to forward propagate the delayed measurements to the correct time horizon using IMU measurements. 
All these improvements have been tested in a successful autonomous landing of a UAV on a US Naval Academy research vessel at Chesapeake bay.

## Decoupled-Yaw Geometric Controllers for Unmanned Aerial Vehicles
[![Decoupled-Yaw Control Video](http://img.youtube.com/vi/w4UcEp5jb0E/0.jpg)](http://www.youtube.com/watch?v=w4UcEp5jb0E  "Geometric Controls of a Quadrotor UAV with the Decoupled Attitude Controls"){:target="_blank"}

I developed a geometric control algorithm to reduce the trajectory errors when an unmanned aerial vehicle (UAV) follows a path with large yaw angle rotations, such as scanning an area for mapping. 
The decoupling of yaw significantly reduced the error, and its efficacy has demonstrated by autonomous UAV flight tests in both indoor (using motion capture) and outdoor (with GPS positioning) settings.
This has been further augmented to include an adaptive controller, making the UAV control more robust in heavy disturbances such as strong wind.

## Ship Air-Wake Detection Using Unmanned Aerial Vehicles 
[![Ship Air-Wake Measurement](http://img.youtube.com/vi/9FUpj1PZaP8/0.jpg)](http://www.youtube.com/watch?v=9FUpj1PZaP8  "Ship Air-Wake Detection Using Unmanned Aerial Vehicles"){:target="_blank"}

I have developed several hardware and software systems to detect ship air-wake of a ship using unmanned aerial vehicles (UAVs) as a collaboration between GWU and US Naval Academy. 
This includes a data package to measure the wind speed behind a ship using an octocopter and a fixed-wing aircraft. 
The data package can measure the relative position of the UAV relative to the ship up to 2 cm accuracy, and includes a telemetry/software system for real time monitoring. 
The data has been collected using US Naval Academy research vessel YP 700 at Chesapeake Bay.

## Development of an Obstacle Avoidance System for a Quadrotor

As my undergraduate year-long group project, my groupmates and I developed hardware/software system for controlling a quadrotor UAV that can detect and avoid obstacles using sonar sensors.
The development of the system included the implementation of an almost-globallly stable geomtric attitude controller with a large region of stability.
The project was completed satisfactorily winning the The Professor E.F. Bartholomeusz Prize for the best final year project at the University of Peradeniya.

## Mathematical Modelling, Simulation and Control of a SpiderCam System
[![Ship Air-Wake Measurement](http://img.youtube.com/vi/x7ThRxnTI9M/0.jpg)](http://www.youtube.com/watch?v=x7ThRxnTI9M   "Spider Cam Simulation"){:target="_blank"}

Spider Cam is a camera which can move over a pre-determined 3 dimensional space, where the dynamics are determined by cables fixed to the camera. 
By varying the tensions of the cables, the motion of the camera can be varied. The system was mathematically modeled considering the rigid body motion of the camera and sagging of the cables, designed the controller and also developed a way-point tracking controller. 
Considering the entire system, system has been mathematically modelled and has been simulated using MATLAB.

# Open-Source Contributions

