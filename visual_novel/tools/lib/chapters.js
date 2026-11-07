const { emitNode } = require('./emit-rpy');

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

const CHAPTERS = [
  { file: 'cap01.rpy', title: 'Capítulo 1 - O Pântano da Agonia', ids: range(0, 6) },
  { file: 'cap02.rpy', title: 'Capítulo 2 - A Estrada, o Desfiladeiro e o Rio', ids: range(7, 24) },
  { file: 'cap03.rpy', title: 'Capítulo 3 - Mornard e o Dragão', ids: range(25, 31) },
];

function emitChapter(chapter, nodesById) {
  const body = chapter.ids.map((id) => emitNode(nodesById.get(id))).join('\n');
  return `# ${chapter.title}\n\n${body}`;
}

module.exports = { CHAPTERS, emitChapter };
