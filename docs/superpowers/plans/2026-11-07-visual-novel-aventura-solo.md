# Visual Novel Aventura Solo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Converter os 32 nós do `adventure.js` em um projeto Ren'Py jogável (3 capítulos), com ferramentas Node que geram e validam os scripts `.rpy`.

**Architecture:** Um conjunto de módulos Node sem dependências (`tools/lib/`) lê o `adventure.js`, aplica regras por nó (flag `ferido_pescoco`, desvio automático do nó 10), emite um `.rpy` por capítulo e valida labels e jumps. Os `.rpy` gerados passam a ser a fonte da verdade e são editados à mão depois (o conversor não sobrescreve sem `--force`). O projeto Ren'Py em si (`gui/`, `screens.rpy`) vem do launcher do SDK, rodado na máquina do autor.

**Tech Stack:** Node 22 (`node:test`, `node:vm`, sem dependências), Ren'Py 8.x.

**Spec:** `docs/superpowers/specs/2026-11-07-visual-novel-aventura-solo-design.md`

## Global Constraints

- Ferramenta: Ren'Py; idioma do jogo: português do Brasil.
- Cada nó do JSON vira um `label no_NN` (id com 2 dígitos: `no_00` … `no_31`).
- Adaptação fiel: o texto só passa por remoção de HTML e escape de Ren'Py. Nenhum erro do JSON é corrigido na v1, incluindo o link do nó 17 para o nó 21 e os nós 20/21 duplicados.
- Capítulos (um `.rpy` cada): `cap01` nós 0–6, `cap02` nós 7–24, `cap03` nós 25–31.
- Mecânica: só a flag `ferido_pescoco` (ligada no nó 6, zerada no nó 0, lida no nó 10 que desvia: ligada → nó 12, desligada → nó 13).
- Nós sem `options` (30 e 31) terminam o jogo com `return`; nós de morte (4, 12, 19, 20, 21) oferecem "Recomeçar" e voltam ao `no_00`.
- Fora da v1: iOS, sistema RPG, tradução, dublagem, correção do texto, arte final.
- O projeto fica em `visual_novel/` nesta branch até ser movido para um repositório novo.

## Review Focus

1. Recomeçar após morrer não pode herdar `ferido_pescoco` (senão o nó 10 leva a 12 na partida seguinte): o `no_00` zera a flag. Testado na Task 2.
2. Texto com `"`, `[`, `{` ou `%` quebra a sintaxe ou a interpolação do Ren'Py: `escapeRpy` cobre os quatro. Testado na Task 2.
3. Nós sem `options` (30, 31) não podem gerar `menu:` vazio: geram `return`. Testado na Task 2.
4. Rodar o conversor de novo não pode apagar edições manuais: recusa sem `--force`. Testado na Task 3.
5. Um `goto` para nó inexistente ou um nó inalcançável deve ser detectado antes de abrir o Ren'Py: o validador cobre os dois. Testado na Task 4.

---

### Task 1: Leitor do `adventure.js`

**Files:**
- Create: `visual_novel/package.json` (scripts: `"test": "node --test \"tools/test/*.test.js\""`)
- Create: `visual_novel/tools/source/adventure.js` (cópia exata de `/adventure.js` da raiz, para o projeto ser autocontido ao mudar de repositório)
- Create: `visual_novel/tools/lib/load-adventure.js`
- Test: `visual_novel/tools/test/load-adventure.test.js`

**Interfaces:**
- Produces: `loadAdventure(filePath: string): AdventureNode[]` com `AdventureNode = { id: number, origin: string, paragraphs: string[], options: { label: string, goto: number }[] }`, na ordem do arquivo.

- [ ] **Step 1: Escrever os testes (contra o arquivo real)**

