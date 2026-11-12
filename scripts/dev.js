// Dev loop: build, serve build/ with BrowserSync, rebuild + reload on changes.
import browserSync from 'browser-sync'
import { spawnSync } from 'node:child_process'

const build = () => {
  const r = spawnSync('node', ['metalsmith.js'], { stdio: 'inherit' })
  return r.status === 0
}

build()

const bs = browserSync.create()
let timer
const rebuild = () => {
  clearTimeout(timer)
  timer = setTimeout(() => { if (build()) bs.reload() }, 100) // debounce bursts of saves
}

bs.init({
  server: 'build',
  port: 3000,
  open: false,
  notify: false,
  ui: false,
  watch: false
})

bs.watch(['src/**/*', 'layouts/**/*', 'lib/**/*', 'metalsmith.js'], { ignoreInitial: true }, rebuild)
