---
layout: single
title: "Decoupled-Yaw Geometric Controllers for Unmanned Aerial Vehicles"
date: 2020-01-01
category: [news]
tags: [research, hardware, uav, control, uav-control, geometric-control, projects]
header:
  teaser: "/assets/images/spidercam_cable.png"
---

When a ship moves on a, we can clear see a water wake right behind it.
Its size and the shape depends on various factors such as the size of the ship, propeller configuration, or the shape of the ship hull.

<figure>
    <img src="/assets/images/airwake_waterwake.jpg" alt="Water-wake behind a ship">
    <figcaption>The water-wake behind a ship [source: Wikipedia]</figcaption>
</figure>

Though we cannot see it, the air behind the ship also makes an air-wake.
Usually, military ships have super-structure in the front and given its step-like shape, the air-flow creates a low pressure zone right on the landing zone.

<figure>
    <img src="/assets/images/airwake_low_pressure_zone.png" alt="Low pressure zone over the landing pad">
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
    <img src="/assets/images/airwake_data_package.png" alt="Data package">
    <figcaption>Developed data package installed on the octocopter</figcaption>
</figure>

**Features**
* Custom developed hardware/software UAV platform using off-the-shelf hardware components
* Use Vicon motion capture system for position data
* TCP/IP connection through Wi-Fi for UAV communication for sending commands/real-time data monitoring

Below video shows the developed system being operated  off of US Naval Academy research vessel YP 700 at Chesapeake Bay.

{% include video id="w4UcEp5jb0E" provider="youtube" %}

<br>
<br>