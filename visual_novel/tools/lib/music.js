// As 10 faixas de música do jogo e onde cada uma toca. Os arquivos ficam em game/audio/<id>.ogg
// (também vale opus, mp3, flac ou wav). Sem o arquivo, o jogo fica em silêncio naquele ponto.
const TRACKS = {
  mus_titulo: 'Tela inicial',
  mus_viagem: 'Viagem: estradas, encruzilhada, montanha, trilhas e vales',
  mus_pantano: 'Pântano da Agonia: tensão, perigo à espreita',
  mus_perigo: 'Ameaça e combate: mortos-vivos, assalto no rio',
  mus_estalagem: 'Estalagem de Stew: calor e descanso',
  mus_mornard: 'Vila de Mornard em ruínas: desolação',
  mus_dragao: 'Templo e o dragão vermelho: o confronto final',
  mus_derrota: 'Fim de jogo: as mortes que levam a "Recomeçar"',
  mus_final_tragico: 'Final trágico (nó 30): o herói morre, o dragão tomba',
  mus_final_vitoria: 'Final vitorioso (nó 31): o herói aclamado',
};

// Por nó: a faixa vale a partir do cenário `scene` do nó (0 = desde o início; 1 = a partir da 2ª mudança de cenário).
const m = (track, scene = 0) => ({ track, scene });
const MUSIC = {
  0: [m('mus_viagem')],
  1: [m('mus_pantano')],
  2: [m('mus_pantano')],
  3: [m('mus_pantano'), m('mus_viagem', 1)],
  4: [m('mus_derrota')],
  5: [m('mus_pantano'), m('mus_viagem', 1)],
  6: [m('mus_pantano'), m('mus_viagem', 1)],
  7: [m('mus_estalagem'), m('mus_viagem', 1)],
  8: [m('mus_viagem')],
  9: [m('mus_viagem')],
  10: [m('mus_viagem'), m('mus_perigo', 1)],
  11: [m('mus_viagem')],
  12: [m('mus_derrota')],
  13: [m('mus_perigo'), m('mus_viagem', 1)],
  14: [m('mus_viagem')],
  15: [m('mus_viagem'), m('mus_estalagem', 1)],
  16: [m('mus_perigo')],
  17: [m('mus_viagem'), m('mus_estalagem', 1)],
  18: [m('mus_perigo'), m('mus_estalagem', 1)],
  19: [m('mus_derrota')],
  20: [m('mus_derrota')],
  21: [m('mus_derrota')],
  22: [m('mus_estalagem')],
  23: [m('mus_estalagem')],
  24: [m('mus_estalagem')],
  25: [m('mus_mornard')],
  26: [m('mus_mornard')],
  27: [m('mus_mornard')],
  28: [m('mus_dragao')],
  29: [m('mus_dragao')],
  30: [m('mus_dragao'), m('mus_final_tragico', 1)],
  31: [m('mus_final_vitoria')],
};

module.exports = { TRACKS, MUSIC };
