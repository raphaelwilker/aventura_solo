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

test('characters.rpy define o narrador em modo ADV (caixa de texto embaixo), sem restos do modo NVL', () => {
  const c = fs.readFileSync(path.join(GAME, 'characters.rpy'), 'utf8');
  assert.match(c, /^define narrador = Character\(None\)$/m);
  assert.ok(!/nvl/.test(c), 'sobrou configuração NVL');
});

test('characters.rpy define a caixa de texto: larga, na parte de baixo, translúcida', () => {
  const c = fs.readFileSync(path.join(GAME, 'characters.rpy'), 'utf8');
  assert.match(c, /^style window:\n(    .+\n)*    xsize 1120$/m);
  assert.match(c, /^    background Solid\("#1a120ccc"\)$/m);
  assert.match(c, /^define gui\.textbox_height = 190$/m);
});

test('characters.rpy deixa as opções do menu claras e com destaque (o cinza do template some sobre a arte)', () => {
  const c = fs.readFileSync(path.join(GAME, 'characters.rpy'), 'utf8');
  assert.match(c, /^style choice_button_text:\n    idle_color "#f0f0f0"\n    hover_color "#ffd479"$/m);
});

test('characters.rpy deixa o menu rápido (Back, History, Skip...) branco com contorno, legível sobre o cenário', () => {
  const c = fs.readFileSync(path.join(GAME, 'characters.rpy'), 'utf8');
  assert.match(c, /^style quick_button_text:\n    idle_color "#ffffff"\n    hover_color "#ffd479"\n    outlines \[ \(1, "#000000c0", 0, 1\) \]$/m);
});
