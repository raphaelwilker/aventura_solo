#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { loadAdventure } = require('./lib/load-adventure');
const { CHAPTERS } = require('./lib/chapters');
const { graphMarkdown } = require('./lib/graph-md');

const [source, outFile] = process.argv.slice(2);
if (!source || !outFile) {
  console.error('uso: node tools/graph.js <adventure.js> <saida.md>');
  process.exit(2);
}
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, graphMarkdown(loadAdventure(source), CHAPTERS));
console.log(outFile);
