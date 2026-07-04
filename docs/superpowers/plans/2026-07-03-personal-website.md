# Personal Website + Math Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a clean, minimal, academic personal website with a home page, a resume page (HTML + downloadable PDF), and a math blog with LaTeX rendering, previewable locally.

**Architecture:** A Hugo static site with a small hand-written theme (plain HTML templates + one CSS file, no Node/Go-module dependencies). Content is authored as Markdown. Math is passed through untouched by Goldmark's `passthrough` extension and rendered client-side by KaTeX. Hugo builds everything to static HTML/CSS in `public/`.

**Tech Stack:** Hugo (extended, ≥ 0.122), KaTeX 0.16.x (via CDN), plain CSS. No Node, no npm, no Go.

## Global Constraints

- Hugo version floor: **0.122.0** (required for the Goldmark `passthrough` extension). Homebrew installs a newer version, which is fine.
- No Node/npm/Go toolchain. Theme is hand-written templates + plain CSS only.
- The only files the owner edits day-to-day are Markdown files under `content/`.
- Author display name and email are single config values in `hugo.toml`: name `Yash Totlani` (placeholder — trivially changed), email `totlaniyash4@gmail.com`.
- Math delimiters: `$...$` inline, `$$...$$` display (also `\(...\)` and `\[...\]`).
- "Verification" for every task = `hugo` builds without error, then grep the generated files under `public/`. There is no unit-test framework.
- Commit after each task with a plain message (no co-author/attribution trailer).

---

### Task 1: Install Hugo and scaffold the site

**Files:**
- Create: `hugo.toml`
- Create: `.gitignore`

**Interfaces:**
- Produces: a buildable Hugo site rooted at `~/personal-website`; config params `author`, `email`, `description`; a `main` menu with Home/Resume/Blog; Goldmark `passthrough` + `unsafe` HTML enabled.

- [ ] **Step 1: Install Hugo**

Run:
```bash
brew install hugo
```
Expected: Hugo installs. Verify:
```bash
hugo version
```
Expected: prints a version ≥ `v0.122.0` and includes `extended`.

- [ ] **Step 2: Write `.gitignore`**

Create `.gitignore`:
```gitignore
/public/
/resources/
.hugo_build.lock
.DS_Store
```

- [ ] **Step 3: Write `hugo.toml`**

Create `hugo.toml`:
```toml
baseURL = "/"
languageCode = "en-us"
title = "Yash Totlani"
theme = "minimal-academic"

[params]
  author = "Yash Totlani"
  email = "totlaniyash4@gmail.com"
  description = "Personal website and math blog"

[[menu.main]]
  name = "Home"
  pageRef = "/"
  weight = 1
[[menu.main]]
  name = "Resume"
  pageRef = "/resume/"
  weight = 2
[[menu.main]]
  name = "Blog"
  pageRef = "/blog/"
  weight = 3

[markup]
  [markup.goldmark.renderer]
    unsafe = true
  [markup.goldmark.extensions.passthrough]
    enable = true
    [markup.goldmark.extensions.passthrough.delimiters]
      block = [['$$', '$$'], ['\[', '\]']]
      inline = [['$', '$'], ['\(', '\)']]
```

- [ ] **Step 4: Create the theme directory so the build has a theme to load**

Run:
```bash
mkdir -p themes/minimal-academic/layouts/_default
mkdir -p themes/minimal-academic/layouts/partials
mkdir -p themes/minimal-academic/static/css
mkdir -p themes/minimal-academic/static/js
```

- [ ] **Step 5: Build to verify config + scaffold are valid**

