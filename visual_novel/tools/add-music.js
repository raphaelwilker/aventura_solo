#!/usr/bin/env node
// Insere as músicas de lib/music.js nos .rpy de uma pasta. Roda uma vez; depois edite à mão.
const fs = require('node:fs');
const path = require('node:path');
const { MUSIC } = require('./lib/music');
const { addMusic } = require('./lib/add-music');

const dir = process.argv[2];
if (!dir) {
  console.error('uso: node tools/add-music.js <pasta game/script>');
  process.exit(2);
}
try {
  const results = fs.readdirSync(dir).filter((f) => f.endsWith('.rpy')).map((f) => {
    const file = path.join(dir, f);
    return { file, ...addMusic(fs.readFileSync(file, 'utf8'), MUSIC) };
  });
  const done = results.flatMap((r) => r.applied);
  if (done.length !== Object.keys(MUSIC).length) {
    throw new Error(`esperava ${Object.keys(MUSIC).length} nós, aplicou em ${done.length}`);
  }
  results.forEach((r) => fs.writeFileSync(r.file, r.text)); // só grava se tudo deu certo
  console.log(`músicas inseridas em ${done.length} nós`);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
