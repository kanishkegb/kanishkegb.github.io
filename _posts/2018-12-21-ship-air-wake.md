---
layout: post
title: "Measurements of Ship Air Wake Using Airborne Anemometers"
category: [research, hardware, ship, airwake, flight-tests, projects]
image: assets/images/posts/airwake/waterwake.jpg
---


When a ship moves on a water surface, we can clearly see a water wake right behind it.
Its size and the shape depends on various factors such as the size of the ship, propeller configuration, or the shape of the ship hull.

Though we cannot see it, the air behind the ship also makes an air-wake.
Usually, military ships have super-structure in the front and given its step-like shape, the air-flow creates a low pressure zone right on the landing zone.

<figure>
    <img src="/assets/images/posts/airwake/low_pressure_zone.png" alt="Low pressure zone over the landing pad">
    <figcaption>The low-pressure zone behind the ship's super-structure</figcaption>
</figure>

This air flow dynamics creates a turbulent air flow, which can make the launch and recovery of manned aircrafts challenging.
Also, dynamics of this air layer depends on different parameters such as shape of the ship, the speed of the ship or the head wind conditions.
Therefore, there is an interest in recognizing the most turbulent air regions so that aircrafts can avoid them.
The obvious choice here is using computational fluid dynamics (CFD) simulations.
Given the turbulent nature of air wake, these simulations need to be verified with actual measurement, creating a need for measuring the ship air-wake.

I developed several hardware and software systems to detect ship air-wake of a ship using unmanned aerial vehicles (UAVs) as a collaboration between GWU and US Naval Academy. 
This includes a data package to measure the wind speed behind a ship using an octocopter and a fixed-wing aircraft. 
The data package can measure the relative position of the UAV relative to the ship up to 2 cm accuracy, and includes a telemetry/software system for real time monitoring. 


<figure>
    <img src="/assets/images/posts/airwake/data_package.png" alt="Data package">
    <figcaption>Developed data package installed on the octocopter</figcaption>
</figure>

**Features**
* Custom developed hardware/software UAV platform using off-the-shelf hardware components
* Use Vicon motion capture system for position data
* TCP/IP connection through Wi-Fi for UAV communication for sending commands/real-time data monitoring

Below video shows the developed system being operated  off of US Naval Academy research vessel YP 700 at Chesapeake Bay.

<div class="video-container">
<iframe src="https://www.youtube.com/embed/9FUpj1PZaP8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

<br>
<br>