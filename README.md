# Tufte site

Metalsmith + [tufte-css](https://github.com/edwardtufte/tufte-css). No framework, no Tailwind, no client JS.

    npm install
    npm run build      # outputs to build/
    npm run dev        # BrowserSync at http://localhost:3000, rebuilds + reloads on save
    npm run serve      # static preview of build/ at http://localhost:8080

## Writing

Add Markdown files to `src/posts/` with front matter:

    ---
    title: My post
    subtitle: Optional
    date: 2026-11-12
    layout: page.hbs
    ---

Special syntax (see `lib/tufte-notes.js`):

- `{{sn: text}}` numbered sidenote
- `{{mn: text}}` margin note
- Raw HTML works: `<figure>`, `<div class="fullwidth">`, etc.

## Layout

- `metalsmith.js`   build pipeline and site metadata (title, author, base path)
- `layouts/`        Handlebars templates (`page.hbs`, `posts.hbs`)
- `src/`            content; `src/css/site.css` holds your small additions
- `lib/tufte-notes.js` the sidenote plugin

Set `site.base` in `metalsmith.js` if you host under a subfolder.