Run:
```bash
hugo
```
Expected: build succeeds (it may warn "found no layout file for ... home" — that is fine; templates come in Task 2). No config errors. A `public/` directory is created.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Scaffold Hugo site: config, gitignore, empty theme dirs"
```

---

### Task 2: Theme base — layouts, nav/footer, KaTeX wiring, base CSS

**Files:**
- Create: `themes/minimal-academic/layouts/_default/baseof.html`
- Create: `themes/minimal-academic/layouts/partials/head.html`
- Create: `themes/minimal-academic/layouts/partials/header.html`
- Create: `themes/minimal-academic/layouts/partials/footer.html`
- Create: `themes/minimal-academic/layouts/_default/single.html`
- Create: `themes/minimal-academic/layouts/_default/list.html`
- Create: `themes/minimal-academic/static/js/katex-init.js`
- Create: `themes/minimal-academic/static/css/style.css`
- Create: `content/_index.md` (temporary stub so home builds; replaced in Task 3)

**Interfaces:**
- Consumes: `hugo.toml` params (`author`, `email`, `description`) and `main` menu from Task 1.
- Produces: base template with a `main` block; nav rendering the `main` menu with an `active` class on the current item; KaTeX CSS/JS + `katex-init.js` loaded in `<head>`; a stylesheet link to `css/style.css`. Later tasks fill the `main` block via `{{ define "main" }}`.

- [ ] **Step 1: Write `baseof.html`**

Create `themes/minimal-academic/layouts/_default/baseof.html`:
```html
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode | default "en-us" }}">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  {{ partial "header.html" . }}
  <main class="content">
    {{ block "main" . }}{{ end }}
  </main>
  {{ partial "footer.html" . }}
</body>
</html>
```

- [ ] **Step 2: Write `partials/head.html`**

Create `themes/minimal-academic/layouts/partials/head.html`:
```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ if .IsHome }}{{ .Site.Title }}{{ else }}{{ .Title }} · {{ .Site.Title }}{{ end }}</title>
<meta name="description" content="{{ .Description | default .Site.Params.description }}">
<link rel="stylesheet" href="{{ "css/style.css" | relURL }}">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" crossorigin="anonymous"></script>
<script defer src="{{ "js/katex-init.js" | relURL }}"></script>
```

- [ ] **Step 3: Write `katex-init.js`**

Create `themes/minimal-academic/static/js/katex-init.js`:
```js
document.addEventListener("DOMContentLoaded", function () {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false }
    ],
    throwOnError: false
  });
});
```

- [ ] **Step 4: Write `partials/header.html`**

Create `themes/minimal-academic/layouts/partials/header.html`:
```html
<header class="site-header">
  <nav class="nav">
    <a class="site-title" href="{{ "/" | relURL }}">{{ .Site.Params.author }}</a>
    <ul class="nav-links">
      {{ range .Site.Menus.main }}
        <li><a href="{{ .URL | relURL }}"{{ if $.IsMenuCurrent "main" . }} class="active"{{ end }}>{{ .Name }}</a></li>
      {{ end }}
    </ul>
  </nav>
</header>
```

- [ ] **Step 5: Write `partials/footer.html`**

Create `themes/minimal-academic/layouts/partials/footer.html`:
```html
<footer class="site-footer">
  <p>© {{ now.Year }} {{ .Site.Params.author }} · <a href="mailto:{{ .Site.Params.email }}">{{ .Site.Params.email }}</a></p>
</footer>
```

- [ ] **Step 6: Write `_default/single.html`**

Create `themes/minimal-academic/layouts/_default/single.html`:
```html
{{ define "main" }}
<article class="post">
  <h1>{{ .Title }}</h1>
  {{ if not .Date.IsZero }}<p class="post-meta">{{ .Date.Format "January 2, 2006" }}</p>{{ end }}
  <div class="post-content">
    {{ .Content }}
  </div>
</article>
{{ end }}
```

- [ ] **Step 7: Write `_default/list.html`**

Create `themes/minimal-academic/layouts/_default/list.html`:
```html
{{ define "main" }}
<section class="list">
  <h1>{{ .Title }}</h1>
  {{ .Content }}
  <ul class="post-list">
    {{ range .Pages.ByDate.Reverse }}
      <li>
        <a class="post-list-link" href="{{ .RelPermalink }}">{{ .Title }}</a>
        {{ if not .Date.IsZero }}<span class="post-list-date">{{ .Date.Format "Jan 2, 2006" }}</span>{{ end }}
      </li>
    {{ end }}
  </ul>
