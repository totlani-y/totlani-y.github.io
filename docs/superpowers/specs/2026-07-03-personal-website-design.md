# Personal Website + Math Blog — Design Spec

**Date:** 2026-07-03
**Owner:** yasht
**Contact email:** totlaniyash4@gmail.com
**Status:** Approved design, pending implementation plan

## Purpose

A personal website to support a job search, containing a landing page, a
resume (readable in-browser plus downloadable PDF), and a blog for writing
about mathematics. Built and previewed locally first; hosting is deferred.

## Context & Constraints

- Owner is a mathematician comfortable with LaTeX but new to web development.
  The only file type the owner will edit day-to-day is Markdown.
- Hard requirement: LaTeX math must render inside Markdown blog posts.
- Aesthetic: clean, minimal, academic — strong typography, generous
  whitespace, timeless, low-maintenance.
- All implementation (config, theming, build tooling) is handled by Claude;
  the owner should not need Node/JS knowledge.

## Technology

**Hugo** static site generator (single binary, no Node/npm required).
- Content authored as Markdown files.
- Builds to static HTML/CSS in `public/`, servable by any host later.
- Local preview via `hugo server` (live reload in browser).
- Math via **KaTeX**: `$...$` for inline, `$$...$$` for display equations.

Rationale: lowest tooling friction for a light-coding author, fast builds,
mature academic theme ecosystem, trivial path to free hosting later.

## Site Structure

- **Home** (`/`): short intro — name, one-line description of what the owner
  does, links to resume + email + optional GitHub/LinkedIn.
- **Resume** (`/resume/`): clean HTML rendering of resume content, with a
  prominent **Download PDF** button linking to the actual PDF file.
- **Blog** (`/blog/`): list of posts, newest first. Each post at
  `/blog/<slug>/`.
- Top navigation bar (Home · Resume · Blog) present on every page.

## Content Model

- Each blog post = one Markdown file in `content/blog/` with front matter
  (title, date) followed by prose and LaTeX. Adding a post = adding one file.
- Resume content = one Markdown file. The resume PDF lives in `static/` and is
  served/downloaded as-is.
- Home content = one Markdown/front-matter file.

## Styling

Clean minimal academic theme with strong typography and readable math.
Either a well-regarded minimal theme or a lightly customized one so the result
looks intentional rather than generic. Body text optimized for readability;
math legibility prioritized.

## Verification

Build the site, run it locally with `hugo server`, and review in the browser
together. Owner approves the look before any hosting is considered.

## Out of Scope (YAGNI)

Hosting/deployment, comments, analytics, contact forms, dark mode. All can be
added later once the core site feels right.

## Inputs Needed From Owner (later, not blocking)

- Full name and preferred display name.
- Contact links (email: totlaniyash4@gmail.com; GitHub/LinkedIn optional).
- Resume content and/or existing resume PDF.
- First blog post content (candidate topics: ANT proof of quadratic
  reciprocity, or Riemann surfaces / Abel–Jacobi).

Claude will scaffold with placeholders so structure is visible before real
content is added.
