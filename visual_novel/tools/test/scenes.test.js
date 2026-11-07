const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { SCENES, PLACEHOLDER_COLORS, emitScenesFile } = require('../lib/scenes');
const { addScenes } = require('../lib/add-scenes');
const { loadAdventure } = require('../lib/load-adventure');
const { validateRpyDir } = require('../lib/validate-rpy');
const { convert } = require('../convert');

const SOURCE = path.join(__dirname, '..', 'source', 'adventure.js');
const GAME_SCRIPT = path.join(__dirname, '..', '..', 'game', 'script');

const SAMPLE = [
  'label no_05:',
  '    narrador "A"',
  '    narrador "B"',
  '    narrador "C"',
  '    menu:',
  '        "X":',
  '            jump no_06',
  '',
].join('\n');

test('cenário em from=0 entra antes do primeiro parágrafo', () => {
  const out = addScenes(SAMPLE, { 5: [{ bg: 'bg_estrada', from: 0 }] }).text;
  assert.ok(out.includes('label no_05:\n    scene bg_estrada with dissolve\n    narrador "A"'));
});

test('mudança no meio do nó entra logo antes do parágrafo indicado', () => {
  const out = addScenes(SAMPLE, { 5: [{ bg: 'bg_a', from: 0 }, { bg: 'bg_b', from: 1 }, { bg: 'bg_c', from: 2 }] }).text;
  assert.ok(out.includes('    narrador "A"\n    scene bg_b with dissolve\n    narrador "B"\n    scene bg_c with dissolve\n    narrador "C"'));
  assert.ok(!out.includes('nvl'));
});

test('não altera nenhuma linha de texto nem de menu', () => {
  const out = addScenes(SAMPLE, { 5: [{ bg: 'bg_a', from: 0 }] }).text;
  const keep = (t) => t.split('\n').filter((l) => /narrador|menu|jump|label|"X"/.test(l));
  assert.deepStrictEqual(keep(out), keep(SAMPLE));
});

test('recusa um nó que já tem scene (não aplica duas vezes)', () => {
  const once = addScenes(SAMPLE, { 5: [{ bg: 'bg_a', from: 0 }] }).text;
  assert.throws(() => addScenes(once, { 5: [{ bg: 'bg_a', from: 0 }] }), /no_05/);
});

test('devolve os nós aplicados e ignora nós que estão em outro arquivo', () => {
  const r = addScenes(SAMPLE, { 5: [{ bg: 'bg_a', from: 0 }], 9: [{ bg: 'bg_z', from: 0 }] });
  assert.deepStrictEqual(r.applied, [5]);
});

test('SCENES cobre os 32 nós, e o 1º cenário de cada nó começa no parágrafo 0', () => {
  assert.deepStrictEqual(Object.keys(SCENES).map(Number).sort((a, b) => a - b), Array.from({ length: 32 }, (_, i) => i));
  for (const list of Object.values(SCENES)) assert.strictEqual(list[0].from, 0);
});

test('todo "from" de SCENES existe no nó (índice menor que o nº de parágrafos) e está em ordem crescente', () => {
  const nodes = new Map(loadAdventure(SOURCE).map((n) => [n.id, n]));
  for (const [id, list] of Object.entries(SCENES)) {
    list.forEach((s, i) => {
      assert.ok(s.from < nodes.get(Number(id)).paragraphs.length, `nó ${id}: from ${s.from} fora do texto`);
      if (i > 0) assert.ok(s.from > list[i - 1].from, `nó ${id}: from fora de ordem`);
    });
  }
});

test('todo bg usado em SCENES tem cor de placeholder, e são os 21 cenários da lista', () => {
  const used = new Set(Object.values(SCENES).flat().map((s) => s.bg));
  for (const bg of used) assert.ok(PLACEHOLDER_COLORS[bg], `sem cor para ${bg}`);
  assert.strictEqual(Object.keys(PLACEHOLDER_COLORS).length, 21);
});

test('emitScenesFile define um placeholder por cenário, só se não houver imagem (jpg, jpeg, png ou webp)', () => {
  const out = emitScenesFile();
  for (const bg of Object.keys(PLACEHOLDER_COLORS)) assert.ok(out.includes(`"${bg}"`), `falta ${bg}`);
  assert.match(out, /renpy\.loadable\("images\/%s\.%s" % \(_nome, _ext\)\)/);
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) assert.ok(out.includes(`"${ext}"`), `falta ${ext}`);
});

test('aplicar SCENES a scripts recém-convertidos valida: 33 labels alcançáveis e um scene por mudança', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vn-scenes-'));
  convert({ source: SOURCE, outDir: tmp, force: false });
  const dir = path.join(tmp, 'script');
  const seen = [];
  for (const f of fs.readdirSync(dir)) {
    const r = addScenes(fs.readFileSync(path.join(dir, f), 'utf8'), SCENES);
    seen.push(...r.applied);
    fs.writeFileSync(path.join(dir, f), r.text);
  }
  fs.writeFileSync(path.join(dir, 'script.rpy'), 'label start:\n    jump no_00\n');
  assert.deepStrictEqual(seen.sort((a, b) => a - b), Array.from({ length: 32 }, (_, i) => i));
  assert.deepStrictEqual(validateRpyDir(dir, 'start').errors, []);
  const total = fs.readdirSync(dir).map((f) => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
  assert.strictEqual((total.match(/^\s+scene /gm) || []).length, Object.values(SCENES).flat().length);
});

test('o jogo real tem, em cada nó, os cenários de SCENES na ordem certa, cada um logo antes de um parágrafo, e nenhum nvl clear', () => {
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
      assert.ok(!/nvl/.test(l), `nó ${node}: sobrou "nvl" no script`);
      const sc = l.match(/^\s+scene (\w+) with dissolve$/);
      if (sc) {
        assert.match(lines[i + 1], /^\s+narrador "/, `nó ${node}: scene sem parágrafo logo depois`);
        found[node].push(sc[1]);
      }
    });
  }
  const expected = Object.fromEntries(Object.entries(SCENES).map(([id, list]) => [id, list.map((x) => x.bg)]));
  assert.deepStrictEqual(found, expected);
});