</section>
{{ end }}
```

- [ ] **Step 8: Write the base CSS**

Create `themes/minimal-academic/static/css/style.css`:
```css
:root {
  --maxw: 720px;
  --ink: #1a1a1a;
  --muted: #6b6b6b;
  --accent: #2a4d6e;
  --rule: #e6e6e6;
  --bg: #ffffff;
}
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.65;
}
.content { max-width: var(--maxw); margin: 0 auto; padding: 0 1.25rem 4rem; }
.site-header { max-width: var(--maxw); margin: 0 auto; padding: 2rem 1.25rem 1rem; }
.nav { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid var(--rule); padding-bottom: 1rem; }
.site-title { font-weight: 700; font-size: 1.15rem; text-decoration: none; color: var(--ink); }
.nav-links { list-style: none; display: flex; gap: 1.25rem; margin: 0; padding: 0; }
.nav-links a { text-decoration: none; color: var(--muted); }
.nav-links a:hover { color: var(--ink); }
.nav-links a.active { color: var(--ink); font-weight: 700; }
a { color: var(--accent); }
h1 { font-size: 1.9rem; line-height: 1.2; margin: 1.5rem 0 0.5rem; }
h2 { font-size: 1.4rem; margin-top: 2rem; }
.post-meta { color: var(--muted); font-style: italic; margin-top: 0; }
.post-list { list-style: none; padding: 0; }
.post-list li { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; padding: 0.5rem 0; border-bottom: 1px solid var(--rule); }
.post-list-date { color: var(--muted); font-size: 0.9rem; white-space: nowrap; }
.site-footer { max-width: var(--maxw); margin: 0 auto; padding: 2rem 1.25rem; border-top: 1px solid var(--rule); color: var(--muted); font-size: 0.9rem; }
```

- [ ] **Step 9: Write a temporary home stub so the site builds**

Create `content/_index.md`:
```markdown
---
title: "Home"
---

Placeholder home page.
```

- [ ] **Step 10: Build and verify**

Run:
```bash
hugo && grep -l "nav-links" public/index.html && grep -c "katex" public/index.html
```
Expected: build succeeds; `public/index.html` is listed (nav present); grep count for "katex" is ≥ 3 (CSS + katex.min.js + auto-render).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "Add minimal-academic theme: base layouts, nav, footer, KaTeX, CSS"
```

---

### Task 3: Home page

**Files:**
- Create: `themes/minimal-academic/layouts/index.html`
- Modify: `content/_index.md` (replace the Task 2 stub)

**Interfaces:**
- Consumes: `baseof.html` `main` block from Task 2.
- Produces: home page at `/` rendering the intro Markdown, with links to `/resume/` and a `mailto:` link.

- [ ] **Step 1: Write `layouts/index.html`**

Create `themes/minimal-academic/layouts/index.html`:
```html
{{ define "main" }}
<section class="home">
  {{ .Content }}
</section>
{{ end }}
```

- [ ] **Step 2: Replace `content/_index.md` with real intro content**

Overwrite `content/_index.md`:
```markdown
---
title: "Home"
---

# Hi, I'm Yash Totlani

I'm a mathematician interested in number theory and geometry. I'm currently
looking for opportunities where I can put that background to work. This site
collects my resume and a blog where I write about mathematics I find beautiful.

[Read my resume](/resume/) · [Email me](mailto:totlaniyash4@gmail.com)
```

- [ ] **Step 3: Build and verify**

Run:
```bash
hugo && grep -q "Hi, I'm Yash Totlani" public/index.html && grep -q 'href="/resume/"' public/index.html && grep -q "mailto:totlaniyash4@gmail.com" public/index.html && echo OK
```
Expected: prints `OK` (heading, resume link, and email link all present).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add home page layout and intro content"
```

---

### Task 4: Blog section with a first math post

**Files:**
- Create: `content/blog/_index.md`
- Create: `content/blog/hello-math.md`

**Interfaces:**
- Consumes: `_default/list.html` and `_default/single.html` from Task 2; the `passthrough` markup config from Task 1; KaTeX from Task 2.
- Produces: blog list at `/blog/` (posts newest first) and a post at `/blog/hello-math/` whose page contains raw, un-escaped math delimiters for KaTeX to render at load time.

- [ ] **Step 1: Write the blog section index**

Create `content/blog/_index.md`:
```markdown
---
title: "Blog"
---

