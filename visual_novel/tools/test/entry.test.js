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

test('tela inicial: define o título num só lugar e o menu em português (Iniciar, Carregar, Opções, Sobre, Sair)', () => {
  const t = fs.readFileSync(path.join(GAME, 'tela_inicial.rpy'), 'utf8');
  assert.match(t, /^define titulo_jogo = ".+"$/m);
  assert.match(t, /^define subtitulo_jogo = ".+"$/m);
  assert.match(t, /^screen main_menu\(\):$/m);
  for (const [rotulo, acao] of [['Iniciar', 'Start\\(\\)'], ['Carregar', 'ShowMenu\\("load"\\)'], ['Opções', 'ShowMenu\\("preferences"\\)'], ['Sobre', 'ShowMenu\\("about"\\)']]) {
    assert.match(t, new RegExp(`textbutton "${rotulo}" action ${acao}`), `falta o botão ${rotulo}`);
  }
  assert.match(t, /renpy\.variant\("pc"\)[\s\S]*textbutton "Sair" action Quit/, 'Sair só no computador');
});

test('tela inicial: a ilustração de abertura e o degradê do lado do menu existem (1280x720)', () => {
  for (const [f, tipo] of [['bg_titulo.jpg', 'jpeg'], ['titulo_degrade.png', 'png']]) {
    const buf = fs.readFileSync(path.join(GAME, 'images', f));
    const [w, h] = tipo === 'png' ? [buf.readUInt32BE(16), buf.readUInt32BE(20)] : jpegSize(buf);
    assert.deepStrictEqual([w, h], [1280, 720], `${f} deve ter 1280x720`);
  }
});

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i += 1; continue; }
    const m = buf[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error('JPEG sem tamanho');
}
