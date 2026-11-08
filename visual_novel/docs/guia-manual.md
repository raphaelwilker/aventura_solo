# Guia: fazer tudo à mão, sem ajuda

Passo a passo para colocar músicas, imagens e trocar o título direto no Ren'Py, sem precisar de mais ninguém.

## 0. Onde estão os arquivos
Tudo do jogo está em `visual_novel/game/` neste repositório (branch `claude/festive-archimedes-erkdqf`).
Para baixar sem Git: abra o repositório no GitHub, escolha a branch e use **Code > Download ZIP**.
Para usar no Ren'Py, copie o conteúdo de `visual_novel/game/` para a pasta **`game`** do seu projeto no launcher
(a que contém `gui/`, `screens.rpy`, `options.rpy`): as pastas `script/`, `audio/`, `images/` e os arquivos
`characters.rpy`, `cenarios.rpy`, `musica.rpy`, `state.rpy`, `tela_inicial.rpy`, `script.rpy`. Pode substituir os que já existirem.
**Não use** o template `gui/game` do SDK como projeto (causa o erro `gui7` ao empacotar).

## 1. Colocar uma música
1. No launcher, selecione o projeto e clique em **game** (em "Abrir Diretório"). Se não existir a pasta `audio`, crie.
2. Copie o arquivo para `game/audio/` com o **nome exato** da tabela abaixo (minúsculas, sem acento, sem espaço).
   Formatos aceitos: `.ogg` (recomendado, leve), `.opus`, `.mp3`, `.flac`, `.wav`. Só um arquivo por nome.
3. Clique em **Executar Projeto** e confira. Não precisa mexer em código.
4. Sem o arquivo, o jogo fica em silêncio naquele ponto (sem erro). Pode ir colocando aos poucos.

| Arquivo (sem a extensão) | Onde toca | Já tem? |
|---|---|---|
| `mus_titulo` | tela inicial | sim (Dedication Day) |
| `mus_inicio` | nó 0: começo da história | sim (Homecoming) |
| `mus_viagem` | estradas, encruzilhada, montanha, trilhas, vales | não |
| `mus_pantano` | Pântano da Agonia | não |
| `mus_perigo` | mortos-vivos e assalto no rio | não |
| `mus_estalagem` | estalagem de Stew | não |
| `mus_mornard` | vila de Mornard em ruínas | não |
| `mus_dragao` | templo e dragão | não |
| `mus_derrota` | as mortes que levam a "Recomeçar" | não |
| `mus_final_tragico` | final do nó 30 | não |
| `mus_final_vitoria` | final do nó 31 | não |

A lista completa, com os nós de cada faixa, está em `docs/lista-de-musicas.md`.

**Dicas:** faixas de 2 a 3 minutos que repetem sem corte; `.ogg` ocupa de 1 a 3 MB (as duas de 10 minutos em `.mp3` têm
cerca de 14 MB cada e deixam o APK pesado). Para converter, programas gratuitos como o Audacity exportam em `.ogg`.
O volume da música é ajustado pelo jogador na tela de **Preferências**.

## 2. Dar crédito a uma música
Os créditos aparecem no final do jogo. Abra `game/script/cap03.rpy` num editor de texto (Bloco de Notas serve), procure
por `Música:` (aparece duas vezes, nos nós 30 e 31) e edite as duas linhas, por exemplo:

    narrador "Música: Dedication Day e Homecoming, de Tabletop Audio - https://tabletopaudio.com/"

Para acrescentar outra música, adicione outra linha `narrador "..."` logo abaixo, nas duas. Evite aspas dentro do texto e os
caracteres `[`, `{` e `%`, que o Ren'Py trata de forma especial.

## 3. Trocar a música de um trecho
Cada nó tem uma linha `$ tocar_musica("mus_...")` logo depois do `scene`. Em `game/script/cap01.rpy`, `cap02.rpy` e `cap03.rpy`,
procure o `label no_NN:` do nó e troque o nome da faixa. Não apague o `$ ` do começo da linha.

## 4. Colocar uma imagem de cenário
Salve em `game/images/` com o nome do cenário (`bg_estrada.jpg`, 1280x720, jpg/png/webp). A cor lisa provisória some sozinha.
Lista de nomes e prompts em `docs/guia-de-arte.md`.

## 5. Trocar o título do jogo
Edite as duas primeiras linhas de `game/tela_inicial.rpy`:

    define titulo_jogo = "Aventura Solo"
    define subtitulo_jogo = "Uma aventura solo"

## 6. Gerar o jogo (build)
- **Windows / Linux:** no launcher, selecione o projeto, clique em **Construir Distribuições**, marque o pacote e **Construir**.
  O resultado fica numa pasta ao lado do projeto. Teste abrindo o jogo **empacotado**, e não só pelo launcher.
- **Android:** no launcher, clique em **Android**; na primeira vez ele pede para instalar o SDK e criar uma chave (guarde-a:
  quem a perde não consegue atualizar o app). Depois, **Construir Pacote**. O `docs/notas-de-build.md` tem os detalhes.
- Antes de publicar: confira **licença e uso comercial** de cada imagem e música (`docs/assets.md`) e a permissão para a
  história, que é de terceiros (Dragão Brasil nº 12, Editora Trama).

## 7. Se algo der errado
- Tela vermelha de erro no jogo: leia a última linha; costuma dizer o arquivo e a linha. Aspas faltando ou um espaço a mais
  no começo de uma linha (o Ren'Py exige 4 espaços de recuo) são as causas mais comuns.
- No launcher, **Checar Script (Lint)** aponta erros de texto antes de executar.
- O arquivo `traceback.txt`, na pasta do projeto, guarda o último erro.
