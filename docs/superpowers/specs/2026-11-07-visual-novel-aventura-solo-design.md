# Visual Novel de Aventura Solo — Design

Data: 2026-11-07
Status: aguardando revisão

## 1. Objetivo

Criar uma visual novel (estilo light novel) de aventura solo, como projeto novo e independente,
**adaptando fielmente a aventura que já existe em `adventure.js`** (32 nós, transcrição da aventura
solo da Dragão Brasil nº 12, Editora Trama, de Andreas McCullosh & Paladino). O JSON é a referência
de história, de estrutura de escolhas e de mecânica.

**Critério de sucesso da v1:** um jogo jogável do começo ao fim, com início, meio e fim em vários
capítulos e finais múltiplos, com save/load, rodando em pelo menos uma plataforma desktop e na web,
com uma estrutura que permita trocar a arte depois sem mexer na história.

## 2. Decisões acordadas

| Tema | Decisão |
|---|---|
| Estilo | Visual novel: caixa de diálogo, sprites, cenários, música, escolhas ramificadas |
| História | Adaptação fiel do `adventure.js` (mesmos eventos, caminhos e textos), em vez de história original |
| Escopo v1 | Jogo completo pequeno: os 32 nós do JSON, do início aos 2 finais, agrupados em capítulos |
| Mecânicas | Só escolhas narrativas, como no JSON: ramificações e flags de decisão. Sem dados nem combate |
| Direitos | Uso pessoal/estudo sem restrição; **publicar** (itch.io, lojas) exige permissão dos autores/editora |
| Plataformas | Web, PC e celular |
| Ferramenta | Ren'Py |
| Arte | Assets gratuitos ou gerados por IA, com registro de licenças |
| Idioma | Português do Brasil, textos separados do código para tradução futura |

### Por que Ren'Py
Padrão de mercado para visual novel, gratuito, com save/load, rollback, histórico, skip e
configurações prontos. Exporta Windows, Mac, Linux e Android; a exportação web existe mas tem
limitações. Descartados: Godot + Dialogic (mais trabalho para o básico) e web-first em JS
(UI, save e empacotamento mobile por conta própria).

## 3. Estrutura do projeto

Projeto Ren'Py novo, em repositório separado do `aventura_solo` (que fica como referência).

```
game/
  script/        # um .rpy por capítulo: cap01.rpy, cap02.rpy, ...; start.rpy
  characters.rpy # personagens, cores, nomes
  state.rpy      # flags de decisão e afinidade
  screens.rpy    # customização de interface
  images/        # bg/, sprites/, cg/
  audio/
  gui/
docs/            # roteiro, mapa de ramificações, lista de assets com licenças
```

## 4. Narrativa e fluxo (referência: `adventure.js`)

O JSON tem 32 nós (`id` 0 a 31), cada um com `text`, `options` (`text` + `goto`) e `origin`
(provável número do parágrafo do livro original). Grafo sem links quebrados, 2 a 3 opções por nó,
~119 palavras por nó, 2 finais (nós 30 e 31) e 5 nós de fim de jogo (4, 12, 19, 20, 21) que
retornam ao nó 0.

- Cada nó vira um `label` Ren'Py (`no_00` … `no_31`), cada `options` vira um `menu` e cada `goto`
  um `jump`. Manter o `id` do JSON no nome do label para rastrear o original.
- Os nós de fim de jogo mostram o texto e oferecem recomeçar (`jump no_00`), como no JSON.
- Nós quase idênticos (20 e 21; 22 e 23) são mantidos separados na v1 para preservar a
  fidelidade; unificá-los é decisão posterior.
- Um conversor (script Node) lê o `adventure.js` e gera os `.rpy` do esqueleto: labels, textos
  limpos de HTML e menus. Revisão manual depois (o texto tem erros de digitação a corrigir).
- Os 32 nós são agrupados em capítulos pelo arco da história (pântano e viagem; desfiladeiro e
  rio; vila de Mornard e dragão), um `.rpy` por capítulo.
- Mapa de ramificações mantido em `docs/`, gerado a partir do JSON.

## 5. Mecânicas (referência: estado implícito no JSON)

O JSON não tem atributos, dados, vida ou inventário. A mecânica é "escolhas + consequências que o
texto lembra". Elas viram flags em `state.rpy`:

| Flag | Origem no JSON |
|---|---|
| `tem_medalhao` | perdido (nó 12), usado contra mortos-vivos (nó 13) |
| `tem_bolsa` / moedas | nós 14 a 18, 20, 21, 24 (pagar jangadeiro ou estalajadeiro) |
| `poderes_cura` | uso dos poderes divinos de cura (nós 26 e 27) |
| `tem_mapa` | mapa do garoto (nó 29), leva ao final 31 |

As flags exatas são confirmadas lendo cada nó durante a escrita do plano. Onde o JSON hoje
depende só do caminho fixo, as flags servem para a interface (ex.: ícones de itens) e para uma
tela de finais desbloqueados via `persistent`. Testes de atributo podem ser adicionados depois
com o Python embutido, sem refazer a estrutura.

## 6. Interface

Tela de título, menu de pausa, galeria de CGs, histórico, configurações e save/load (a maior parte
já vem no Ren'Py). Um tema visual único (cores, fonte, moldura da caixa de texto) para fugir da
aparência padrão.

## 7. Arte e áudio

- Desenvolvimento com placeholders primeiro; a arte entra por capítulo.
- Todo asset é registrado em `docs/` com fonte, licença e se permite uso comercial. Para imagens
  geradas por IA, registrar a ferramenta e seus termos de uso.

## 8. Build e publicação

- **Direitos:** a história é de terceiros. Builds para uso pessoal e testes são livres; antes de
  qualquer publicação pública é preciso obter permissão dos autores/editora ou reescrever a
  história com mudanças suficientes. Isso não está decidido neste spec.
- Windows, Mac, Linux e Android pelo launcher do Ren'Py.
- Web pela exportação web do Ren'Py (itch.io ou GitHub Pages). Testada cedo, no primeiro capítulo,
  para medir peso e desempenho antes de produzir muita arte.
- iOS fica fora da v1 (exige Mac e Xcode).

## 9. Verificação

Ren'Py não tem framework de testes unitários típico. Verificação por:
- `lint` do Ren'Py a cada capítulo;
- playthrough de cada final;
- garantir que nenhuma rota termina sem destino (nenhum `jump` para label inexistente).

## 10. Fora do escopo da v1

iOS, sistema RPG (dados, ficha, combate), tradução para outros idiomas, dublagem.

## 11. Pontos em aberto

- Criação do repositório novo (fora do alcance desta sessão; este spec fica na branch atual
  `claude/festive-archimedes-erkdqf` até a migração).
- Permissão de publicação junto aos autores/editora (ou reescrita), antes de lançar publicamente.
- Divisão exata dos 32 nós em capítulos e nomes dos personagens (o JSON usa "você", o viajante,
  o jangadeiro, o estalajadeiro, o rapaz ferido e o dragão), a definir ao gerar o esqueleto.
- Se unificar os nós quase duplicados (20/21, 22/23) depois da v1.