Notes on mathematics.
```

- [ ] **Step 2: Write the first post (a math smoke-test)**

Create `content/blog/hello-math.md`:
```markdown
---
title: "Hello, Math"
date: 2026-07-03
---

This first post exists to confirm that mathematics renders correctly. Here is
an inline claim: for a prime $p$, the multiplicative group $(\mathbb{Z}/p\mathbb{Z})^\times$
is cyclic of order $p - 1$.

And here is a displayed equation, the Euler product for the Riemann zeta
function:

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^{s}} = \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}}.
$$

Real posts will follow.
```

- [ ] **Step 3: Build and verify the listing**

Run:
```bash
hugo && grep -q 'href="/blog/hello-math/"' public/blog/index.html && grep -q "Hello, Math" public/blog/index.html && echo LIST_OK
```
Expected: prints `LIST_OK`.

- [ ] **Step 4: Verify the post renders the date and passes math through un-escaped**

Run:
```bash
grep -q "July 3, 2026" public/blog/hello-math/index.html && grep -q 'zeta(s)' public/blog/hello-math/index.html && grep -q 'mathbb{Z}' public/blog/hello-math/index.html && echo POST_OK
```
Expected: prints `POST_OK` — confirms the date formats correctly and that the LaTeX (`\zeta`, `\mathbb{Z}`) survives into the HTML verbatim (passthrough working) rather than being escaped or stripped. KaTeX renders it in the browser.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add blog section and first math post"
```

---

### Task 5: Resume page with Download PDF button

**Files:**
- Create: `themes/minimal-academic/layouts/_default/resume.html`
- Create: `content/resume.md`
- Create: `static/resume.pdf` (placeholder)
- Modify: `themes/minimal-academic/static/css/style.css` (append resume styles)

**Interfaces:**
- Consumes: `baseof.html` `main` block from Task 2.
- Produces: `/resume/` page rendering resume Markdown plus a `Download PDF` button linking to `/resume.pdf`; the PDF is served from the site root.

- [ ] **Step 1: Write the resume layout**

Create `themes/minimal-academic/layouts/_default/resume.html`:
```html
{{ define "main" }}
<article class="resume">
  <div class="resume-header">
    <h1>{{ .Title }}</h1>
    <a class="btn-download" href="{{ "resume.pdf" | relURL }}" download>Download PDF</a>
  </div>
  <div class="resume-content">
    {{ .Content }}
  </div>
</article>
{{ end }}
```

- [ ] **Step 2: Write the resume content (uses the `resume` layout)**

Create `content/resume.md`:
```markdown
---
title: "Resume"
layout: "resume"
---

## Education

**Cornell University** — B.A. in Mathematics
*Placeholder: dates, honors, relevant coursework.*

## Experience

**Placeholder Role** — Organization
*Placeholder: dates, one or two bullet points describing impact.*

## Skills

Placeholder: languages, tools, mathematical areas.
```

- [ ] **Step 3: Create a placeholder PDF**

Run:
```bash
printf '%%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>endobj\n4 0 obj<</Length 58>>stream\nBT /F1 24 Tf 72 700 Td (Resume placeholder - replace me) Tj ET\nendstream endobj\n5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\ntrailer<</Root 1 0 R/Size 6>>\n%%%%EOF\n' > static/resume.pdf
```
Then verify it looks like a PDF:
```bash
head -c 5 static/resume.pdf
```
Expected: prints `%PDF-`. (This is a throwaway placeholder; the owner replaces `static/resume.pdf` with their real resume, same filename, no other change needed.)

- [ ] **Step 4: Append resume styles to the CSS**

Append to `themes/minimal-academic/static/css/style.css`:
```css
.resume-header { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.btn-download {
  display: inline-block;
  font-family: -apple-system, Helvetica, Arial, sans-serif;
  font-size: 0.85rem;
  text-decoration: none;
  color: #fff;
  background: var(--accent);
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  white-space: nowrap;
}
.btn-download:hover { opacity: 0.9; }
.resume-content h2 { border-bottom: 1px solid var(--rule); padding-bottom: 0.25rem; }
```

