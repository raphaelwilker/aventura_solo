const LABEL = /^label no_(\d\d):/;
const SAY = /^\s+narrador "/;

// Insere linhas `scene` nos scripts .rpy já existentes, sem tocar no texto.
// sceneMap: { [idDoNó]: [{ bg, from }] }, em que `from` é o índice do parágrafo (0 = o primeiro).
// Roda antes de dividir os parágrafos longos (split-lines), quando cada narrador é um parágrafo.
// Devolve { text, applied } (applied = nós encontrados neste texto).
function addScenes(text, sceneMap) {
  const lines = text.split('\n');
  const starts = [];
  lines.forEach((l, i) => {
    const m = l.match(LABEL);
    if (m) starts.push({ id: Number(m[1]), at: i });
  });

  const applied = [];
  // do último nó para o primeiro, para que as inserções não desloquem os blocos anteriores
  for (let b = starts.length - 1; b >= 0; b--) {
    const { id, at } = starts[b];
    const list = sceneMap[id];
    if (!list) continue;
    const end = b + 1 < starts.length ? starts[b + 1].at : lines.length;
    if (lines.slice(at, end).some((l) => /^\s+scene /.test(l))) {
      throw new Error(`no_${String(id).padStart(2, '0')} já tem cenário (edite à mão)`);
    }
    const say = [];
    for (let i = at; i < end; i++) if (SAY.test(lines[i])) say.push(i);

    [...list].sort((x, y) => y.from - x.from).forEach(({ bg, from }) => {
      const t = say[from];
      if (t === undefined) throw new Error(`no_${String(id).padStart(2, '0')}: parágrafo ${from} não existe`);
      lines.splice(t, 0, `    scene ${bg} with dissolve`);
    });
    applied.push(id);
  }
  return { text: lines.join('\n'), applied: applied.sort((a, b) => a - b) };
}

module.exports = { addScenes };
