# Guia de arte - estilo anime

Decisão: **ilustração em estilo anime**, por ser uma light novel. Vale para tudo: cenários agora,
personagens e CGs depois. Lista de cenas e nós em `lista-de-cenas.md`; licenças em `assets.md`.

## Regras de estilo (para o conjunto parecer de uma mesma obra)
- Cenários **sem personagens e sem texto** (as pessoas entram como sprites separados).
- Fantasia medieval, paleta de cores com saturação média, luz suave, pintura com sombreado simples.
- **Parte de baixo da imagem mais calma ou mais escura**: o texto aparece numa caixa larga embaixo
  (cerca de um quarto da altura), com o cenário visível por cima.
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

Cada cenário segue **o que o texto descreve**; a coluna "Texto" cita a frase de origem. Onde o
texto não informa horário ou clima, está marcado *(livre)*: escolha o que combinar com a cena
anterior e a seguinte. Sem personagens: viajante, ladrões, urso etc. entram como sprites.

| ID | Texto (nó) | Acrescentar ao prompt base |
|---|---|---|
| bg_estrada ★ | "um viajante está caído à beira da estrada" (0) | empty dirt road in the countryside leading toward a distant village, the roadside bare, time of day *(livre)* |
| bg_pantano_margem ★ | "continua no caminho, à margem do pântano, seguindo até perto do anoitecer ... improvisa um acampamento, acendendo uma fogueira" (1); "a escuridão é intensa" | edge of a dark swamp seen from a path along its margin, dusk turning to night, a small campfire burning in a makeshift camp, deep darkness over the water |
| bg_pantano_dentro ★ | "Caminha através de lama e águas estagnadas até o poente, ... acender uma tocha" (2) | inside a swamp walking through mud and stagnant water toward the sunset, a lit torch glowing, shadows moving ahead, sinister mood |
| bg_encruzilhada ★ | "o caminho se bifurca" (3, 5, 6); "o caminho da direita segue sobre uma montanha, e o da esquerda passa por um vale que contorna a montanha" (7) | road splitting into two paths, the right path climbing a mountain and the left path running through a valley that wraps around the mountain, mid-afternoon (3, 5, 6) or morning (7) |
| bg_montanha_distante ★ | "segue sobre uma montanha ... um vale que contorna a montanha" (7) | a large mountain in the distance with a valley curving around its base, wide view from the fork in the road, morning |
| bg_desfiladeiro | "um gigantesco desfiladeiro. A fenda é enorme, e não há como chegar ao outro lado" (8) | gigantic canyon, a huge crack in the earth far too wide to cross, the far side distant, daytime *(livre)* |
| bg_trilha_montanha | "uma trilha que passa entre as rochas, sob sombras refrescantes"; "vindo de uma caverna próxima" (9) | mountain trail winding between rocks in cool shade, a dark cave opening nearby, daytime |
| bg_desmoronamento | "parte do caminho foi destruída por um desmoronamento" (9); "uma queda imensa ... rolar centenas de metros montanha abaixo" (14) | mountain path cut by a landslide, rubble blocking the trail, a steep climbable slope, and a huge drop below to the distant trail |
| bg_vale | "O sol castiga você enquanto cruza o vale" (10) | valley crossing under a punishing sun, bright heat haze, exposed ground |
| bg_campo_batalha | "um antigo campo de batalha: uma clareira cheia de armaduras enferrujadas, armas quebradas e ossos humanos" (10) | clearing that is an ancient battlefield, full of rusted armor, broken weapons and human bones, eerie, late afternoon *(livre)* |
| bg_rio_ponte | "um rio com cerca de 50 metros de largura"; "uma ponte nas proximidades, mas ela parece velha e fraca"; "uma pequena jangada" (13) | wide river about 50 meters across, an old weak-looking bridge nearby, a small raft approaching, daytime *(livre)* |
| bg_rio_jangada | "no meio de um rio, em uma frágil jangada" (18) | the middle of a wide river seen from a fragile small raft, water on all sides, daytime *(livre)* |
| bg_estalagem | "As luzes de uma taverna podem ser vistas ao longe" (17); "A estalagem é quente e acolhedora ... uma mesa próxima à lareira ... um prato de sopa fumegante" (15, 17, 18) | warm and welcoming inn interior, a table near the fireplace, a bowl of steaming soup, evening |
| bg_quarto | "um balde de água quente em uma bacia" para o banho (22, 24) | inn bedroom, a basin with hot water being poured for a bath, a bed, night |
| bg_estabulo | "um lugar para dormir no estábulo. A noite é longa e fria" (23) | stable used as a place to sleep, hay, a long cold night |
| bg_mornard | "montes de destroços enegrecidos onde deveria haver casas, e pessoas mortas e feridas por toda parte" (25); "uma colina próxima" | village reduced to heaps of blackened rubble where houses should be, a hill nearby, grim mood, no people visible |
| bg_colina_templo | "a construção arruinada - antiga igreja de algum culto esquecido"; "pórtico frontal" (28) | ruined building on a hill, an ancient church of a forgotten cult, front portico, ruins |
| bg_templo_interior | "na imensidão do templo, uma forma escamosa enrosca-se à volta de um punhado de moedas e jóias" (28, 29) | immense temple interior, a pile of coins and jewels at the center, dim light, ominous, no dragon in view (the dragon is a separate sprite) |
| bg_templo_corredor | "uma entrada lateral, escavada pelo tempo ... corredores escuros e úmidos ... o salão principal" (29) | side entrance carved by time, dark damp corridors leading to the main hall |
| bg_final_ceu | "no céu Hedryl estará esperando por seu mais valoroso guerreiro" (30) | the sky, heavenly light, solemn and peaceful |
| bg_final_vila | "aclamado como herói ... na vila de Mornard ... os bardos cantem" (31) | village celebrating a hero, bards, warm daylight, rebuilt and lively *(livre: o texto não descreve a vila)* |

## Para personagens e criaturas (fase 2)
Mesmo prefixo de estilo, trocando `background illustration` por `character sprite, full body,
standing, plain background` (e remover o fundo depois). Descrições dos personagens em
`lista-de-cenas.md`. Gerar cada personagem com a mesma frase de estilo para manter a coerência.

## Checklist por arquivo
- [ ] Sem texto, marca d'água ou personagens no cenário
- [ ] 1280x720, JPG, nome igual ao ID
- [ ] Licença conferida e linha preenchida em `assets.md`
- [ ] O texto na caixa de baixo continua legível sobre a imagem (testar no jogo)
