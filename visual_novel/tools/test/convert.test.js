const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { CHAPTERS } = require('../lib/chapters');
const { convert } = require('../convert');

const SOURCE = path.join(__dirname, '..', 'source', 'adventure.js');
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'vn-convert-'));
const read = (dir, file) => fs.readFileSync(path.join(dir, 'script', file), 'utf8');

test('CHAPTERS cobre cada id de 0 a 31 exatamente uma vez', () => {
  const all = CHAPTERS.flatMap((c) => c.ids).sort((a, b) => a - b);
  assert.deepStrictEqual(all, Array.from({ length: 32 }, (_, i) => i));
});

test('convert gera cap01, cap02 e cap03 com 32 labels no total', () => {
  const out = tmp();
  const files = convert({ source: SOURCE, outDir: out, force: false });
  assert.deepStrictEqual(files.map((f) => path.basename(f)), ['cap01.rpy', 'cap02.rpy', 'cap03.rpy']);
  const labels = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n').match(/^label no_\d\d:/gm);
  assert.strictEqual(labels.length, 32);
});

test('no_17 mantém "jump no_21" (problema do JSON preservado na v1)', () => {
  const out = tmp();
  convert({ source: SOURCE, outDir: out, force: false });
  const cap02 = read(out, 'cap02.rpy');
  const no17 = cap02.slice(cap02.indexOf('label no_17:'), cap02.indexOf('label no_18:'));
  assert.ok(no17.includes('jump no_21'));
});

test('segunda chamada sem force lança e não altera arquivos; com force sobrescreve', () => {
  const out = tmp();
  convert({ source: SOURCE, outDir: out, force: false });
  const target = path.join(out, 'script', 'cap01.rpy');
  fs.appendFileSync(target, '# edição manual\n');
  assert.throws(() => convert({ source: SOURCE, outDir: out, force: false }), /cap01\.rpy/);
  assert.ok(fs.readFileSync(target, 'utf8').includes('# edição manual'));
  convert({ source: SOURCE, outDir: out, force: true });
  assert.ok(!fs.readFileSync(target, 'utf8').includes('# edição manual'));
});
