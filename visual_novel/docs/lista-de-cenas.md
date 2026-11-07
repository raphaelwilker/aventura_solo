# Lista de cenas e assets

Levantada lendo os 32 nós do texto. Formato: **1280x720** (a resolução do projeto), JPG para cenários
e PNG com fundo transparente para personagens. Todo asset entra em `assets.md` com fonte e licença.

Como o jogo usa o **modo NVL**, o texto ocupa uma coluna no centro da tela. Cenários com a parte
central calma ou escura leem melhor; se precisar, escurecemos o fundo atrás do texto.

## 1. Cenários (prioridade 1: o jogo fica completo só com estes)

Os três que você lembrou estão marcados com ★.

| ID | Cenário | Nós | Como é, segundo o texto | Variações |
|---|---|---|---|---|
| bg_estrada | ★ Estrada de terra | 0, 7 | Caminho de volta para casa, depois de uma festa; viajante caído à beira da estrada | fim de tarde |
| bg_encruzilhada | ★ Estrada que se bifurca | 3, 5, 6, 7, 8 | "O caminho se bifurca": direita e esquerda; no nó 7, montanha de um lado e vale do outro | dia |
| bg_pantano_margem | ★ Margem do pântano | 0, 1 | Pântano da Agonia visto de fora; acampamento com fogueira à noite | noite |
| bg_pantano_dentro | ★ Interior do pântano | 2, 5, 6 | Lama, águas estagnadas, poente, tocha acesa; scrags e fuga | poente / noite |
| bg_montanha_distante | ★ Montanha ao longe | 7, 9, 10 | Vista da montanha e do vale que a contorna, de longe | dia |
| bg_trilha_montanha | Trilha entre rochas | 9 | Sombras refrescantes, caverna do urso cinzento | dia |
| bg_desmoronamento | Penhasco e escalada | 9, 11, 14, 19 | Trecho destruído, escalada perigosa, encosta com queda imensa | dia |
| bg_desfiladeiro | Desfiladeiro | 8 | Fenda enorme, sem como chegar ao outro lado | dia |
| bg_vale | Vale ao sol | 10 | Vale castigado pelo sol | dia forte |
| bg_campo_batalha | Antigo campo de batalha | 10, 12, 13 | Clareira com armaduras enferrujadas, armas quebradas e ossos; mortos-vivos | fim de tarde |
| bg_rio_ponte | Rio com ponte velha | 13, 17 | Rio de uns 50 m, ponte apodrecida, jangada | dia |
| bg_rio_jangada | Rio, visto da jangada | 16, 18, 20, 21 | Meio do rio, jangada frágil; assalto e afogamento | dia |
| bg_estalagem | Interior da estalagem | 15, 17, 18, 22, 23, 24 | Quente e acolhedora, mesa junto à lareira | noite |
| bg_quarto | Quarto da estalagem | 22, 24 | Bacia de água quente para o banho, cama | noite |
| bg_estabulo | Estábulo | 23 | Noite longa e fria para dormir | noite |
| bg_mornard | Vila de Mornard destruída | 25, 26, 27 | Destroços enegrecidos, mortos e feridos, colina ao fundo | dia |
| bg_colina_templo | Colina com ruínas do templo | 28, 29 | Antiga igreja de um culto esquecido, pórtico frontal | dia |
| bg_templo_interior | Salão do templo | 28, 29 | Imensidão do templo, tesouro (moedas e joias) e o dragão enroscado | penumbra |
| bg_templo_corredor | Corredores escuros e úmidos | 29 | Entrada lateral escavada pelo tempo | escuro |
| bg_final_ceu | Céu / além | 30 | "No céu, Hedryl estará esperando": final trágico | — |
| bg_final_vila | Vila em festa | 31 | Herói aclamado, bardos cantando, Mornard | dia |

Dá para começar com os 5 ★ e reaproveitar: por exemplo, `bg_estalagem` serve para o quarto no início,
e `bg_estrada` para a encruzilhada, até haver arte própria.

