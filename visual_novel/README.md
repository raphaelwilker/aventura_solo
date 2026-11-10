# Aventura Solo - Visual Novel (Ren'Py)

Adaptação fiel da aventura de `adventure.js` (Dragão Brasil nº 12) para Ren'Py. Spec e plano em
`../docs/superpowers/`. A história é de terceiros: uso pessoal e testes são livres; **publicar**
exige permissão dos autores/editora.

## Ferramentas (Node 22, sem dependências)

```bash
cd visual_novel
npm test                                              # testes das ferramentas
node tools/validate.js game/script no_00              # valida labels e jumps dos .rpy
node tools/validate.js game start                     # idem, incluindo script.rpy
node tools/graph.js tools/source/adventure.js docs/mapa-ramificacoes.md
```

## Os `.rpy` são a fonte da verdade

`game/script/cap01.rpy` a `cap03.rpy` foram gerados por `tools/convert.js` e **agora são editados à
mão** (revisão de texto, personagens, arte). Para gerar de novo:

```bash
node tools/convert.js tools/source/adventure.js game --force
```

`--force` **apaga qualquer edição manual** nesses três arquivos. Sem `--force`, o conversor recusa.

**Atenção:** os scripts já têm texto revisado e cenários inseridos à mão/ferramenta. O texto já foi revisado à mão (ver `docs/correcoes-de-texto.md`). Gerar de novo com
`--force` traz de volta o texto original, com os erros de digitação.

## Cuidado ao empacotar (aprendido na prática)

**Nunca use o template `gui/game` do SDK como projeto para gerar builds.** Ele traz o
`guisupport.rpy`, que importa o módulo `gui7` (só existe dentro do SDK). Funciona rodando de dentro do
SDK, mas o jogo empacotado dá `ModuleNotFoundError: No module named 'gui7'` ao abrir. Crie o projeto
pelo launcher (**Criar um novo projeto**), que não inclui esse arquivo, e copie os nossos arquivos
para dentro. Sempre teste o jogo **empacotado** (extraia o build e abra), e não só o jogo rodando
pelo launcher.

## Integrar com o Ren'Py (8.x)

1. No launcher do Ren'Py, crie um projeto novo (ex.: `aventura_solo_vn`). Isso gera `gui/`,
   `screens.rpy`, `options.rpy` e um `script.rpy` de exemplo.
2. Copie para a pasta `game/` do projeto criado: `script/` (a pasta inteira), `state.rpy` e
   `script.rpy` (substitui o de exemplo).
3. No launcher, rode **Check Script (Lint)**; depois **Launch Project**.
4. Siga a Task 7 do plano para o playthrough e a exportação, e anote os resultados em
   `docs/notas-de-build.md`.

## Testes no Ren'Py (lint e playthrough)

`tests/playthrough.rpy` roda os dois finais e a flag `ferido_pescoco` no próprio jogo. Ele **não** faz
parte do jogo: copie para `game/` de um projeto de teste, rode e remova antes de gerar builds.

```bash
./renpy.sh <projeto> lint
./renpy.sh <projeto> test playthrough
```

No Linux sem tela, prefixe com `xvfb-run -a`. Resultados e medidas em `docs/notas-de-build.md`.

## Cenários (imagens)

Cada nó já mostra o seu cenário (`scene bg_...`); ver a tabela nó a nó em `tools/lib/scenes.js` e os
prompts em `docs/guia-de-arte.md`. Enquanto não há imagem, aparece uma **cor lisa com o nome do
cenário** (`game/cenarios.rpy`).

**Para colocar uma imagem:** salve em `game/images/` com o nome exato do cenário (`bg_estrada.jpg`,
1280x720; também vale png ou webp) e pronto: o provisório some sozinho. Sem mexer em código.

Os `scene` foram inseridos nos `.rpy` uma única vez (`node tools/add-scenes.js game/script`, que
recusa rodar de novo). Para trocar o cenário de um nó, edite o `.rpy` à mão. O texto aparece no modo ADV, numa caixa larga na parte de baixo da tela (`characters.rpy`), translúcida
para a imagem aparecer atrás. Parágrafos longos são divididos em trechos de até 230 caracteres
(`node tools/split-lines.js game/script`, idempotente).

## Música

Cada nó chama `tocar_musica("mus_...")` (código em `game/musica.rpy`); as 10 faixas e onde cada uma toca estão em
`docs/lista-de-musicas.md`. **Para colocar uma música:** salve em `game/audio/` com o nome exato (`mus_viagem.ogg`; também vale
opus, mp3, flac ou wav). Sem o arquivo, o jogo fica em silêncio naquele ponto, sem erro. A mesma faixa em nós seguidos não
reinicia, e as trocas têm fade de 1,5 s. O volume de música é o da tela de Preferências. As chamadas foram inseridas uma única
vez (`node tools/add-music.js game/script`, que recusa rodar de novo); para mudar a música de um nó, edite o `.rpy` à mão.

## Mecânica

Uma flag: `ferido_pescoco`. O nó 6 a liga (o scrag agarra o herói), o nó 0 a zera (inclusive ao
recomeçar após uma morte) e o nó 10 a lê: ligada leva ao nó 12 (morte), desligada ao nó 13.

## Problemas conhecidos do JSON (mantidos na v1, corrigir na reescrita)

- Nós 20 e 21 são idênticos (afogamento no rio).
- A opção "Falar que não tem dinheiro" do nó 17 leva ao nó 21 (afogamento); pelo contexto deveria
  levar ao nó 23.
- Erros de digitação espalhados nos textos.
