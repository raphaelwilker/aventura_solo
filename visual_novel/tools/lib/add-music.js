const LABEL = /^label no_(\d\d):/;
const SCENE = /^\s+scene /;

// Insere `$ tocar_musica("<faixa>")` logo depois do cenário indicado, nos .rpy já existentes, sem tocar no texto.
// musicMap: { [idDoNó]: [{ track, scene }] }, em que `scene` é o índice do cenário no nó (0 = o primeiro).
// Devolve { text, applied } (applied = nós encontrados neste texto).
function addMusic(text, musicMap) {
  const lines = text.split('\n');
  const starts = [];
  lines.forEach((l, i) => {
    const m = l.match(LABEL);
    if (m) starts.push({ id: Number(m[1]), at: i });
  });

  const applied = [];
  for (let b = starts.length - 1; b >= 0; b--) {
    const { id, at } = starts[b];
    const list = musicMap[id];
    if (!list) continue;
    const name = `no_${String(id).padStart(2, '0')}`;
    const end = b + 1 < starts.length ? starts[b + 1].at : lines.length;
    if (lines.slice(at, end).some((l) => /tocar_musica\(/.test(l))) {
      throw new Error(`${name} já tem música (edite à mão)`);
    }
    const scenes = [];
    for (let i = at; i < end; i++) if (SCENE.test(lines[i])) scenes.push(i);

    [...list].sort((x, y) => y.scene - x.scene).forEach(({ track, scene }) => {
      const t = scenes[scene];
      if (t === undefined) throw new Error(`${name}: cenário ${scene} não existe`);
      lines.splice(t + 1, 0, `    $ tocar_musica("${track}")`);
    });
    applied.push(id);
  }
  return { text: lines.join('\n'), applied: applied.sort((a, b) => a - b) };
}

module.exports = { addMusic };
