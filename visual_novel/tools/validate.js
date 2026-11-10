#!/usr/bin/env node
const { validateRpyDir } = require('./lib/validate-rpy');

const [dir, entry = 'no_00'] = process.argv.slice(2);
if (!dir) {
  console.error('uso: node tools/validate.js <dir> [entry]');
  process.exit(2);
}
const { errors, labels } = validateRpyDir(dir, entry);
if (errors.length > 0) {
  errors.forEach((e) => console.error(`ERRO: ${e}`));
  process.exit(1);
}
console.log(`OK: ${labels} labels, 0 erros`);