```js
test('carrega os 32 nós com ids 0..31 contíguos')
test('nó 0 tem 6 parágrafos e 2 opções: goto 1 e goto 2')
test('nó 0 opção 1 tem label "Agir com cautela e dar a volta ?" (sem HTML, sem remover o "?")')
test('nós 30 e 31 não têm campo options no JSON e voltam com options []')
test('nenhum parágrafo nem label contém "<" ou ">", e nenhum é vazio ou só espaços')
test('todo goto aponta para um id existente')
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `cd visual_novel && npm test`
Expected: FAIL (módulo não existe).

- [ ] **Step 3: Implementar `loadAdventure` em `tools/lib/load-adventure.js`**

Avaliar o arquivo em `node:vm` (ele declara `var json = [...]`) e ler `json` do contexto. Parágrafos: separar o `text` por `</p>`/`<br>`, remover tags, aparar espaços, descartar vazios; se não houver `<p>`, o texto inteiro é um parágrafo. Label: texto do `<a>` sem tags, aparado.

- [ ] **Step 4: Rodar e ver passar**

Run: `cd visual_novel && npm test`
Expected: PASS (6 testes).

- [ ] **Step 5: Commit** — `git add visual_novel && git commit -m "feat(vn): load adventure.js into normalized nodes"`

---

### Task 2: Emissor Ren'Py de um nó

**Files:**
- Create: `visual_novel/tools/lib/rules.js`
- Create: `visual_novel/tools/lib/emit-rpy.js`
- Test: `visual_novel/tools/test/emit-rpy.test.js`

**Interfaces:**
- Consumes: `AdventureNode` da Task 1.
- Produces:
  - `NODE_RULES: { [id: number]: { sets?: { ferido_pescoco: boolean }, branch?: { flag: string, ifTrue: number, ifFalse: number } } }` com `0: { sets: { ferido_pescoco: false } }`, `6: { sets: { ferido_pescoco: true } }`, `10: { branch: { flag: 'ferido_pescoco', ifTrue: 12, ifFalse: 13 } }`.
  - `labelName(id: number): string` → `no_00`.
  - `escapeRpy(s: string): string`.
  - `emitNode(node: AdventureNode): string`.

- [ ] **Step 1: Escrever os testes**

```js
test('labelName(5) === "no_05" e labelName(31) === "no_31"')
test('escapeRpy: \\ → \\\\, " → \\", [ → [[, { → {{, % → %%')
test('nó comum: label, um parágrafo por linha entre aspas com 4 espaços, menu com um jump por opção')
test('nó 0 contém "$ ferido_pescoco = False" antes dos parágrafos')   // Review Focus 1
test('nó 6 contém "$ ferido_pescoco = True" e ainda emite seu menu normal')
test('nó 10 não contém "menu:" e contém "if ferido_pescoco:" com "jump no_12" e "else:" com "jump no_13"')
test('nó sem opções (30) termina com "    return" e não contém "menu:"')   // Review Focus 3
test('nó 4 emite um menu com a opção "Recomeçar." e "jump no_00"')
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `cd visual_novel && npm test`
Expected: FAIL (`emit-rpy` não existe).

- [ ] **Step 3: Implementar `rules.js` e `emit-rpy.js`**

Formato de saída de um nó comum (indentação de 4 espaços, linha em branco final):

```
label no_05:
    "Parágrafo 1."
    "Parágrafo 2."
    menu:
        "Ir para a direita.":
            jump no_07
        "Ir para a esqueda.":
            jump no_08
```

Texto e labels de opção passam por `escapeRpy`. Regras: `sets` emite `$ flag = True|False` logo após o `label`; `branch` substitui o `menu` pelo `if`/`else` com `jump`.

- [ ] **Step 4: Rodar e ver passar**

Run: `cd visual_novel && npm test`
Expected: PASS.

- [ ] **Step 5: Commit** — `git add visual_novel && git commit -m "feat(vn): emit Ren'Py labels with flag rules"`

---

### Task 3: Capítulos e conversor de linha de comando

**Files:**
- Create: `visual_novel/tools/lib/chapters.js`
- Create: `visual_novel/tools/convert.js`
- Test: `visual_novel/tools/test/convert.test.js`

