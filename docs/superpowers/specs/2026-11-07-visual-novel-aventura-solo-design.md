# Visual Novel de Aventura Solo — Design

Data: 2026-11-07
Status: aguardando revisão

## 1. Objetivo

Criar uma visual novel (estilo light novel) de aventura solo, com história original, inspirada no
projeto `aventura_solo` (livro-jogo em JS), mas como projeto novo e independente.

**Critério de sucesso da v1:** um jogo jogável do começo ao fim, com início, meio e fim em vários
capítulos e finais múltiplos, com save/load, rodando em pelo menos uma plataforma desktop e na web,
com uma estrutura que permita trocar a arte depois sem mexer na história.

## 2. Decisões acordadas

| Tema | Decisão |
|---|---|
| Estilo | Visual novel: caixa de diálogo, sprites, cenários, música, escolhas ramificadas |
| História | Original, escrita pelo autor |
| Escopo v1 | Jogo completo pequeno (início, meio e fim, vários capítulos) |
| Mecânicas | Só escolhas narrativas: ramificações, flags de decisão, afinidade. Sem dados nem combate |
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

## 4. Narrativa e fluxo

- Cada capítulo é um conjunto de `label` com `menu` para escolhas e `jump` para desvios.
- Escolhas alteram flags/contadores; cenas posteriores os leem.
- Mapa de ramificações mantido em `docs/` e atualizado a cada capítulo.
- Finais múltiplos decididos por flags acumuladas; tela de finais desbloqueados via `persistent`.

## 5. Mecânicas

Apenas flags booleanas e contadores de afinidade. Testes de atributo podem ser adicionados depois
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
- Título, tema e sinopse da história, a definir no início do roteiro.
- Número de capítulos e de finais da v1, a definir junto com o mapa de ramificações.
