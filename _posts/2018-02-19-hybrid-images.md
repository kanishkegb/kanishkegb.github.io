---
layout: post
title: "Generating Hybrid Images"
category: [tutorials, projects, computer-vision]
image: assets/images/posts/opencv/hybrid-images.png
featured: true
---

A hybrid image is an image that is perceived in one of two different ways, depending on viewing distance. A technique for creating hybrid images was originally proposed by [Schyns and Oliva](http://cvcl.mit.edu/publications/OlivaTorralb_Hybrid_Siggraph06.pdf), which was presented at [SIGGRAPH](https://www.siggraph.org/) 2006. Hybrid images combine the low spatial frequencies of one picture with the high spatial frequencies of another picture, producing an image with an interpretation that changes with viewing distance.  

<div id="container">
<center>
    <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/einstein-monroe.jpg"
    width="200"/>
</center>
</div>

Above is an example for a hybrid image. The top image is an hybrid image of two images at the bottom. If you are close enough to the top figure, you will see Albert Einstein, while if you move further from the image, or blur your eyes, you will see Marilyn Monroe.

This project is to get inspired by this paper, and make more hybrid images! 


<a name="contents"></a>
## Contents
2. [Procedure](#procedure)
3. [Gallery](#gallery)


<a name="procedure"></a>
## 1. Procedure

This section describes steps to be followed in order to create a hybrid image as described in the paper by [Schyns and Oliva](http://cvcl.mit.edu/publications/OlivaTorralb_Hybrid_Siggraph06.pdf). Creating a hybrid image is not that hard. The hardest part is finding two figures that would create a better hybrid image.

1. Select two images that you think may create a cool looking hybrid image.
    <center>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/flash.jpg"  width="170"/>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/spiderman.jpg"  width="250"/>
    </center>

2. Then align them and crop them such that they look better. For this example, two images were aligned based on the eye positions. The left image shows the aligned and cropped image, while the right image shows the log magnitude of the Fourier transform of the right image.
    <center>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/1_flash.png"  width="350"/>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/2_flash_fft.png"  width="350"/>
    </center>  
Below image shows the aligned and cropped image of the Spider-Man.
    <center>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/3_spiderman.png"  width="350"/>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/4_spiderman_fft.png"  width="350"/>
    </center>

3. Next, the image of the Flash is processed using a low-pass filter. For this a Gaussian filter is used. The cut-off frequency is determined by trial and error method.
    <center>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/5_flash_filtered.png"  width="350"/>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/6_flash_filtered_fft.png"  width="350"/>
    </center>

4. Then, the image of the Spider-Man is processed using a high-pass filter. For this, the impulse filter minus the Gaussian filter, which was suggested by the original paper is used.
    <center>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/7_spiderman_filtered.png"  width="350"/>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/8_spiderman_filtered_fft.png"  width="350"/>
    </center>

5. Finally, both the filtered images were fused together by simply adding them together.
    <center>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/9_hybrid.png"  width="350"/>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/10_hybrid_fft.png"  width="350"/>
    </center>

If you are closed to the image, you will see Spider-Man. If you blur your eyes, or increase the distance from the image to the eye, you will see Flash. To make it easier, I will display a smaller image next to the original image.
    <center>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/9_hybrid.png"  width="600"/>
      <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/report/9_hybrid.png"  width="100"/>
    </center>

For more cool images, check the [gallery](#gallery) below.

[back to contents](#contents)

<a name="gallery"></a>
## 2. Gallery

Do you remember that day when you had to pick a decision from two, and you already knew which decision you want to take, but you still went with the coin hoping the coin will pick the decision you want? Well, use this coin next time!  
<center>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/hybrid_images/coin.png"  width="600"/>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/hybrid_images/coin.png"  width="100"/>
</center>  

original images:  
<center>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/head.jpg"  width="200"/>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/tail.jpg"  width="150"/>
</center>  


If you are a Game of Thrones fan, you are going to be a bit disheartened by the next image. All the GOT fans (maybe most of them) want Daenerys Targaryen and Jon Snow to kill the Night King (and of course Cersei Lannister). But, did you know that Bran Start is actually the Night King? You don't believe me? Check out this.  
<center>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/hybrid_images/night_king.png"  width="600"/>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/hybrid_images/night_king.png"  width="100"/>
</center>  

original images:  
<center>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/bran.jpg"  width="150"/>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/night_king.jpg"  width="150"/>
</center>  


Okay, enough of fictional characters. Let's see something technical. We all use Google Maps in a day to day basis. Most of them the time we stick with the "Default mode" where we see digitally colored version of the satellite imagery. Below are hybrid images of both the digital map and the satellite imagery.
<center>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/hybrid_images/map_1.png"  width="600"/>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/hybrid_images/map_1.png"  width="100"/>
</center>  

original images:  
<center>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/map_1.png"  width="150"/>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/satellite_1.png"  width="170"/>
</center>  

<center>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/hybrid_images/map_2.png"  width="600"/>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/hybrid_images/map_2.png"  width="100"/>
</center>  
original images:  
<center>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/map_2.png"  width="150"/>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/satellite_2.png"  width="150"/>
</center>  

Finally, an orange. Because who doesn't love oranges!
<center>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/hybrid_images/oranges.png"  width="600"/>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/hybrid_images/oranges.png"  width="100"/>
</center>  

original images:  
<center>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/oranges.jpg"  width="150"/>
  <img src="https://raw.githubusercontent.com/kanishkegb/CSCI-6527-projects/master/Project-2/images/slice.jpg"  width="170"/>
</center>  
