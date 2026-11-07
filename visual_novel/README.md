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

## Mecânica

Uma flag: `ferido_pescoco`. O nó 6 a liga (o scrag agarra o herói), o nó 0 a zera (inclusive ao
recomeçar após uma morte) e o nó 10 a lê: ligada leva ao nó 12 (morte), desligada ao nó 13.

## Problemas conhecidos do JSON (mantidos na v1, corrigir na reescrita)

- Nós 20 e 21 são idênticos (afogamento no rio).
- A opção "Falar que não tem dinheiro" do nó 17 leva ao nó 21 (afogamento); pelo contexto deveria
  levar ao nó 23.
- Erros de digitação espalhados nos textos.
