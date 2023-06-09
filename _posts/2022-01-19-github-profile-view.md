---
layout: post
title: "Adding a Snapshot View to the GitHub Profile"
category: [tutorials]
image: assets/images/posts/github-profile/github-snapshot.png
# featured: true
---

You can a quick snapshot view to your GitHub profile page like the image above.
The process is as simple as creating a public repository with the same name as your GitHub username.
For example, mine is `kanishkegb`, and I created this repository [https://github.com/kanishkegb/kanishkegb](https://github.com/kanishkegb/kanishkegb).

Then, add a file named `README.md`, and starting adding details you want.
This follows regular Markdown syntax and [Markdown Guide](https://www.markdownguide.org/basic-syntax/) provides a good cheatsheet.
Whenever you commit and push your changes, your profile page will be updated.

## Adding Images

Make sure the images are either local or you have a working URL.
Then, follow the markdown format:
```
![Image Description](image_url)
```

However, above does not support basic property changes such as setting the image size, hyperlinking, padding etc.
For that, you can adopt HTML.

Assume that you have an image inside the directory `./images/`, and need that to be of max width of 24 pixels.
Further, you want to open a website when someone clicks on the image.
This can be achieved by:
```
[<img align="left" src="./images/youtube.svg" width="24px" alt="Youtube" width="300" style="padding-right:10px;" />](https://youtube.com/kanishkegb)
```

## Adding GitHub Status Card

You can get a dynamic GitHub status card with [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

This is as simple as copy-pasting the following line (of course replace your Github username):
```
[![GitHub stats](https://github-readme-stats.vercel.app/api?username=kanishkegb&count_private=true&show_icons=true&theme=default&hide=stars)](https://kanishkegb.github.io)
```

For more customization details, follow the instructions on the original repo.