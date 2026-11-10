const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { validateRpyDir } = require('../lib/validate-rpy');

function fixture(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vn-validate-'));
  for (const [name, content] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), content);
  return dir;
}

test('árvore válida não tem erros', () => {
  const dir = fixture({
    'a.rpy': 'label no_00:\n    "x"\n    jump no_01\n',
    'b.rpy': 'label no_01:\n    "y"\n    return\n',
  });
  assert.deepStrictEqual(validateRpyDir(dir, 'no_00').errors, []);
});

test('jump para label inexistente gera erro citando o label e o arquivo', () => {
  const dir = fixture({ 'a.rpy': 'label no_00:\n    jump no_99\n' });
  const { errors } = validateRpyDir(dir, 'no_00');
  assert.strictEqual(errors.length, 1);
  assert.match(errors[0], /no_99/);
  assert.match(errors[0], /a\.rpy/);
});

test('label duplicado gera erro', () => {
  const dir = fixture({
    'a.rpy': 'label no_00:\n    return\n',
    'b.rpy': 'label no_00:\n    return\n',
  });
  assert.ok(validateRpyDir(dir, 'no_00').errors.some((e) => /duplicado/.test(e) && /no_00/.test(e)));
});

test('label inalcançável a partir de entry gera erro', () => {
  const dir = fixture({ 'a.rpy': 'label no_00:\n    return\nlabel no_05:\n    return\n' });
  const { errors } = validateRpyDir(dir, 'no_00');
  assert.ok(errors.some((e) => /inalcançável/.test(e) && /no_05/.test(e)));
});

test('entry inexistente gera erro', () => {
  const dir = fixture({ 'a.rpy': 'label no_00:\n    return\n' });
  assert.ok(validateRpyDir(dir, 'start').errors.some((e) => /start/.test(e)));
});

test('a saída real do conversor valida sem erros e alcança os 32 labels a partir de no_00', () => {
  const dir = path.join(__dirname, '..', '..', 'game', 'script');
  const result = validateRpyDir(dir, 'no_00');
  assert.deepStrictEqual(result.errors, []);
  assert.strictEqual(result.labels, 32);
});
