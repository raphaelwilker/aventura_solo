const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadAdventure } = require('../lib/load-adventure');
const { CHAPTERS } = require('../lib/chapters');
const { graphMarkdown } = require('../lib/graph-md');

const nodes = loadAdventure(path.join(__dirname, '..', 'source', 'adventure.js'));
const md = graphMarkdown(nodes, CHAPTERS);
const lines = md.split('\n');

test('graphMarkdown é um bloco mermaid com 3 subgraphs e 49 arestas (uma por goto, incluindo as 2 do nó 10)', () => {
  assert.ok(md.includes('```mermaid\nflowchart TD'));
  assert.strictEqual(lines.filter((l) => /^\s*subgraph /.test(l)).length, 3);
  assert.strictEqual(lines.filter((l) => /^\s*no_\d\d\s+-->/.test(l)).length, 49);
});

test('as arestas do nó 10 são rotuladas e não há aresta sem rótulo saindo dele', () => {
  const edges = lines.filter((l) => /^\s*no_10\s+-->/.test(l));
  assert.strictEqual(edges.length, 2);
  assert.ok(edges.some((l) => l.includes('|ferido_pescoco| no_12')));
  assert.ok(edges.some((l) => l.includes('|não| no_13')));
});
