const { NODE_RULES } = require('./rules');

const labelName = (id) => `no_${String(id).padStart(2, '0')}`;

function escapeRpy(s) {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\[/g, '[[')
    .replace(/\{/g, '{{')
    .replace(/%/g, '%%');
}

const pyBool = (b) => (b ? 'True' : 'False');

function emitNode(node) {
  const rule = NODE_RULES[node.id] || {};
  const lines = [`label ${labelName(node.id)}:`];

  for (const [flag, value] of Object.entries(rule.sets || {})) {
    lines.push(`    $ ${flag} = ${pyBool(value)}`);
  }
  for (const p of node.paragraphs) lines.push(`    "${escapeRpy(p)}"`);

  if (rule.branch) {
    const { flag, ifTrue, ifFalse } = rule.branch;
    lines.push(
      `    if ${flag}:`,
      `        jump ${labelName(ifTrue)}`,
      '    else:',
      `        jump ${labelName(ifFalse)}`,
    );
  } else if (node.options.length === 0) {
    lines.push('    return');
  } else {
    lines.push('    menu:');
    for (const o of node.options) {
      lines.push(`        "${escapeRpy(o.label)}":`, `            jump ${labelName(o.goto)}`);
    }
  }
  return `${lines.join('\n')}\n`;
}

module.exports = { labelName, escapeRpy, emitNode };
