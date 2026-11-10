#!/usr/bin/env node
// Insere os `scene` de lib/scenes.js nos .rpy de uma pasta. Roda uma vez; depois edite à mão.
const fs = require('node:fs');
const path = require('node:path');
const { SCENES } = require('./lib/scenes');
const { addScenes } = require('./lib/add-scenes');

const dir = process.argv[2];
if (!dir) {
  console.error('uso: node tools/add-scenes.js <pasta game/script>');
  process.exit(2);
}
try {
  const results = fs.readdirSync(dir).filter((f) => f.endsWith('.rpy')).map((f) => {
    const file = path.join(dir, f);
    return { file, ...addScenes(fs.readFileSync(file, 'utf8'), SCENES) };
  });
  const done = results.flatMap((r) => r.applied);
  if (done.length !== Object.keys(SCENES).length) {
    throw new Error(`esperava ${Object.keys(SCENES).length} nós, aplicou em ${done.length}`);
  }
  results.forEach((r) => fs.writeFileSync(r.file, r.text)); // só grava se tudo deu certo
  console.log(`cenários inseridos em ${done.length} nós`);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
