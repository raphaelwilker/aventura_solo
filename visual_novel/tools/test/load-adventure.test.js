const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadAdventure } = require('../lib/load-adventure');

const SOURCE = path.join(__dirname, '..', 'source', 'adventure.js');
const nodes = loadAdventure(SOURCE);

test('carrega os 32 nós com ids 0..31 contíguos', () => {
  assert.strictEqual(nodes.length, 32);
  assert.deepStrictEqual(nodes.map((n) => n.id), Array.from({ length: 32 }, (_, i) => i));
});

test('nó 0 tem 6 parágrafos e 2 opções: goto 1 e goto 2', () => {
  assert.strictEqual(nodes[0].paragraphs.length, 6);
  assert.deepStrictEqual(nodes[0].options.map((o) => o.goto), [1, 2]);
});

test('nó 0 opção 1 tem label sem HTML e mantém o "?"', () => {
  assert.strictEqual(nodes[0].options[0].label, 'Agir com cautela e dar a volta ?');
});

test('nós 30 e 31 não têm campo options no JSON e voltam com options []', () => {
  assert.deepStrictEqual(nodes[30].options, []);
  assert.deepStrictEqual(nodes[31].options, []);
});

test('nenhum parágrafo nem label contém "<" ou ">", e nenhum é vazio ou só espaços', () => {
  for (const n of nodes) {
    assert.ok(n.paragraphs.length >= 1, `nó ${n.id} sem parágrafos`);
    const texts = [...n.paragraphs, ...n.options.map((o) => o.label)];
    for (const t of texts) {
      assert.ok(!/[<>]/.test(t), `nó ${n.id} tem HTML: ${t}`);
      assert.ok(t.trim().length > 0, `nó ${n.id} tem texto vazio`);
    }
  }
});

test('todo goto aponta para um id existente', () => {
  const ids = new Set(nodes.map((n) => n.id));
  for (const n of nodes) for (const o of n.options) assert.ok(ids.has(o.goto), `nó ${n.id} -> ${o.goto}`);
});
