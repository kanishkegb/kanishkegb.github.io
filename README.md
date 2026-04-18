# Personal Website

Personal blog and portfolio built with [Jekyll](https://jekyllrb.com).

## Prerequisites

- Ruby >= 2.7 ([install guide](https://www.ruby-lang.org/en/documentation/installation/))
- Bundler (`gem install bundler`)

## Setup

Install dependencies:

```bash
bundle install
```

## Running locally

```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

To enable live reload while editing:

```bash
bundle exec jekyll serve --livereload
```

## Building for production

```bash
bundle exec jekyll build
```

The output is written to the `_site/` directory.

## Adding content

### Blog posts

Create a Markdown file in `_posts/` named `YYYY-MM-DD-title.md` with this front matter:

```yaml
---
layout: post
title: "Post title"
date: YYYY-MM-DD
tags: [tag1, tag2]
image: /assets/images/posts/your-image.jpg  # optional thumbnail
---
```

### Projects, open-source, and publications

Edit the corresponding YAML files in `_data/`:

- `_data/projects.yml`
- `_data/open_source.yml`
- `_data/publications.yml`
