# Personal Website

A Hugo static site: home page, resume, and a math blog with LaTeX.

## Run it locally

1. Install Hugo once: `brew install hugo`
2. From this folder, start the live preview: `hugo server`
3. Open http://localhost:1313 — edits reload automatically. Stop with Ctrl-C.

## Add a blog post

Create a file `content/blog/my-post-title.md`:

````markdown
---
title: "My Post Title"
date: 2026-07-03
---

Write here. Inline math with $a^2 + b^2 = c^2$ and display math with:

$$
\int_0^1 x^2 \, dx = \tfrac{1}{3}.
$$
````

Save — it appears at `/blog/my-post-title/` and in the blog list automatically.

## Update the resume

- Edit the text in `content/resume.md`.
- Replace `static/resume.pdf` with your real resume PDF (keep the same filename).

## Change your name / email

Edit `author` and `email` under `[params]` in `hugo.toml`.
