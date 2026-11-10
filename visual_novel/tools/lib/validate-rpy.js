const fs = require('node:fs');
const path = require('node:path');

function listRpy(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listRpy(full);
    return entry.name.endsWith('.rpy') ? [full] : [];
  });
}

// Valida labels e jumps de todos os .rpy de `dir` (recursivo), a partir do label `entry`.
function validateRpyDir(dir, entry) {
  const errors = [];
  const defs = new Map(); // label -> arquivo
  const edges = new Map(); // label -> [{ target, file }]

  for (const file of listRpy(dir)) {
    const name = path.basename(file);
    let current = null;
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      const label = line.match(/^label\s+(\w+)\s*:/);
      if (label) {
        current = label[1];
        if (defs.has(current)) errors.push(`label duplicado "${current}" em ${defs.get(current)} e ${name}`);
        else defs.set(current, name);
        edges.set(current, edges.get(current) || []);
        continue;
      }
      const jump = line.match(/^\s+jump\s+(\w+)/);
      if (jump && current) edges.get(current).push({ target: jump[1], file: name });
    }
  }

  for (const [from, list] of edges) {
    for (const { target, file } of list) {
      if (!defs.has(target)) errors.push(`jump para label inexistente "${target}" em ${file} (label ${from})`);
    }
  }

  if (!defs.has(entry)) {
    errors.push(`label inicial "${entry}" não existe`);
  } else {
    const seen = new Set([entry]);
    const stack = [entry];
    while (stack.length > 0) {
      for (const { target } of edges.get(stack.pop()) || []) {
        if (defs.has(target) && !seen.has(target)) {
          seen.add(target);
          stack.push(target);
        }
      }
    }
    for (const [label, file] of defs) {
      if (!seen.has(label)) errors.push(`label inalcançável a partir de "${entry}": "${label}" em ${file}`);
    }
  }

  return { errors, labels: defs.size };
}

module.exports = { validateRpyDir };
