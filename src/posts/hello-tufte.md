---
title: Hello, Tufte
subtitle: A tour of what the theme can do
date: 2026-11-12
layout: page.hbs
---

## Sidenotes and margin notes

Edward Tufte's books place notes beside the text rather than at the foot of the page.{{sn: This is a sidenote. Inline *Markdown* works inside it, including [links](https://edwardtufte.github.io/tufte-css/).}} Here the same idea is written in plain Markdown using a tiny `{{sn: ...}}` syntax.

{{mn: A margin note. Unnumbered, good for asides.}}Use margin notes for things that are not tied to one specific word.

## Figures

<figure>
  <img src="https://edwardtufte.github.io/tufte-css/img/rhino.png" alt="Rhinoceros">
  <figcaption>Raw HTML is allowed in Markdown, so figures are just Tufte's markup.</figcaption>
</figure>

## Code and blockquotes

```js
console.log('code blocks use the Tufte code style')
```

> The commonality between science and art is in trying to see profoundly, to develop strategies of seeing and showing.
> <footer>Edward Tufte, <cite>Beautiful Evidence</cite></footer>

## Full-width content

<div class="fullwidth">

Wrap anything in `<div class="fullwidth">` for tables or figures that need the whole page.

</div>