**Interfaces:**
- Consumes: `loadAdventure`, `emitNode`, `labelName`.
- Produces:
  - `CHAPTERS: { file: string, title: string, ids: number[] }[]` com `cap01.rpy` (0–6), `cap02.rpy` (7–24), `cap03.rpy` (25–31).
  - `emitChapter(chapter, nodesById: Map<number, AdventureNode>): string` (comentário de título + os nós em ordem de id).
  - `convert({ source: string, outDir: string, force: boolean }): string[]` devolve os caminhos gerados em `outDir/script/`. Lança `Error` com a lista de arquivos existentes se algum já existir e `force` for falso, sem gravar nada.
  - CLI: `node tools/convert.js <source> <outDir> [--force]`.

- [ ] **Step 1: Escrever os testes (usar diretório temporário)**

```js
test('CHAPTERS cobre cada id de 0 a 31 exatamente uma vez')
test('convert gera cap01.rpy, cap02.rpy e cap03.rpy e 32 labels no total')
test('no_17 mantém "jump no_21" (problema do JSON preservado na v1)')
test('segunda chamada sem force lança erro e não altera os arquivos; com force sobrescreve')   // Review Focus 4
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `cd visual_novel && npm test`
Expected: FAIL.

- [ ] **Step 3: Implementar `chapters.js`, `convert()` e a CLI em `convert.js`**

Cria `outDir/script/` se faltar. A CLI imprime os arquivos gerados e sai com código 1 e a mensagem do erro quando bloqueada.

- [ ] **Step 4: Rodar e ver passar**

Run: `cd visual_novel && npm test`
Expected: PASS.

- [ ] **Step 5: Gerar os scripts reais**

Run: `cd visual_novel && node tools/convert.js tools/source/adventure.js game`
Expected: imprime `game/script/cap01.rpy`, `cap02.rpy`, `cap03.rpy`.

- [ ] **Step 6: Commit** — `git add visual_novel && git commit -m "feat(vn): chapter converter and generated scripts"`

---

### Task 4: Validador estático dos `.rpy`

**Files:**
- Create: `visual_novel/tools/lib/validate-rpy.js`
- Create: `visual_novel/tools/validate.js`
- Test: `visual_novel/tools/test/validate-rpy.test.js`

**Interfaces:**
- Consumes: pasta com `.rpy` (a gerada na Task 3).
- Produces: `validateRpyDir(dir: string, entry: string): { errors: string[] }` — `entry` é o label inicial (`no_00`). CLI: `node tools/validate.js <dir> [entry]`, sai com código 1 se houver erros.

- [ ] **Step 1: Escrever os testes (fixtures de texto em diretório temporário)**

```js
test('árvore válida não tem erros')
test('jump para label inexistente gera erro citando o label e o arquivo')    // Review Focus 5
test('label duplicado gera erro')
test('label inalcançável a partir de entry gera erro')                       // Review Focus 5
test('a saída real gerada pela Task 3 valida sem erros, com os 32 labels alcançáveis a partir de no_00')
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `cd visual_novel && npm test`
Expected: FAIL.

- [ ] **Step 3: Implementar `validateRpyDir`**

Ler todos os `.rpy` da pasta, recursivamente, coletar `label X:` e `jump X`, tratar `return` como terminal e montar o grafo; alcançabilidade por busca a partir de `entry`. Cada erro é uma string com arquivo e nome do label.

- [ ] **Step 4: Rodar e ver passar**

Run: `cd visual_novel && npm test && node tools/validate.js game/script no_00`
Expected: testes PASS; CLI imprime `OK: 32 labels, 0 erros`.

- [ ] **Step 5: Commit** — `git add visual_novel && git commit -m "feat(vn): static validator for labels and jumps"`

---

### Task 5: Mapa de ramificações e registro de assets

**Files:**
- Create: `visual_novel/tools/lib/graph-md.js`
- Create: `visual_novel/tools/graph.js`
- Create: `visual_novel/docs/mapa-ramificacoes.md` (gerado)
- Create: `visual_novel/docs/assets.md`
- Test: `visual_novel/tools/test/graph-md.test.js`

**Interfaces:**
- Consumes: `loadAdventure`, `CHAPTERS`.
- Produces: `graphMarkdown(nodes: AdventureNode[], chapters): string` (bloco Mermaid `flowchart TD`, um subgraph por capítulo, aresta `no_05 --> no_07` por opção, o desvio do nó 10 como arestas rotuladas `ferido_pescoco` e `não`); CLI `node tools/graph.js <source> <outFile>`.

