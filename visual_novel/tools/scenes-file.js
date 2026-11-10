#!/usr/bin/env node
// Gera o game/cenarios.rpy (fundos provisórios).
const fs = require('node:fs');
const { emitScenesFile } = require('./lib/scenes');

const out = process.argv[2];
if (!out) {
  console.error('uso: node tools/scenes-file.js <game/cenarios.rpy>');
  process.exit(2);
}
fs.writeFileSync(out, emitScenesFile());
console.log(out);
