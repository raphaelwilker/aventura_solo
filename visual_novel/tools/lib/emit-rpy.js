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

// Modo NVL: o texto ocupa a tela. Páginas com mais caracteres que isso estouram a tela, então
// o emissor insere `nvl clear` entre parágrafos para abrir uma nova página.
const NVL_PAGE_CHARS = 900;

function paginate(paragraphs) {
  const pages = [];
  let page = [];
  let chars = 0;
  for (const p of paragraphs) {
    if (page.length > 0 && chars + p.length > NVL_PAGE_CHARS) {
      pages.push(page);
      page = [];
      chars = 0;
    }
    page.push(p);
    chars += p.length;
  }
  if (page.length > 0) pages.push(page);
  return pages;
}

function emitNode(node) {
  const rule = NODE_RULES[node.id] || {};
  const lines = [`label ${labelName(node.id)}:`];

  for (const [flag, value] of Object.entries(rule.sets || {})) {
    lines.push(`    $ ${flag} = ${pyBool(value)}`);
  }
  paginate(node.paragraphs).forEach((page) => {
    lines.push('    nvl clear');
    for (const p of page) lines.push(`    narrador "${escapeRpy(p)}"`);
  });

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

module.exports = { labelName, escapeRpy, emitNode, NVL_PAGE_CHARS };
