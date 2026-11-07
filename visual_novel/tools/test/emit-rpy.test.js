const test = require('node:test');
const assert = require('node:assert');
const { labelName, escapeRpy, emitNode, NVL_PAGE_CHARS } = require('../lib/emit-rpy');

const node = (id, paragraphs, options) => ({ id, origin: '', paragraphs, options });

test('labelName usa 2 dígitos: 5 -> no_05 e 31 -> no_31', () => {
  assert.strictEqual(labelName(5), 'no_05');
  assert.strictEqual(labelName(31), 'no_31');
});

test('escapeRpy escapa \\ " [ { %', () => {
  assert.strictEqual(escapeRpy('a\\b"c[d{e%f'), 'a\\\\b\\"c[[d{{e%%f');
});

test('nó comum: label, nvl clear, um parágrafo por linha com o narrador e menu com um jump por opção', () => {
  const out = emitNode(node(5, ['A', 'B'], [
    { label: 'X', goto: 7 },
    { label: 'Y', goto: 8 },
  ]));
  assert.strictEqual(out, [
    'label no_05:',
    '    nvl clear',
    '    narrador "A"',
    '    narrador "B"',
    '    menu:',
    '        "X":',
    '            jump no_07',
    '        "Y":',
    '            jump no_08',
    '',
  ].join('\n'));
});

test('texto do nó e rótulos de opção passam por escapeRpy', () => {
  const out = emitNode(node(1, ['Disse "oi" 100%'], [{ label: 'Abrir [porta]', goto: 2 }]));
  assert.ok(out.includes('    narrador "Disse \\"oi\\" 100%%"'));
  assert.ok(out.includes('        "Abrir [[porta]":'));
});

test('nó 0 zera ferido_pescoco antes dos parágrafos', () => {
  const out = emitNode(node(0, ['A'], [{ label: 'X', goto: 1 }]));
  const flag = out.indexOf('    $ ferido_pescoco = False');
  assert.ok(flag > -1, 'sem $ ferido_pescoco = False');
  assert.ok(flag < out.indexOf('    narrador "A"'), 'a flag deve vir antes do texto');
});

test('nó 6 liga ferido_pescoco e ainda emite o menu normal', () => {
  const out = emitNode(node(6, ['A'], [{ label: 'X', goto: 7 }]));
  assert.ok(out.includes('    $ ferido_pescoco = True'));
  assert.ok(out.includes('    menu:'));
  assert.ok(out.includes('            jump no_07'));
});

test('nó 10 vira desvio automático sem menu: if ferido_pescoco -> no_12, else -> no_13', () => {
  const out = emitNode(node(10, ['A'], [
    { label: 'você foi ferido no pescoço anteriormente ?', goto: 12 },
    { label: 'você não foi ferido no pescoço anteriormente ?', goto: 13 },
  ]));
  assert.ok(!out.includes('menu:'));
  assert.ok(out.includes('    if ferido_pescoco:\n        jump no_12\n    else:\n        jump no_13\n'));
});

test('nó sem opções termina em return e não tem menu', () => {
  const out = emitNode(node(30, ['Fim.'], []));
  assert.ok(!out.includes('menu:'));
  assert.ok(out.endsWith('    return\n'));
});

test('nó de morte oferece Recomeçar e volta ao no_00', () => {
  const out = emitNode(node(4, ['Morreu.'], [{ label: 'Recomeçar.', goto: 0 }]));
  assert.ok(out.includes('        "Recomeçar.":\n            jump no_00\n'));
});

test('NVL_PAGE_CHARS é 900', () => {
  assert.strictEqual(NVL_PAGE_CHARS, 900);
});

test('parágrafos que cabem em uma página não geram nvl clear extra', () => {
  const out = emitNode(node(2, ['x'.repeat(400), 'y'.repeat(400)], []));
  assert.strictEqual(out.match(/nvl clear/g).length, 1);
});

test('quando o próximo parágrafo estoura a página, emite nvl clear antes dele', () => {
  const out = emitNode(node(2, ['x'.repeat(400), 'y'.repeat(400), 'z'.repeat(400)], []));
  const lines = out.split('\n');
  const clears = lines.map((l, i) => (l === '    nvl clear' ? i : -1)).filter((i) => i >= 0);
  assert.strictEqual(clears.length, 2);
  assert.ok(lines[clears[1] + 1].includes('z'.repeat(10)), 'o parágrafo z abre a segunda página');
  assert.ok(lines[clears[1] - 1].includes('y'.repeat(10)), 'x e y ficam na primeira página');
});

test('um parágrafo maior que a página fica sozinho, sem nvl clear vazio', () => {
  const out = emitNode(node(2, ['x'.repeat(NVL_PAGE_CHARS + 100)], []));
  assert.strictEqual(out.match(/nvl clear/g).length, 1);
});
