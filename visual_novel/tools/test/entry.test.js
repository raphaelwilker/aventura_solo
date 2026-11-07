const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { validateRpyDir } = require('../lib/validate-rpy');

const GAME = path.join(__dirname, '..', '..', 'game');

test('game/ valida sem erros a partir de start: start leva ao no_00 e os 33 labels são alcançáveis', () => {
  const result = validateRpyDir(GAME, 'start');
  assert.deepStrictEqual(result.errors, []);
  assert.strictEqual(result.labels, 33); // start + 32 nós
});

test('state.rpy declara "default ferido_pescoco = False"', () => {
  const state = fs.readFileSync(path.join(GAME, 'state.rpy'), 'utf8');
  assert.match(state, /^default ferido_pescoco = False$/m);
});
