const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { TRACKS, MUSIC } = require('../lib/music');
const { SCENES } = require('../lib/scenes');
const { addMusic } = require('../lib/add-music');

const GAME = path.join(__dirname, '..', '..', 'game');
const GAME_SCRIPT = path.join(GAME, 'script');

const SAMPLE = [
  'label no_05:',
  '    scene bg_a with dissolve',
  '    narrador "A"',
  '    narrador "B"',
  '    scene bg_b with dissolve',
  '    narrador "C"',
  '    return',
  '',
].join('\n');

test('são 10 faixas, com IDs mus_*', () => {
  assert.strictEqual(Object.keys(TRACKS).length, 10);
  for (const id of Object.keys(TRACKS)) assert.match(id, /^mus_[a-z_]+$/);
});

test('MUSIC cobre os 32 nós; a 1ª faixa de cada nó vale desde o cenário 0', () => {
  assert.deepStrictEqual(Object.keys(MUSIC).map(Number).sort((a, b) => a - b), Array.from({ length: 32 }, (_, i) => i));
  for (const list of Object.values(MUSIC)) assert.strictEqual(list[0].scene, 0);
});

test('toda faixa usada nos nós existe em TRACKS, e todas as 9 (menos a da tela inicial) são usadas', () => {
  const usadas = new Set(Object.values(MUSIC).flat().map((m) => m.track));
  for (const t of usadas) assert.ok(TRACKS[t], `faixa desconhecida: ${t}`);
  assert.deepStrictEqual([...usadas].sort(), Object.keys(TRACKS).filter((t) => t !== 'mus_titulo').sort());
});

test('toda troca de música cai num cenário que existe no nó e está em ordem crescente', () => {
  for (const [id, list] of Object.entries(MUSIC)) {
    list.forEach((m, i) => {
      assert.ok(m.scene < SCENES[id].length, `nó ${id}: cenário ${m.scene} não existe`);
      if (i > 0) assert.ok(m.scene > list[i - 1].scene, `nó ${id}: fora de ordem`);
    });
  }
});

test('addMusic insere a música logo depois do cenário indicado', () => {
  const out = addMusic(SAMPLE, { 5: [{ track: 'mus_a', scene: 0 }, { track: 'mus_b', scene: 1 }] }).text;
  assert.ok(out.includes('    scene bg_a with dissolve\n    $ tocar_musica("mus_a")\n    narrador "A"'));
  assert.ok(out.includes('    scene bg_b with dissolve\n    $ tocar_musica("mus_b")\n    narrador "C"'));
});

test('addMusic não altera nenhuma outra linha', () => {
  const out = addMusic(SAMPLE, { 5: [{ track: 'mus_a', scene: 0 }] }).text;
  assert.deepStrictEqual(out.split('\n').filter((l) => !l.includes('tocar_musica')), SAMPLE.split('\n'));
});

test('addMusic recusa um nó que já tem música e ignora nós de outro arquivo', () => {
  const once = addMusic(SAMPLE, { 5: [{ track: 'mus_a', scene: 0 }] }).text;
  assert.throws(() => addMusic(once, { 5: [{ track: 'mus_a', scene: 0 }] }), /no_05/);
  assert.deepStrictEqual(addMusic(SAMPLE, { 5: [{ track: 'mus_a', scene: 0 }], 9: [{ track: 'mus_z', scene: 0 }] }).applied, [5]);
});

test('o jogo real tem, em cada nó, as faixas de MUSIC na ordem, cada uma logo antes de um parágrafo', () => {
  const found = {};
  for (const f of fs.readdirSync(GAME_SCRIPT)) {
    const lines = fs.readFileSync(path.join(GAME_SCRIPT, f), 'utf8').split('\n');
    let node = null;
    lines.forEach((l, i) => {
      const m = l.match(/^label no_(\d\d):/);
      if (m) {
        node = Number(m[1]);
        found[node] = [];
        return;
      }
      const t = l.match(/^\s+\$ tocar_musica\("(mus_\w+)"\)$/);
      if (t) {
        assert.match(lines[i - 1], /^\s+scene /, `nó ${node}: música sem cenário antes`);
        assert.match(lines[i + 1], /^\s+narrador "/, `nó ${node}: música sem parágrafo depois`);
        found[node].push(t[1]);
      }
    });
  }
  const expected = Object.fromEntries(Object.entries(MUSIC).map(([id, list]) => [id, list.map((m) => m.track)]));
  assert.deepStrictEqual(found, expected);
});

test('musica.rpy: função tocar_musica silenciosa sem arquivo, música da tela inicial e extensões aceitas', () => {
  const m = fs.readFileSync(path.join(GAME, 'musica.rpy'), 'utf8');
  assert.match(m, /^default musica_atual = None$/m);
  assert.match(m, /def tocar_musica\(faixa\):/);
  assert.match(m, /getattr\(store, "musica_atual", None\) == faixa/, 'tolerar a variável ausente (salto direto para um nó, sem passar pelo início)');
  assert.match(m, /renpy\.loadable\(/);
  assert.match(m, /fadein=1\.5/);
  assert.match(m, /renpy\.music\.stop\(channel="music", fadeout=1\.5\)/);
  assert.match(m, /config\.main_menu_music = /);
  for (const ext of ['ogg', 'opus', 'mp3', 'flac', 'wav']) assert.ok(m.includes(`"${ext}"`), `falta ${ext}`);
});