- [ ] **Step 5: Build and verify**

Run:
```bash
hugo && grep -q "Download PDF" public/resume/index.html && grep -q 'href="/resume.pdf"' public/resume/index.html && test -f public/resume.pdf && head -c 5 public/resume.pdf && echo " RESUME_OK"
```
Expected: prints `%PDF- RESUME_OK` — the page has the button, the link points at the PDF, and the PDF is present in the built site.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add resume page with Download PDF button and placeholder PDF"
```

---

### Task 6: Styling polish — responsive + math spacing

**Files:**
- Modify: `themes/minimal-academic/static/css/style.css` (append polish rules)

**Interfaces:**
- Consumes: all page types from Tasks 2–5.
- Produces: a small-screen responsive layout and comfortable spacing around display math; no structural/template changes.

- [ ] **Step 1: Append polish rules to the CSS**

Append to `themes/minimal-academic/static/css/style.css`:
```css
/* Comfortable spacing + horizontal scroll for wide display math */
.katex-display { margin: 1.25rem 0; overflow-x: auto; overflow-y: hidden; padding: 0.25rem 0; }

/* Small screens */
@media (max-width: 600px) {
  body { font-size: 17px; }
  .nav { flex-direction: column; align-items: flex-start; }
  .nav-links { gap: 1rem; flex-wrap: wrap; }
  h1 { font-size: 1.6rem; }
}
```

- [ ] **Step 2: Build and verify the rules are present**

Run:
```bash
hugo && grep -q "katex-display" public/css/style.css && grep -q "max-width: 600px" public/css/style.css && echo POLISH_OK
```
Expected: prints `POLISH_OK`.

- [ ] **Step 3: Visual check in the browser**

Run:
```bash
hugo server
```
Open http://localhost:1313 and confirm, then stop the server (Ctrl-C):
- Home shows the intro and links; nav shows Home/Resume/Blog with the current page bolded.
- `/blog/` lists "Hello, Math"; the post renders the inline and displayed equations as typeset math (not raw `$...$`).
- `/resume/` shows the Download PDF button and clicking it serves the PDF.
- Narrow the window: layout stays readable, nav wraps, no horizontal page scroll.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Polish: responsive layout and display-math spacing"
```

---

### Task 7: Owner README

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: nothing.
- Produces: plain-language instructions for the owner to run the site locally and add posts.

- [ ] **Step 1: Write `README.md`**

Create `README.md`:
```markdown
# Personal Website

A Hugo static site: home page, resume, and a math blog with LaTeX.

## Run it locally

1. Install Hugo once: `brew install hugo`
2. From this folder, start the live preview: `hugo server`
3. Open http://localhost:1313 — edits reload automatically. Stop with Ctrl-C.

## Add a blog post

Create a file `content/blog/my-post-title.md`:

​```markdown
---
title: "My Post Title"
date: 2026-07-03
---

Write here. Inline math with $a^2 + b^2 = c^2$ and display math with:

$$
\int_0^1 x^2 \, dx = \tfrac{1}{3}.
$$
​```

Save — it appears at `/blog/my-post-title/` and in the blog list automatically.

## Update the resume

- Edit the text in `content/resume.md`.
- Replace `static/resume.pdf` with your real resume PDF (keep the same filename).

## Change your name / email

Edit `author` and `email` under `[params]` in `hugo.toml`.
```

- [ ] **Step 2: Verify and commit**

Run:
```bash
test -f README.md && grep -q "hugo server" README.md && echo README_OK
```
Expected: prints `README_OK`.
```bash
git add -A
git commit -m "Add README with local run and authoring instructions"
```

---

## Notes on later work (out of scope now)

- **Hosting:** the site builds to `public/`. When ready, deploy to GitHub Pages, Netlify, or Cloudflare Pages (all free for static sites). A one-line `baseURL` change and a deploy config are all that's needed.
- **Offline math:** KaTeX is loaded from a CDN. If offline rendering is ever needed, vendor the KaTeX `dist/` into `static/katex/` and update `head.html`.
