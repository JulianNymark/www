# WWW

> "I want to broadcast my thoughts and _cool stuff_ to the world!" - everybody

Imagine you could simply jot down a bit of markdown, and have both cool website pages & presentations generated from them! (using the power of `markdown-it` and a heap of plugins to empower the markdown syntax!). It creates presentations using `revealjs` (and the `markdown-it-revealjs` plugin) and even generates diagrams and charts using `mermaidjs`... NEAT!

## project pipeline:

![`nodemon (filewatcher)` -> `tsc` -> `js (node)` -> `gen static pages` -> `rsync to the clouds!`](README/pipeline.png)

`nodemon (filewatcher)` -> `tsc` -> `js (node)` -> `gen static pages` -> `rsync to the clouds!`

# Usage

You might want to customize the remote targets defined in the `package.json` scripts! Currently they target _my_ servers (aka `.ssh/config` Host)!

1. after running

```shell
npm i
npm run dev
```
2. you can now create & edit `markdown.md` files under the `coolthings/src/markdown/` directory!

# Assumptions

1. I assume you have a webserver hosted somewhere! (in the clouds!), at least that's where I assume you'll swap out the target hostname of the `package.json` rsync command! I also assume that you've set up your webserver appropriately! (I'm not gonna bother putting my nginx config here!... for now! >:D )

# not so FAQ

Q. "There's no build system?! wow! amazing!"

A. Yeah! At the cost of chaining some npm scripts (increasing complexity a bit), I think I managed to pick the lesser evil of not having a build system!

Q. "There's no template library? madness! Use mustache, handlebars... etc already!"

A. That's right! The project just kinda started out using `template literals` in JS, and I think the whole project managed to stay _just_ under the threshold of needing a template library! (as soon as I need to do more template insertions in the future, I'm pretty sure I'll switch over then!)

Q. "why is the top level directory structure split up into `coolthings` and `presentations`?"

A. I wanted to keep each new "use case" (defined roughly by how _different_ the setup / template HTML I use is) to have a separate directory. Or at least, to be kept _somehow_ separate! The current KISS setup does incur a bit of duplication, but that's ok for now! It's also only dev-side, since the project only assumes you upload the `build/gen_md2html` folder contents, it's not like you fill up the webserver with massive `node_modules`, and even then it's only like 15M per "use case" :), webserver does get a bit of static content duplication, and I'll admit, those could be merged pretty easily... I just haven't gotten around to even _trying_ to merge "use cases"! (better safe than sorry!)

Q. "the diagrams don't look super pretty OOTB?! (mermaid diagrams)"

A. Yeah, it was a bit of a struggle! (and it's a bit hacky what I've done to get `mermaidjs` to work, _especially_ in conjunction with `revealjs`)... see `src/static/css/custom.css`. also look into the `<script>` in the html template for the `presentations` directory. You might have better luck messing around with those! :)