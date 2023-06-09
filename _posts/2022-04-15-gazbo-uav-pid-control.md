---
layout: post
title: "A Linear PID Controlled UAV with ROS + Gazebo"
category: [research, uav, tutorial, projects]
image: assets/images/posts/uav-simulations/gazebo-pid-control.png
# featured: true
---

This is a basic example for using ROS and Gazebo to position control a quadrotor UAV, using C++. 
A simple PID controller (not the internal ROS controller) is used as the controller.
The objective here is for someone new to the UAV control with ROS + Gazebo to figure out where to start.

There are two main modules here:
1. uav_gazebo
1. uav_control

The `uav_gazebo` includes all the necessary file to create and launch a Gazebo environment with the UAV.
The `uav_control` includes the control plugin that will act as the PID controller, and the relevant custom messages.

The default behavior is as follows:
1. When the Gazebo environment is launched, the UAV will start at the origin.
1. Desired position is defined inside the `control_plugin.cpp`.
1. The UAV controller will wait for 2 seconds for the system to settle in.
1. Then, the UAV forces and torques will be set using the PID controller such the UAV converges to the desired position.
1. After the convergence, the UAV will stay there.

The gains, desired position, and other physical parameters are hard-coded.
Again, the objective here is to familiar with the followings:
1. Reading states of the UAV in the Gazebo environment
1. Defining a basic PID controller
1. Transformation of desired forces and torques to the coordinate frame defined in the Gazebo environment

If are already familiar with the basics and you want to have a more interactive and in-depth ROS + Gazebo UAV control, please check [fdcl-gwu/uav_simulator](https://github.com/fdcl-gwu/uav_simulator).

