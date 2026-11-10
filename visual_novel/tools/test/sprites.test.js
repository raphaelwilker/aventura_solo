const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const GAME = path.join(__dirname, '..', '..', 'game');
const SCRIPT = path.join(GAME, 'script');
const todos = fs.readdirSync(SCRIPT).filter((f) => f.endsWith('.rpy')).map((f) => fs.readFileSync(path.join(SCRIPT, f), 'utf8')).join('\n');

function linhas(no) {
  const ini = todos.indexOf(`label ${no}:`);
  const prox = todos.indexOf('label no_', ini + 5);
  return todos.slice(ini, prox < 0 ? undefined : prox).split('\n');
}
const SHOW_H = '    show char_heroi_caminhando at posicao_heroi with dissolve';
const HIDE_H = '    hide char_heroi_caminhando with dissolve';
const SHOW_S = '    show char_scrags at posicao_scrags with dissolve';
const HIDE_S = '    hide char_scrags with dissolve';

test('nó 0: o herói caminhando aparece logo depois da música e some antes de "Quantidade pequena demais..." (enfrentar os bandidos)', () => {
  const l = linhas('no_00');
  const iMus = l.findIndex((x) => /tocar_musica\(/.test(x));
  assert.strictEqual(l[iMus + 1], SHOW_H);
  const iHide = l.indexOf(HIDE_H);
  assert.ok(iHide > iMus + 1);
  assert.ok(l[iHide + 1].startsWith('    narrador "Quantidade pequena demais para fazer frente a um guerreiro de Hedryl."'));
  assert.ok(l[iMus + 2].startsWith('    narrador "As comemorações terminaram'), 'o herói aparece junto da 1ª fala');
});

test('nó 2: os scrags aparecem na fala que os apresenta', () => {
  const l = linhas('no_02');
  const i = l.indexOf(SHOW_S);
  assert.ok(i > -1, 'falta o show dos scrags');
  assert.ok(l[i + 1].startsWith('    narrador "Durante essa rápida pausa'));
  assert.ok(!l.includes(HIDE_S), 'no nó 2 o combate ainda não acabou');
});

test('nós 5 e 6: os scrags aparecem no início e somem quando o herói vence ou escapa ("Você continua seguindo...")', () => {
  for (const no of ['no_05', 'no_06']) {
    const l = linhas(no);
    const iMus = l.findIndex((x) => /tocar_musica\("mus_pantano"\)/.test(x));
    assert.strictEqual(l[iMus + 1], SHOW_S, `${no}: scrags no início`);
    const iHide = l.indexOf(HIDE_S);
    assert.ok(l[iHide + 1].startsWith('    narrador "Você continua seguindo, agora mais atento'), `${no}: some quando a luta acaba`);
  }
});

test('só esses nós mostram personagens (1 do herói + 3 dos scrags; 1 + 2 sumiços)', () => {
  assert.strictEqual((todos.match(/^\s+show char_/gm) || []).length, 4);
  assert.strictEqual((todos.match(/^\s+hide char_/gm) || []).length, 3);
  assert.strictEqual((todos.match(new RegExp(SHOW_H.trim(), 'g')) || []).length, 1);
});

test('personagens.rpy define as posições (acima da caixa de texto)', () => {
  const p = fs.readFileSync(path.join(GAME, 'personagens.rpy'), 'utf8');
  assert.match(p, /^transform posicao_heroi:\n    xpos 0\.5 xanchor 0\.5 ypos 505 yanchor 1\.0$/m); // centralizado na tela
  assert.match(p, /^transform posicao_scrags:\n    xpos 0\.5 xanchor 0\.5 ypos 505 yanchor 1\.0$/m);
});

test('as imagens dos personagens são PNG com transparência (RGBA) e no tamanho certo', () => {
  for (const [f, altura] of [['char_heroi_caminhando.png', 480], ['char_scrags.png', 400]]) {
    const b = fs.readFileSync(path.join(GAME, 'images', f));
    assert.strictEqual(b.readUInt32BE(20), altura, `${f}: altura`);
    assert.strictEqual(b[25], 6, `${f}: precisa ser RGBA (tipo de cor 6)`);
  }
});

test('música de derrota: arquivo presente, toca uma vez só (vinheta curta) e crédito de No Hope nos finais', () => {
  const dir = path.join(GAME, 'audio');
  const achados = ['ogg', 'opus', 'mp3', 'flac', 'wav'].map((e) => path.join(dir, `mus_derrota.${e}`)).filter((f) => fs.existsSync(f));
  assert.strictEqual(achados.length, 1);
  const m = fs.readFileSync(path.join(GAME, 'musica.rpy'), 'utf8');
  assert.match(m, /FAIXAS_SEM_LOOP = \("mus_derrota",\)/);
  assert.match(m, /loop=\(faixa not in FAIXAS_SEM_LOOP\)/);
  const cap03 = fs.readFileSync(path.join(SCRIPT, 'cap03.rpy'), 'utf8');
  assert.strictEqual((cap03.match(/narrador "Música: No Hope, de Cleyton R\. Xavier"/g) || []).length, 2);
});
