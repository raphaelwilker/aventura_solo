# Guia de arte - estilo anime

Decisão: **ilustração em estilo anime**, por ser uma light novel. Vale para tudo: cenários agora,
personagens e CGs depois. Lista de cenas e nós em `lista-de-cenas.md`; licenças em `assets.md`.

## Regras de estilo (para o conjunto parecer de uma mesma obra)
- Cenários **sem personagens e sem texto** (as pessoas entram como sprites separados).
- Fantasia medieval, paleta de cores com saturação média, luz suave, pintura com sombreado simples.
- **Centro da imagem mais calmo ou mais escuro**: o texto NVL ocupa uma coluna ao centro.
- Formato 16:9, entregue em **1280x720** (gere em 1920x1080 ou maior e reduza). Cenários em JPG;
  personagens em PNG com fundo transparente.
- Nome do arquivo: o ID da lista (`bg_pantano_dentro.jpg`), em `game/images/`.

## Como obter (honesto sobre as opções)
1. **Gerar com IA (recomendado para este caso).** Cenas muito específicas (pântano da Agonia, salão do
   templo com dragão, vila queimada) são difíceis de achar prontas em estilo anime e gratuitas. Com
   um prompt base fixo se consegue um conjunto coerente. Antes de usar: conferir os termos da
   ferramenta (uso comercial, direitos sobre as imagens) e registrar em `assets.md` a ferramenta, a
   data e o prompt. Eu não gero imagens daqui: você gera e me passa os arquivos, ou eu preparo os
   prompts e a integração.
2. **Pacotes prontos.** Buscar no itch.io (Game Assets, filtro "Free") e no OpenGameArt (licença
   CC0 ou CC-BY) por: `visual novel background`, `anime background`, `fantasy background`, `forest
   road`, `swamp`, `tavern interior`, `mountain`, `castle ruins`, `cave`. Pacotes gratuitos cobrem
   bem estrada, floresta, taverna, montanha e ruínas; pântano, vila destruída e templo de dragão
   costumam faltar. Não verifiquei pacotes específicos.
3. **Encomendar a um artista** (também para personagens), usando este guia como briefing.

## Prompt base (colar antes de cada prompt de cena)
```
anime style background illustration, painterly with soft cel shading, detailed scenery,
medieval fantasy world, muted-saturated color palette, soft volumetric lighting,
visual novel background, wide 16:9, no characters, no people, no text, no watermark
```
Prompt negativo (se a ferramenta aceitar): `people, characters, text, logo, watermark, frame, ui`.

## Prompt por cenário (acrescentar ao prompt base)
| ID | Acrescentar |
|---|---|
| bg_estrada ★ | dirt road winding through green countryside, late afternoon golden light, distant hills |
| bg_encruzilhada ★ | fork in a dirt road, two paths splitting left and right, open countryside, afternoon, mountain and valley in the distance |
| bg_pantano_margem ★ | edge of a dark swamp at night, a small campfire glowing in the foreground, mist over still water, twisted dead trees |
| bg_pantano_dentro ★ | inside a gloomy swamp at sunset, stagnant green water, mud, twisted trees, fog, eerie orange light through the branches |
| bg_montanha_distante ★ | large rocky mountain seen from far away across a sunlit valley, hazy atmosphere, a road leading toward it |
| bg_trilha_montanha | narrow rocky mountain trail between boulders, cool shade, a dark cave entrance on the side, daytime |
| bg_desmoronamento | mountain path broken by a landslide, steep cliff, a sheer drop below, dramatic daylight |
| bg_desfiladeiro | enormous canyon crack in the earth too wide to cross, rocky walls, deep chasm, daylight |
| bg_vale | dry valley under a harsh bright sun, hot haze, rocky hillsides, dusty ground |
| bg_campo_batalha | ancient battlefield clearing, rusted armor and broken weapons and bones scattered on the ground, dusk, ominous mood |
| bg_rio_ponte | wide river with an old rotting wooden bridge, a small raft near the bank, daytime, green banks |
| bg_rio_jangada | middle of a wide river seen from a small fragile raft, calm brown water, distant banks, daytime |
| bg_estalagem | cozy medieval tavern interior, stone fireplace with a warm fire, wooden table, candlelight, night |
| bg_quarto | small tavern bedroom, simple bed, wooden tub with steaming hot water, warm candlelight, night |
| bg_estabulo | old wooden stable at night, hay, cold moonlight through the planks |
| bg_mornard | burnt village in ruins, blackened rubble where houses stood, smoke, a hill with ruins in the background, grim mood |
| bg_colina_templo | ruined ancient temple on a hill, broken columns, overgrown stone portico, overcast sky |
| bg_templo_interior | vast dark ruined temple hall, a huge treasure pile of gold coins and jewels, dim light from broken ceiling, ominous |
| bg_templo_corredor | narrow dark damp stone corridor, torch-less, moss on the walls, faint light at the end |
| bg_final_ceu | glowing sky with golden clouds and rays of light, peaceful and solemn |
| bg_final_vila | cheerful medieval village square in the daytime, flags and festival decorations, warm light |

## Para personagens e criaturas (fase 2)
Mesmo prefixo de estilo, trocando `background illustration` por `character sprite, full body,
standing, plain background` (e remover o fundo depois). Descrições dos personagens em
`lista-de-cenas.md`. Gerar cada personagem com a mesma frase de estilo para manter a coerência.

## Checklist por arquivo
- [ ] Sem texto, marca d'água ou personagens no cenário
- [ ] 1280x720, JPG, nome igual ao ID
- [ ] Licença conferida e linha preenchida em `assets.md`
- [ ] Texto NVL continua legível por cima (testar no jogo)
