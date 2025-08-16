---
layout: post
title: "OpenCV rvec-tvec Definitions"
category: [tutorials, guides]
image: assets/images/posts/opencv-rvec-tvec/pinhole-camera-model.png
# featured: true
---

The [OpenCV](https://opencv.org) library uses `rvec` and `tvec` to represent the rotations and translations, respectively.
When you are learning OpenCV, this could be confusing sometimes.
This post clarifies some confusions in this, which is originally posted by myself as an answer to a question in [StackOverflow](https://stackoverflow.com/a/59754199/8371691).


In OpenCV coordinate frame, x-axis increases from left to right of the image, y-axis increases from top to bottom of the image, and z axis increases towards the front of the camera. 

The vector `rvec` is the rotation of the marker or an object with respect to the camera frame. 
You can convert `rvec` to a 3x3 rotation matrix using the built-in [Rodrigues function](https://docs.opencv.org/2.4/modules/calib3d/doc/camera_calibration_and_3d_reconstruction.html#rodrigues).
If the marker (for example, an Aruco marker) is aligned with camera frame, this rotation matrix should read 3x3 identity matrix.

If you get the inverse of this matrix (this is a rotation matrix, so the inverse is the transpose of the matrix), that is the rotation of the camera with respect to the marker.

The vector `tvec` is the distance from the origin of the camera frame to the center of the detected marker.
This is `F_c - P` line on the figure above.