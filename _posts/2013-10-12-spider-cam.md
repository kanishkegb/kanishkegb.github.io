---
layout: posts
title: "Mathematical Modelling Simulation and Control of a SpiderCam System"
date: 2013-10-12
category: [research]
tags: [research, simulation, matlab, projects]
---

As a third year undegrad student of the Mechanical Engineering Department at the University of Peradeniya, we are required to an individual project.
I chose to model, simulate, and design a controller for the Spider Cam system.

<figure>
    <img src="/assets/images/skycam.jpg" alt="SkyCam in action">
    <figcaption>SkyCam in action [source: Wikipedia]</figcaption>
</figure>

The Spider Cam system is a cable-suspended overhead camera which is installed on venues such as sports arena.
The camera then can be moved freely on 3D space to record what is happening on the ground, for example, to follow a certain player right behind them, without having the camera crew to be physically on the ground.
Though the word "Spider Cam" is a trademark of a German company with the same name, there are other commercial companies such as SkyCam that provides such services.

<figure>
    <img src="/assets/images/spidercam_cable.png" alt="Caternary cable free-body-diagram">
    <figcaption>Free-body-diagram of the modeled catenary cable</figcaption>
</figure>

Given the size of sports stadiums, the cables are so long, and the cable slack becomes non-negligible.
Therefore, this project involved the simulation of the dynamics of the camera and the effects of the slack and the tension of each cable.
Also, a waypoint tracking controller was developed to simulate the case where the camera follows a given trajectory.

Below video shows the simulation of this system, that was completed using Matlab.


{% include video id="x7ThRxnTI9M" provider="youtube" %}

<br>
<br>