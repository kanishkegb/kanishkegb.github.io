# Personal Web Page

## Offline Site Building

# Starting with Docker
```sh
docker build -t website .
docker run --rm --mount source="$(pwd)",target=/home,type=bind -p 4000:4000 -it website bash
bundle
jekyll serve --host 0.0.0.0 --watch
```

# Generating the Website
1. Clone and `cd` to the website 
1. `bundle`
1. Edit `_config.yml`. If your site is in root: baseurl: ''.
1. Build the website: `jekyll serve --watch`
1. Open `localhost:4000` to check the generated website.

**NOTE:** For local tests, all `/assets/css/theme.scss` must be replaced with `/assets/css/theme.css`

# Creating a Post
1. Create a new markdown file inside the `posts` directory.
1. Keep the same file name format.
1. Add the content to the post.
1. Refresh the browser tab.


# Made with the free Affiliates theme (Kept from the original repository)

[Live Demo](https://wowthemesnet.github.io/affiliates-jekyll-theme/) | [Docs & Download](https://bootstrapstarter.com/template-affiliates-bootstrap-jekyll/) |  [Buy me a coffee](https://www.wowthemes.net/donate/)

![jekyll-affiliates-theme](https://bootstrapstarter.com/assets/img/themes/affiliates-jekyll.jpg)
