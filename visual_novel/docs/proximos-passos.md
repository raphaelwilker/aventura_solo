# Próximos passos (estado em 2026-11-08)

## Onde estamos
- Jogo completo de ponta a ponta: 32 nós, tela inicial, 21 cenários com arte, builds de Windows e Android.
- **Estilos misturados:** 15 imagens do Superdesign (pintadas: as 14 primeiras e `bg_titulo`) e 7 enviadas pelo autor
  (com traço: `bg_desfiladeiro`, `bg_vale`, `bg_quarto`, `bg_estabulo`, `bg_templo_corredor`, `bg_final_ceu`, `bg_final_vila`).
- Saldo do Superdesign: **4 créditos** (6 por imagem; plano atual libera só o modelo `bytedance/seedream-5.0-lite`).
  Conferir amanhã se o saldo renovou.

## Decisão de amanhã
**Se o saldo do Superdesign aumentou** (conferir na conta ou pedindo uma cotação, que é gratuita e mostra o saldo):
1. Regenerar no estilo pintado os 7 cenários que vieram com traço (42 créditos), com o prompt base + o prompt da cena do
   `guia-de-arte.md`. Se o saldo não bastar, priorizar os mais vistos: `bg_quarto`, `bg_estabulo`, `bg_desfiladeiro`, `bg_vale`.
2. Escolher entre os dois pântanos (o do jogo e `docs/alternativas/bg_pantano_dentro_alternativa.jpg`).

**Se o saldo não aumentou:** gerar **todas** as imagens pelo Gemini, para o conjunto ficar de um único estilo.
- Usar o prompt base + o prompt de cada cenário do `guia-de-arte.md` (já em inglês, prontos para colar).
- Para manter a coerência: na primeira imagem aprovada, guardar o resultado e, nas seguintes, anexá-la como referência de
  estilo ("use the attached image as the style reference"). Pedir 16:9 e repetir o prompt base em todas.
- Nome do arquivo = ID da lista (`bg_estrada.jpg`), 1280x720 (se vier 1376x768, o corte central de 11 px já é feito aqui).
- Conferir os termos de uso comercial do Gemini antes de publicar e registrar no `assets.md`.

## Pendências (independem da decisão)
- **Título e subtítulo do jogo** (hoje provisórios: "Aventura Solo" / "Uma aventura solo"): editar as 2 primeiras linhas
  de `game/tela_inicial.rpy`.
- Informar a **ferramenta** usada nas 7 imagens do autor (`assets.md`).
- **Licença / uso comercial** de todas as imagens ("a confirmar" em `assets.md`); a história é de terceiros, e publicar
  exige permissão dos autores/editora.
- Opcional: traduzir o resto da interface para português (hoje só a tela inicial).

## Para retomar numa sessão nova
- Ambiente `aventura-solo` já tem liberados: `www.renpy.org`, `renpy.org`, `dl.google.com`, `downloads.gradle.org`,
  `superdesign.dev`, `api.superdesign.dev` e o armazenamento de imagens do Superdesign.
- O login do Superdesign e o SDK do Ren'Py/Android ficam na máquina da sessão; numa sessão nova é preciso refazer o login
  (`superdesign login --no-browser`) e baixar o SDK de novo (ver `docs/notas-de-build.md`).
- Projeto Superdesign dos cenários: "Aventura Solo - Cenarios".
