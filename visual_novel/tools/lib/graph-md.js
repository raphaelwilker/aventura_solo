const { labelName } = require('./emit-rpy');
const { NODE_RULES } = require('./rules');

// Gera um diagrama Mermaid das ramificações: um subgraph por capítulo, uma aresta por goto.
function graphMarkdown(nodes, chapters) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const out = ['# Mapa de ramificações', '', '> Gerado por `node tools/graph.js`. Não editar à mão.', '', '```mermaid', 'flowchart TD'];

  for (const [i, chapter] of chapters.entries()) {
    out.push(`  subgraph cap${i + 1}["${chapter.title}"]`);
    for (const id of chapter.ids) out.push(`    ${labelName(id)}`);
    out.push('  end');
  }

  for (const node of nodes) {
    const branch = (NODE_RULES[node.id] || {}).branch;
    for (const option of byId.get(node.id).options) {
      const from = labelName(node.id);
      const to = labelName(option.goto);
      if (branch) {
        const rotulo = option.goto === branch.ifTrue ? branch.flag : 'não';
        out.push(`  ${from} -->|${rotulo}| ${to}`);
      } else {
        out.push(`  ${from} --> ${to}`);
      }
    }
  }

  out.push('```', '');
  return out.join('\n');
}

module.exports = { graphMarkdown };