## 2. Personagens e criaturas (prioridade 2)

O herói fala em segunda pessoa ("você"), então **não precisa de sprite**; só aparece em ilustrações.

| ID | Quem | Nós | Descrição no texto |
|---|---|---|---|
| viajante | Viajante caído | 0 | Roupas sujas e rasgadas que foram luxuosas; espancado por 5 ladrões |
| ladroes | Bando de ladrões | 0 | 5 assaltantes |
| homens_lagartos | Homens-lagartos | 1, 3, 4 | 6; escamosos, olhos amarelos, línguas silvantes, espadas curtas, zarabatanas |
| scrags | Scrags (trolls d'água) | 2, 5, 6 | Bípedes, esverdeados, muito feios; regeneram feridas; temem fogo |
| urso | Urso cinzento | 9 | Enorme, em pé nas patas de trás |
| mortos_vivos | Mortos-vivos | 10, 12, 13 | Carcaças de guerreiros que se levantam |
| jangadeiro | Jangadeiro | 13, 16, 17, 18, 20, 21 | Pele escura, chapéu de palha, dentes falhos, sorriso matreiro |
| stew | Stew, o estalajadeiro | 15, 17, 18, 22, 23, 24 | Baixo, grandes bigodes |
| rapariga | Rapariga da estalagem | 15, 17, 18, 22, 24 | Serve a sopa; no nó 22 prepara o banho, olhos baixos |
| jovem_mornard | Jovem de Mornard | 25 | Tenta confortar o rapaz queimado; aponta a colina |
| rapaz_ferido | Rapaz queimado | 25, 26 | Gravemente queimado; salvou a garota |
| garoto_mapa | Garoto do mapa | 26 | Neto do ancião; desenha a entrada secreta |
| dragao | Dragão vermelho | 28, 29, 30, 31 | Enroscado sobre moedas e joias; hálito de fogo; zombeteiro |

## 3. Itens e ilustrações especiais (opcional)

| ID | O quê | Nós |
|---|---|---|
| medalhao | Medalhão de prata em formato de espada, símbolo de Hedryl | 12, 13 |
| espada_sagrada | A Espada Sagrada (a lâmina emite luz intensa) | 0, 9, 28, 29 |
| bolsa | Bolsa de moedas | 11, 14, 15, 18, 24 |
| mapa | O mapa desenhado pelo garoto | 26, 29 |
| cg_dragao | Ilustração do duelo final (boca aberta, hálito de fogo) | 28 |

## 4. Áudio (se quiserem depois)
Música: viagem calma, pântano/tensão, estalagem, luta, vila destruída, templo, final. Efeitos:
fogueira, água, urso, dragão. Mesmas regras de licença.

## 5. Onde procurar (confirmar a licença de cada arquivo antes de usar)
- **itch.io, aba Game Assets:** filtros por "Free" e por tag (background, fantasy, visual novel).
  Cada pacote tem sua licença; leia a do pacote.
- **OpenGameArt.org:** filtrar por licença **CC0** (sem restrições) ou CC-BY (exige dar crédito).
- **Wikimedia Commons, Pixabay, Unsplash:** fotos e pinturas de domínio público ou livres, úteis
  para montanha, estrada, rio e pântano; o estilo de foto pode destoar de ilustrações.
- **Imagens geradas por IA:** dão estilo consistente, mas exigem conferir os termos de uso da
  ferramenta (uso comercial, direitos). Registrar a ferramenta e o prompt base em `assets.md`.

Não verifiquei pacotes nem licenças específicas daqui: cada arquivo escolhido precisa da conferência
e do registro em `assets.md`.

## 6. Decisão que falta: estilo visual
Misturar estilos (um pacote de cada lugar) deixa o jogo com aparência de colagem. Escolher **um**
estilo e buscar tudo nele, ou gerar todo o conjunto com o mesmo prompt base.
