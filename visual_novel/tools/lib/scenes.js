// Qual cenário aparece em cada nó. Cada item: { bg, from } = o cenário vale a partir do parágrafo
// `from` (0 = primeiro parágrafo do nó). Detalhes e citações do texto em docs/guia-de-arte.md.
const SCENES = {
  0: [{ bg: 'bg_estrada', from: 0 }],
  1: [{ bg: 'bg_pantano_margem', from: 0 }],
  2: [{ bg: 'bg_pantano_dentro', from: 0 }],
  3: [{ bg: 'bg_pantano_margem', from: 0 }, { bg: 'bg_encruzilhada', from: 5 }],
  4: [{ bg: 'bg_pantano_margem', from: 0 }],
  5: [{ bg: 'bg_pantano_dentro', from: 0 }, { bg: 'bg_encruzilhada', from: 3 }],
  6: [{ bg: 'bg_pantano_dentro', from: 0 }, { bg: 'bg_encruzilhada', from: 4 }],
  7: [{ bg: 'bg_estalagem', from: 0 }, { bg: 'bg_montanha_distante', from: 1 }],
  8: [{ bg: 'bg_desfiladeiro', from: 0 }],
  9: [{ bg: 'bg_trilha_montanha', from: 0 }, { bg: 'bg_desmoronamento', from: 3 }],
  10: [{ bg: 'bg_vale', from: 0 }, { bg: 'bg_campo_batalha', from: 1 }],
  11: [{ bg: 'bg_desmoronamento', from: 0 }],
  12: [{ bg: 'bg_campo_batalha', from: 0 }],
  13: [{ bg: 'bg_campo_batalha', from: 0 }, { bg: 'bg_rio_ponte', from: 2 }],
  14: [{ bg: 'bg_desmoronamento', from: 0 }],
  15: [{ bg: 'bg_desmoronamento', from: 0 }, { bg: 'bg_estalagem', from: 3 }],
  16: [{ bg: 'bg_rio_jangada', from: 0 }],
  17: [{ bg: 'bg_rio_ponte', from: 0 }, { bg: 'bg_estalagem', from: 2 }],
  18: [{ bg: 'bg_rio_jangada', from: 0 }, { bg: 'bg_estalagem', from: 3 }],
  19: [{ bg: 'bg_desmoronamento', from: 0 }],
  20: [{ bg: 'bg_rio_jangada', from: 0 }],
  21: [{ bg: 'bg_rio_jangada', from: 0 }],
  22: [{ bg: 'bg_estalagem', from: 0 }, { bg: 'bg_quarto', from: 3 }],
  23: [{ bg: 'bg_estalagem', from: 0 }, { bg: 'bg_estabulo', from: 1 }],
  24: [{ bg: 'bg_estalagem', from: 0 }],
  25: [{ bg: 'bg_mornard', from: 0 }],
  26: [{ bg: 'bg_mornard', from: 0 }],
  27: [{ bg: 'bg_mornard', from: 0 }],
  28: [{ bg: 'bg_colina_templo', from: 0 }, { bg: 'bg_templo_interior', from: 1 }],
  29: [{ bg: 'bg_templo_corredor', from: 0 }, { bg: 'bg_templo_interior', from: 1 }],
  30: [{ bg: 'bg_templo_interior', from: 0 }, { bg: 'bg_final_ceu', from: 2 }],
  31: [{ bg: 'bg_final_vila', from: 0 }],
};

// Cor provisória de cada cenário, usada enquanto não existe a imagem em game/images/.
const PLACEHOLDER_COLORS = {
  bg_estrada: '#8c7b52',
  bg_encruzilhada: '#7d8a5a',
  bg_pantano_margem: '#2f3b36',
  bg_pantano_dentro: '#3d4a2f',
  bg_montanha_distante: '#5f7a93',
  bg_trilha_montanha: '#6b6258',
  bg_desmoronamento: '#7a5f4d',
  bg_desfiladeiro: '#8a6a52',
  bg_vale: '#b08a4a',
  bg_campo_batalha: '#4b4147',
  bg_rio_ponte: '#4f7a8a',
  bg_rio_jangada: '#3f6f86',
  bg_estalagem: '#6b4a2f',
  bg_quarto: '#5a4056',
  bg_estabulo: '#3d3a2e',
  bg_mornard: '#3a2f2f',
  bg_colina_templo: '#5a5f66',
  bg_templo_interior: '#2e2540',
  bg_templo_corredor: '#1f2a2e',
  bg_final_ceu: '#c9b36a',
  bg_final_vila: '#8aa05a',
};

// Gera game/cenarios.rpy: um fundo provisório por cenário, que some sozinho quando a imagem existe.
function emitScenesFile() {
  const entries = Object.entries(PLACEHOLDER_COLORS)
    .map(([bg, cor]) => `        "${bg}": "${cor}",`)
    .join('\n');
  return `# Cenários provisórios: uma cor lisa com o nome do cenário, até existir a imagem.
# Para trocar por arte: salve a imagem em game/images/ com o mesmo nome (ex.: bg_estrada.jpg).
# Se o arquivo existir (jpg, jpeg, png ou webp), este provisório é ignorado. Gerado por tools/scenes-file.js.
init python:
    _PLACEHOLDERS = {
${entries}
    }
    for _nome, _cor in _PLACEHOLDERS.items():
        if not any(renpy.loadable("images/%s.%s" % (_nome, _ext)) for _ext in ("jpg", "jpeg", "png", "webp")):
            renpy.image(_nome, Fixed(Solid(_cor), Text(_nome, size=22, color="#ffffff66", xalign=0.5, yalign=0.03), xfill=True, yfill=True))
`;
}

module.exports = { SCENES, PLACEHOLDER_COLORS, emitScenesFile };
