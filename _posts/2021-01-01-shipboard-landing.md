---
layout: post
title: "Autonomous Landing of a UAV on a Moving Ship"
category: [research, hardware, uav, control, shipboard-landing, projects]
image: assets/images/posts/shipboard_landing/yp689.png
---

For an autonomous UAV, or for any aerial vehicle in general, one of the most safety critical operations is the landing.
This becomes even challenging when being operated off of a ship.
Now, the ship, which is the base point of operation, is moving while rolling and pitching constantly on ocean waves.

Also, the landing deck of the most ships are located on the back of the ship where the super-structure of the ship generates a turbulent air wake, which is not friendly on small UAVs.
The goal of this project is to develop a custom UAV platform (both hardware/software) system that is capable of handling autonomous operation in such harsh conditions.

<figure>
    <img src="{{site.baseurl}}/assets/images/posts/shipboard_landing/hex.jpg" alt="Hexrotor UAV">
    <figcaption>Developed hexrotor UAV for autonomous operations in ocean environments</figcaption>
</figure>

First, I developed the hardware platform such that it could be easily translated into different frames such as quadrotors or hexrotors. 
Further, all the relevant sensors were integrated to make sure that the UAV can be safely operated in both indoor and outdoor environments.
Then, a C++-based multi-threaded software was developed to communicate with the developed UAV hardware system.

The attitude of the UAV was determined using the onboard VectorNav VN100 IMU, while the position of the UAV relative to the ship was determined using SwiftNav Piksi Multi RTK GPS units.
The used RTK GPS unit provides centi-meter level accurate positioning, but with a non-trivial processing delay.
To address this delay, an extended Kalman filter with delay correction was developed an implemented.
Also, an adaptive geometric controller was developed to compensate for turbulent wind conditions inside the ship airwake.

<figure>
    <img src="{{site.baseurl}}/assets/images/posts/shipboard_landing/yp689.png" alt="USNA research vessel YP689">
    <figcaption>US Naval Academy research vessel YP689 inside the flight operation area</figcaption>
</figure>

With the above UAV platform, the flight tests were performed onboard the US Naval Academy research vessel YP689 at Chesapeake Bay.
All the computations, including the estimation, control, and motor control were processed inside the single onboard computer, Jetson TX2.

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


<br>
Below video shows the developed system being operated  off of US Naval Academy research vessel YP 700 at Chesapeake Bay.

<div class="video-container">
<iframe src="https://www.youtube.com/embed/o3fbh8TyZOs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

<br>
<br>