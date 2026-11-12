/**
 * Tiny Metalsmith plugin that turns compact inline syntax in Markdown into
 * Tufte CSS markup:
 *
 *   {{sn: text}}   ->  numbered sidenote
 *   {{mn: text}}   ->  un-numbered margin note
 *
 * Runs BEFORE the markdown plugin; inline Markdown inside the note text
 * (emphasis, links) is rendered by the markdown step because the generated
 * <span> is inline HTML.
 */
export default function tufteNotes() {
  return (files) => {
    for (const [name, file] of Object.entries(files)) {
      if (!name.endsWith('.md')) continue
      let n = 0
      let text = file.contents.toString()
      // Leave fenced code blocks and inline code untouched so the syntax can be documented
      const parts = text.split(/(```[\s\S]*?```|`[^`\n]*`)/g)
      text = parts.map((part, i) => i % 2 ? part : part.replace(/\{\{(sn|mn):\s*([\s\S]*?)\}\}/g, (_, kind, body) => {
        n++
        const id = `${kind}-${n}`
        body = body.trim()
        if (kind === 'sn') {
          return `<label for="${id}" class="margin-toggle sidenote-number"></label><input type="checkbox" id="${id}" class="margin-toggle"/><span class="sidenote">${body}</span>`
        }
        return `<label for="${id}" class="margin-toggle">&#8853;</label><input type="checkbox" id="${id}" class="margin-toggle"/><span class="marginnote">${body}</span>`
      })).join('')
      file.contents = Buffer.from(text)
    }
  }
}
