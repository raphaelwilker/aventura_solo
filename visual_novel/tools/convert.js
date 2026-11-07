#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { loadAdventure } = require('./lib/load-adventure');
const { CHAPTERS, emitChapter } = require('./lib/chapters');

function convert({ source, outDir, force }) {
  const nodesById = new Map(loadAdventure(source).map((n) => [n.id, n]));
  const scriptDir = path.join(outDir, 'script');
  const targets = CHAPTERS.map((c) => path.join(scriptDir, c.file));

  const existing = targets.filter((t) => fs.existsSync(t));
  if (existing.length > 0 && !force) {
    throw new Error(
      `Arquivos já existem e podem ter edições manuais (use --force para sobrescrever): ${existing.join(', ')}`,
    );
  }

  fs.mkdirSync(scriptDir, { recursive: true });
  CHAPTERS.forEach((chapter, i) => fs.writeFileSync(targets[i], emitChapter(chapter, nodesById)));
  return targets;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const [source, outDir] = args.filter((a) => a !== '--force');
  if (!source || !outDir) {
    console.error('uso: node tools/convert.js <adventure.js> <outDir> [--force]');
    process.exit(2);
  }
  try {
    convert({ source, outDir, force }).forEach((f) => console.log(f));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

module.exports = { convert };
