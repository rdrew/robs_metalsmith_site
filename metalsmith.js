import Metalsmith from "metalsmith";
import markdown from "@metalsmith/markdown";
import collections from "@metalsmith/collections";
import permalinks from "@metalsmith/permalinks";
import layouts from "@metalsmith/layouts";
import { cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import tufteNotes from "./lib/tufte-notes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const site = {
  title: "Robert Neil Drew",
  description: "Musician & Digital Archaeologist",
  author: "Rob Drew",
  // set to your real URL, or '' for relative links. For a subfolder host use e.g. '/mysite'
  base: "",
};

/** Copy tufte.css and its et-book fonts from node_modules (fonts are referenced relatively). */
function copyTufteAssets(dest) {
  const src = join(__dirname, "node_modules/tufte-css");
  cpSync(join(src, "tufte.min.css"), join(dest, "css/tufte.css"));
  cpSync(join(src, "et-book"), join(dest, "css/et-book"), { recursive: true });
}

/** Wrap-up: give every page a `date` object and a `year` for display */
function dates(files) {
  for (const f of Object.values(files)) {
    if (f.date)
      f.dateLabel = new Date(f.date).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
  }
}

/** After permalinks: give each page a clean `url` like /posts/hello-tufte/ */
function urls(files) {
  for (const [name, f] of Object.entries(files)) {
    if (name.endsWith("index.html"))
      f.url = "/" + name.replace(/index\.html$/, "");
  }
}

const ms = Metalsmith(__dirname)
  .metadata({ site })
  .source("src")
  .destination("build")
  .clean(true)
  .use(dates)
  .use(
    collections({
      posts: { pattern: "posts/*.md", sortBy: "date", reverse: true },
    }),
  )
  .use(tufteNotes())
  .use(markdown({ html: true, typographer: true }))
  .use(permalinks({ relative: false }))
  .use(urls)
  .use(
    layouts({
      directory: "layouts",
      transform: "handlebars",
      pattern: "**/*.html",
      default: "page.hbs",
    }),
  );

ms.build((err) => {
  if (err) throw err;
  copyTufteAssets(ms.destination()); // after build, because clean() wipes the folder first
  console.log("Built to build/");
});
