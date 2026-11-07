# Notas de build (Task 7)

Executado em 2026-11-07 por Claude, de forma automatizada (Linux, sem tela física, via Xvfb), a
pedido do autor. Projeto de teste montado a partir do template de GUI do SDK (`gui/game`) com os
arquivos de `visual_novel/game/` por cima, mais `visual_novel/tests/playthrough.rpy`.

- Versão do Ren'Py: **8.5.3.26051504**
- O que **não** foi verificado: Windows, macOS, Android e iOS, abrir o jogo em um celular de
  verdade, e a aparência com arte (não há arte; só o tema padrão do Ren'Py).

## 1. Integração
- [x] Template de GUI do SDK + `script/`, `state.rpy`, `script.rpy` (o `script.rpy` do template foi substituído).
- `options.rpy` do template: nome "Aventura Solo".

## 2. Lint
- [x] `renpy.sh <projeto> lint` terminou sem erros e sem avisos: 108 blocos de diálogo, 3.739 palavras, 29 menus, 24 telas.
- Os 29 menus = 32 nós - 2 finais - nó 10 (que virou desvio automático).

## 3. Playthroughs (`renpy.sh <projeto> test playthrough`)
- [x] Final do nó 30 (nó 25 "Ajudar" → "Entrar pela porta da frente" → 28 → 30)
- [x] Final do nó 31 (nó 25 "Ajudar" → "Ir pela entrada secreta" → 29 → 31)
- [x] Flag: "Passar pelo Pântano" → "Fugir" (nó 6) liga `ferido_pescoco`; o nó 10 vai ao nó 12 (morte); "Recomeçar" zera a flag; sem o nó 6, o nó 10 vai ao nó 13.
- Resultado: 3 de 3 testcases passaram, 6 asserts, status PASSED.
- Prova de mutação: removendo `$ ferido_pescoco = False` do `no_00`, o teste de flag falha em `assert eval (not ferido_pescoco)`.
- Observação: o teste só passa o nó 7 pelo "Seguir pelo vale"; o caminho "Seguir pela montanha" (nós 9, 11, 14, 15, 19) e os outros desfechos de morte (4, 19, 20, 21) **não** foram percorridos. O validador estático cobre os links, mas não o texto.

## 4. Exportação
- [x] **Linux** (`distribute --package linux`): `AventuraSolo-1.0-linux.tar.bz2` = **22,9 MB**. Gerado, não executado.
- [x] **Web** (`web_build`, com o suporte web 8.5.3 baixado do site do Ren'Py): **44 MB** em disco, dos quais `renpy.wasm` 20,6 MB, `renpy.data` 14,4 MB e `game.zip` 4,6 MB.
  - Abriu no Chromium (Playwright, 1280x720): menu principal em ~10 s, sem erros no console; "Start" mostra o primeiro texto com acentos corretos.
  - Peso fixo do motor (~35 MB) domina; o jogo em si é pequeno (4,6 MB). Em celular com rede lenta o primeiro carregamento será o ponto fraco. **Não testado em celular.**
- [ ] Android: não tentado (exige JDK e Android SDK).

## 5. Problema encontrado: texto estoura a caixa de diálogo
No navegador, o primeiro parágrafo do jogo (~280 caracteres) ultrapassa a caixa de diálogo padrão: a última linha é cortada e se sobrepõe ao menu inferior (print em 1280x720).
- Medição: mediana de 205 caracteres por parágrafo; **56 dos 108 parágrafos passam de 200** caracteres, 21 passam de 300, o maior tem 535 (nó 29).
- Isso é esperado para um livro-jogo: os parágrafos foram escritos para ler em página, não em caixa de 3 linhas.
- Opções (decisão do autor): (a) modo NVL do Ren'Py, em que o texto ocupa a tela como numa light novel (combina com o objetivo do projeto); (b) aumentar a caixa (`gui.textbox_height`) e reduzir a fonte; (c) quebrar os parágrafos longos na reescrita.
