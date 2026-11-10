# Lista de músicas

11 faixas, em loop, com fade de 1,5 s entre elas. Para colocar uma: salve em `game/audio/` com o **nome exato** (`mus_viagem.ogg`;
também vale opus, mp3, flac ou wav) e pronto, sem mexer em código. Sem o arquivo, o jogo fica em silêncio naquele ponto.
Sugestão: faixas de 2 a 3 minutos que repetem sem corte perceptível, em `.ogg` (1 a 3 MB cada) para não inchar o APK.

| Arquivo | Clima | Onde toca (nós) | Status |
|---|---|---|---|
| `mus_titulo` | Tela inicial | tela inicial (menu principal) | **pronto**: `mus_titulo.mp3` (Dedication Day, Tabletop Audio) |
| `mus_inicio` | Começo da história (nó 0): a volta para casa e o encontro com o viajante | 0 | **pronto**: `mus_inicio.mp3` (Homecoming, Tabletop Audio) |
| `mus_viagem` | Viagem: estradas, encruzilhada, montanha, trilhas e vales | 3 (a partir de "encruzilhada"), 5 (a partir de "encruzilhada"), 6 (a partir de "encruzilhada"), 7 (a partir de "montanha_distante"), 8, 9, 10, 11, 13 (a partir de "rio_ponte"), 14, 15, 17 | pendente |
| `mus_pantano` | Pântano da Agonia: tensão, perigo à espreita | 1, 2, 3, 5, 6 | **pronto**: `mus_pantano.mp3` (Swamp Planet, Tabletop Audio) |
| `mus_perigo` | Ameaça e combate: mortos-vivos, assalto no rio | 10 (a partir de "campo_batalha"), 13, 16, 18 | pendente |
| `mus_estalagem` | Estalagem de Stew: calor e descanso | 7, 15 (a partir de "estalagem"), 17 (a partir de "estalagem"), 18 (a partir de "estalagem"), 22, 23, 24 | pendente |
| `mus_mornard` | Vila de Mornard em ruínas: desolação | 25, 26, 27 | pendente |
| `mus_dragao` | Templo e o dragão vermelho: o confronto final | 28, 29, 30 | pendente |
| `mus_derrota` | Fim de jogo: as mortes que levam a "Recomeçar" | 4, 12, 19, 20, 21 | **pronto**: `mus_derrota.mp3` (No Hope, Cleyton R. Xavier; vinheta de 13 s, toca uma vez só) |
| `mus_final_tragico` | Final trágico (nó 30): o herói morre, o dragão tomba | 30 (a partir de "final_ceu") | pendente |
| `mus_final_vitoria` | Final vitorioso (nó 31): o herói aclamado | 31 | **pronto**: `mus_final_vitoria.mp3` (Village Festival, Tabletop Audio) |

Ao receber cada arquivo, registrar em `assets.md` a fonte, a licença e se exige crédito. As músicas de Tabletop Audio estão creditadas nos finais (nós 30 e 31); ao usar outras, acrescentar o crédito na mesma tela.
