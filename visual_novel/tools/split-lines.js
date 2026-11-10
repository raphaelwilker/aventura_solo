#!/usr/bin/env node
// Divide as linhas narrador longas dos .rpy de uma pasta (idempotente).
const fs = require('node:fs');
const path = require('node:path');
const { splitScript } = require('./lib/split-lines');

const dir = process.argv[2];
if (!dir) {
  console.error('uso: node tools/split-lines.js <pasta game/script>');
  process.exit(2);
}
let changed = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.rpy'))) {
  const file = path.join(dir, f);
  const before = fs.readFileSync(file, 'utf8');
  const after = splitScript(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}
console.log(`${changed} arquivo(s) alterado(s)`);
