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

## 5. Texto longo: resolvido com o modo NVL
No navegador, o primeiro parágrafo (~280 caracteres) ultrapassava a caixa de diálogo padrão, e 56 dos
108 parágrafos passam de 200 caracteres (mediana 205, maior 535). Adotado o modo NVL do Ren'Py
(texto ocupando a tela, como numa light novel):
- o emissor escreve `narrador "..."` com `nvl clear` no início de cada nó e quando uma página passaria
  de 900 caracteres (`NVL_PAGE_CHARS`);
- `game/characters.rpy` define o narrador NVL, `menu = nvl_menu` e `gui.nvl_height = None`.

Dois defeitos apareceram só ao jogar de verdade e foram corrigidos com teste:
1. Sem `menu = nvl_menu` o texto **sumia** quando o menu aparecia (só as opções ficavam na tela).
2. O template de GUI fixa cada parágrafo NVL em 115 px (`gui.nvl_height`); parágrafos longos se
   **sobrepunham** (visto no nó 22). Com `None` a altura é automática.

Conferido por screenshots no Ren'Py, iniciando com `Start()` como um jogador (e não com `Jump`, que
deixa o menu principal ao fundo e dá screenshots enganosos): nó 0 (2ª página + opções) e nó 22 (maior
texto, última página + "Continuar"). Lint e os 3 playthroughs continuam passando. O NVL muda o nome da
tela de menu (`nvl`, não `choice`), então os testes esperam pelo texto da opção.

**Os tamanhos de build da seção 4 foram medidos antes do NVL** (o jogo em si muda pouco; o peso é o
motor). Reexportar para confirmar.

## 6. Cenários provisórios e painel NVL
Cada nó mostra seu cenário (`scene ... with dissolve`); 21 cenários, com fundo provisório (cor lisa e
o nome) até existir a imagem em `game/images/`. Verificado no Ren'Py 8.5.3: lint limpo, 3 playthroughs
passando, troca de cenário no meio do nó (ex.: nó 22, estalagem para quarto).

Achado: o painel NVL do template (`gui/nvl.png`) é quase opaco e escondia o cenário; trocado por um
painel translúcido (`#000000a0`). Testado com uma imagem clara e movimentada (de teste, não do jogo):
imagem visível e texto legível. As opções do menu (cinza) ficam um pouco apagadas sobre fundos muito
claros; ajustar a cor do botão se incomodar quando houver arte final.

## 7. Erro no build do Windows: `No module named 'gui7'`
O primeiro build Windows falhou ao abrir. Causa: o projeto de empacotamento foi montado a partir do
template `gui/game` do SDK, que inclui `game/guisupport.rpy`; esse arquivo importa `gui7`, que só existe
no SDK. Meus testes rodavam o jogo de dentro do SDK (onde o módulo existe) e não pegaram o problema.
Reproduzido extraindo o build Linux antigo e executando-o (mesmo erro), corrigido e verificado do
mesmo jeito: o jogo empacotado inicia sem `traceback.txt`. Projeto de empacotamento novo: gerado com
`renpy.sh launcher generate_gui <pasta> --start` (sem o `guisupport.rpy`), com as imagens de botão,
barra, scrollbar e slider que esse comando não gera copiadas do template em execução, mais os nossos
arquivos. O pacote Windows novo não contém `guisupport` nem `gui7`.

## 8. APK para Android
Gerado em 2026-11-07 com o Ren'Py 8.5.3 + RAPT (`renpy.sh launcher android_build <projeto> --destination <pasta>`),
JDK 21, Android SDK instalado por `rapt/android.py installsdk` (licença do Android SDK aceita pelo autor).
- Arquivo: `com.aventurasolo.vn-1.0-<versionCode>-release.apk`, **51,3 MB**; pacote `com.aventurasolo.vn`
  (ID provisório: trocar antes de publicar), versão 1.0, paisagem, `targetSdk` 36, arquiteturas
  `arm64-v8a`, `armeabi-v7a` e `x86_64`.
- Assinatura v1 e v2 verificadas com `apksigner`. Assinado com uma **chave de teste** (senha `android`,
  `keytool`), gerada só para este build: serve para instalar e testar; **não serve para publicar**.
  Para publicar (Google Play), criar a própria chave no launcher (Android > Gerar Chaves) e guardá-la:
  quem perde a chave não consegue atualizar o app.
- **Não foi executado em um aparelho nem em emulador**: só foram verificados o pacote e a assinatura.
- Percalço: o Maven Central respondeu `429 Too Many Requests` a vários downloads do Gradle. Contornado com
  um script de inicialização do Gradle que aponta para o espelho `repo1.maven.org` e com novas
  tentativas (o Gradle guarda em cache o que já baixou). Configuração do app (`android.json`) criada pela
  classe `Configuration` do RAPT, pois o comando de linha de comando não pergunta.
- Permissões declaradas pelo Ren'Py: vibração, wake lock, leitura/escrita de armazenamento e serviço em
  primeiro plano; o jogo em si não usa nenhuma.
