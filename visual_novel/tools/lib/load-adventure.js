const fs = require('node:fs');
const vm = require('node:vm');

const stripTags = (s) => s.replace(/<[^>]*>/g, '');

function toParagraphs(html) {
  return html
    .split(/<\/p>|<br\s*\/?>/i)
    .map((chunk) => stripTags(chunk).trim())
    .filter((chunk) => chunk.length > 0);
}

function loadAdventure(filePath) {
  const context = vm.createContext({});
  vm.runInContext(`${fs.readFileSync(filePath, 'utf8')}\n;this.__json = json;`, context);
  // Array.from copia para arrays deste realm (arrays criados dentro do vm têm outro protótipo Array).
  return Array.from(context.__json, (raw) => ({
    id: raw.id,
    origin: String(raw.origin),
    paragraphs: toParagraphs(raw.text),
    options: Array.from(raw.options || [], (o) => ({
      label: stripTags(o.text).trim(),
      goto: Number(o.goto),
    })),
  }));
}

module.exports = { loadAdventure };
