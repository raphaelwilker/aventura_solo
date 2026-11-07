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

test('characters.rpy define o narrador em modo NVL e menus no modo NVL', () => {
  const c = fs.readFileSync(path.join(GAME, 'characters.rpy'), 'utf8');
  assert.match(c, /^define narrador = Character\(None, kind=nvl\)$/m);
  assert.match(c, /^define config\.narrator_menu = True$/m);
  assert.match(c, /^define menu = nvl_menu$/m); // sem isso o texto some quando o menu aparece
});

test('characters.rpy deixa a altura de cada parágrafo NVL automática (o template fixa em 115 e o texto longo se sobrepõe)', () => {
  const c = fs.readFileSync(path.join(GAME, 'characters.rpy'), 'utf8');
  assert.match(c, /^define gui\.nvl_height = None$/m);
});
