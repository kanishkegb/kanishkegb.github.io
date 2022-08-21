---
layout: post
title: "Decoupled-Yaw Geometric Control for Unmanned Aerial Vehicles"
category: [research, hardware, uav, control, decoupled-yaw, projects]
image: assets/images/posts/decoupled-yaw/indoor.png
---

A UAV is an inherently unstable system, which is similar to an inverted pendulum.
The system has a single directional control input where it can generate thrust only along the axis of rotation of the motors
So, to follow a given trajectory, thrust direction has to be aligned with the force required to follow that trajectory.
Therefore, typical multi-rotor UAV control algorithms use a cascaded system: position controller determines the desired direction of thrust, and attitude controller achieves the desired direction of thrust.

<br>

<figure>
    <img src="{{site.baseurl}}/assets/images/posts/decoupled-yaw/frame.png" alt="UAV thrust direction">
    <figcaption>UAV thrust direction</figcaption>
</figure>

<br>

The roll and pitch moments are generated with the discrepancies in motor speeds, which is fairly straightforward.
In contrast, yaw moment is generated with significantly weak reactive torque.

<br>

<figure>
    <img src="{{site.baseurl}}/assets/images/posts/decoupled-yaw/control-moment-generation.png" alt="Control moment generation">
    <figcaption>Control moment generation comparison for a quadrotor UAV: roll, pitch and yaw moments respectively</figcaption>
</figure>

<br>

Generating a moderate yawing moment requires two rotors to be accelerated, and the other two rotors decelerated rapidly, exactly in the same rate.
During this process, any imbalance in the motors or the propellers may deteriorate the roll and pitch dynamics, destabilizing the quadrotor.
To address this issue, I developed an attitude control system that is decomposed into the roll/pitch dynamics and the yaw dynamics.
This way, we can prioritize stability critical roll/pitch dynamics, and achieve yaw control at a slower rate.

The control objective here is to design the thrust of each motor such that the UAV position exponentially goes to the desired position, while the normalsize direction of the first body exponentially converges to the desired direction.
In this process, the position and velocity errors were used to determine the desired attitude.
Then, this desired attitude was used to construct two separate attitude controller: roll/pitch controller that only controls the thrust direction, and yaw controller that separately controls the yaw direction.

<br>

<figure>
    <img src="{{site.baseurl}}/assets/images/posts/decoupled-yaw/decoupled-attitude-control.png" alt="Decoupled attitude controllers">
    <figcaption>Separate attitude controllers defiend in their respective configuration spaces</figcaption>
</figure>

<br>

Then, the stability of the controllers are mathematically analyzed using Lyapunov stability theorems. 
The proposed method outperforms the similar controllers that does not consider the coupling of yaw, especially at the presence of large yaw angle manuvers, and this is demonstrated in the below video.

<br>

<div class="video-container">
<iframe src="https://www.youtube.com/embed/w4UcEp5jb0E" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

<br>
<br>