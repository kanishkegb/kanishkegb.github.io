# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bundle install                              # Install Ruby dependencies
bundle exec jekyll serve                    # Serve locally at http://localhost:4000
bundle exec jekyll serve --livereload       # Serve with live reload
bundle exec jekyll build                    # Build to _site/
```

## Architecture

This is a custom Jekyll portfolio and technical blog for Kanishke Gamagedara (UAV/robotics/navigation engineer). No remote theme — all layouts, styles, and JS are custom.

### Content Sources

- **Blog posts:** `_posts/YYYY-MM-DD-title.md` — standard Jekyll format
- **Data-driven pages:** Projects, publications, and open-source repos are defined in `_data/projects.yml`, `_data/publications.yml`, and `_data/open_source.yml`, then rendered by their respective top-level `.md` pages
- **Static pages:** `pages/about.md`, `pages/projects.md`, `pages/open-source.md`, `pages/publications.html`; all use the `page` layout. Do not put pages in `_posts/` — Jekyll requires files there to have a `YYYY-MM-DD-` prefix or they won't be built.

### Layouts and Includes

- `_layouts/default.html` — base HTML; includes KaTeX CDN scripts, favicon link, and theme toggle
- `_layouts/home.html` — homepage hero + post card grid (pagination handled by `assets/js/theme.js`)
- `_layouts/post.html` — individual post with optional image header
- `_includes/header.html` / `footer.html` — nav with mobile toggle + social links

### Styling

- `assets/css/main.scss` imports Bootstrap SCSS utilities and defines CSS variables for light/dark themes (`--bg`, `--text`, `--accent`, etc.)
- Theme preference persists via `localStorage`; toggled by `assets/js/theme.js`
- `assets/js/md-gallery.js` — image gallery used on the About page
- Syntax highlighting via rouge

### Math Support

KaTeX renders math via CDN. Use standard LaTeX delimiters: `$$...$$`, `$...$`, `\[...\]`, `\(...\)`. The `_config.yml` sets `math_engine: null` so Jekyll doesn't interfere.

### Post Front Matter

```yaml
---
layout: post
title: "Title"
date: YYYY-MM-DD
tags: [tag1, tag2]
image: /assets/images/posts/image.jpg   # optional thumbnail
---
```

### URL Structure

Posts are served at `/:year/:month/:day/:title/` per the permalink config.