- [ ] **Step 1: Escrever os testes**

```js
test('graphMarkdown tem 3 subgraphs e 49 arestas (uma por goto, incluindo as 2 do desvio do nó 10)')
test('as arestas do nó 10 são rotuladas e não há aresta sem rótulo saindo dele')
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `cd visual_novel && npm test`
Expected: FAIL.

- [ ] **Step 3: Implementar `graphMarkdown` e a CLI; criar `docs/assets.md`**

`docs/assets.md` é uma tabela vazia com colunas: arquivo, tipo (bg, sprite, cg, áudio), fonte, licença, uso comercial (sim/não), ferramenta (se gerado por IA), onde é usado.

- [ ] **Step 4: Rodar e gerar o mapa**

Run: `cd visual_novel && npm test && node tools/graph.js tools/source/adventure.js docs/mapa-ramificacoes.md`
Expected: testes PASS; arquivo gerado.

- [ ] **Step 5: Commit** — `git add visual_novel && git commit -m "feat(vn): branch map generator and assets registry"`

---

### Task 6: Entrada do jogo e instruções de integração com o Ren'Py

**Files:**
- Create: `visual_novel/game/script.rpy` (`label start:` com `jump no_00`)
- Create: `visual_novel/game/state.rpy` (`default ferido_pescoco = False`)
- Create: `visual_novel/README.md` (como gerar, validar e integrar)
- Test: `visual_novel/tools/test/entry.test.js`

**Interfaces:**
- Consumes: scripts gerados na Task 3.
- Produces: pasta `game/` completa em termos de roteiro; faltam só `gui/`, `screens.rpy`, `options.rpy`, que o launcher cria.

- [ ] **Step 1: Escrever o teste**

```js
test('validateRpyDir("game", "start") não tem erros: start → no_00 e todos os 32 labels são alcançáveis')
test('state.rpy declara "default ferido_pescoco = False"')
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `cd visual_novel && npm test`
Expected: FAIL (arquivos faltando).

- [ ] **Step 3: Criar `script.rpy`, `state.rpy` e o README**

O README documenta, em passos curtos: `npm test`, regenerar com `--force` (e que isso apaga edições manuais), e a integração: criar um projeto novo pelo launcher do Ren'Py 8.x, copiar `game/script/`, `game/state.rpy` e `game/script.rpy` (substituindo o `script.rpy` do template) para dentro do projeto criado.

- [ ] **Step 4: Rodar e ver passar**

Run: `cd visual_novel && npm test`
Expected: PASS.

- [ ] **Step 5: Commit** — `git add visual_novel && git commit -m "feat(vn): game entry point, state and integration guide"`

---

### Task 7: Verificação no Ren'Py (na máquina do autor)

Não executável na sessão em nuvem (`renpy.org` bloqueado). Estes passos fecham a v1.

**Files:**
- Create: `visual_novel/docs/notas-de-build.md`

- [ ] **Step 1: Integrar** seguindo o README da Task 6 em um projeto criado pelo launcher.

- [ ] **Step 2: Lint**

Run: `renpy.sh <projeto> lint`
Expected: sem erros de sintaxe; avisos sobre arte ausente são aceitáveis na v1.

- [ ] **Step 3: Playthrough dos dois finais e de uma morte**

Jogar: (a) caminho até o nó 30 (entrar pela porta da frente → nó 28 → 30); (b) caminho até o nó 31 (mapa → nó 29 → 31); (c) o caminho scrag-fuga (nó 6) até o nó 10, que deve ir ao nó 12; depois "Recomeçar" e seguir por um caminho sem ferimento até o nó 10, que deve ir ao nó 13.
Expected: (a) e (b) terminam no menu principal; (c) confirma que a flag é zerada ao recomeçar.

- [ ] **Step 4: Exportar para Windows/Linux e para web; registrar tamanho e problemas** em `docs/notas-de-build.md` (tamanho do build web, tempo de carga, funcionamento no celular).

- [ ] **Step 5: Commit** — `git add visual_novel && git commit -m "docs(vn): build notes from first Ren'Py run"`
