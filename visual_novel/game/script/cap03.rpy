# Capítulo 3 - Mornard e o Dragão

label no_25:
    "A vila de Mornard surge ao longe, e mesmo a essa distânciaa visão é terrivel: montes de destroços enegrecidos onde deveria haver  casas, e pessoas mortas e feridas por toda  parte."
    "- Quem fez isto? - você pergunta, revoltado, a uma jovem que tenta confortar um rapaz gravemente queimado."
    "- Onde está o responsável por este massacre insano? Mostre-me, e levarei a justiça de Hedryl até esse monstro!"
    "Entre soluços e lágrimas, a jovem aponta para uma colina próxima:"
    "- O dragão esconde-se nas ruínas de um templo. No início apenas exigia tributos, obrigava-nos a entregar todo o nosso ouro e joias...mas, agora que nossos escassos tesouros esgotaram-se, ele ataca com seu fogo infernal. Oh, meu querido... ele tentou me proteger das chamas..."
    "você percebe que o estado do rapaz ´grave, e ele morrerá a quaquer momento."
    menu:
        "Ajudar ?":
            jump no_26
        "Ir atrás do dragão ?":
            jump no_27

label no_26:
    "O valente rapaz está morrendo porque salvou a garota, e Hedryl não aprovaria sua morte. você ajoelha-se ao seu lado, retira as manoplas metálicas e começa o tirual de cura: uma luz suave é irradiada de suas mãos, curando o magicamente as queimaduras. Marcas horríveis permanecem na pele do rapaz, mas ele vai viver."
    "você usa o que resta de seus poderes para confortar os feridos mais graves. Quando termina de curar um ancião moribundo, seu neto enxuga as lágrimas e diz que conhece uma entrada secreta para o temmplo."
    "- Desenhe um mapa - você diz, entregando a ele pena e pergaminho."
    "O garoto rabisca algumas linhas no papel, de forma clara o bastante para que você possa reconhecer a planta de um templo. De acordo com o desenho, existe uma passagem lateral que poderia ser usada atacar o dragão de surpresa."
    menu:
        "Entrar pela porta da frente ?":
            jump no_28
        "Ir pela entrada secreta ?":
            jump no_29

label no_27:
    "Os feridos são muitos, e mesmo seus poderes divinos de cura talvez não sejam o bastante. Além disso, pode precisar deles se for ferido pelo dragão. você se esforça para ignorar os lamentos da pessoas queimadas e deixa a vila, rumando para o templo."
    menu:
        "Continuar...":
            jump no_30

label no_28:
    "Caminhando até a colina, você logo encontra a construção arruinada - antiga igreja de algum culto esquecido. você faz uma rápida oração aos deuses locais, pedindo permissão para pisar em seu solo sagrado - e avança pelo pórtico frontal."
    "Lá dentro, na imensidão do templo, uma forma escamosa enrosca-se à volta de um punhado de moedas e jóias. O dragão vermelho olha zombeteiro para o cavaleiro que se aproxima."
    "- Ousa invadir meu santuário, pobre humano? Acredita que sua espada de brinquedo poder-a vencer-me? Venha, e lhe darei a morte que os tolos merecem."
    "Sem deixar-se intimidar pela bravata da serpente, você saca sua espada e investe coorrendo com um grado de guerra. A batalha parece durar uma eternidade; cada golpe da Espada Sagrada provoca um contra-ataque  das garras demoníacas do dragão. COrtes profundos no peito e e garganta parecem não afetar em nada a fera, que prossegue lutando. Então, em certo momento, chamas  faiscam através dos ferimentos no pescoço escamoso. Ele vai usar seu hálito de fogo!"
    "Sabendo que este poderá ser seu fim, você aguarda até o último momento. Quando a bocarra abre-se para despejar sua língua flamenjante, você ataca! A Espada Sagrada penetra fundo no céu da boca do monstro, e atravessa-lhe o cérebro - ao mesmo tempo em que uma cascata unfernal envolve seu próprio corpo, derretendo a armadura, desmanchando a carne em fumaça e desfazendo os ossos em cinzas."
    menu:
        "Continuar...":
            jump no_30

label no_29:
    "Aproximando-se da colina, você vê as ruínas do templo. O mapa do garoto leva você a uma entrada lateral, escavada pelo tempo. Depois de alguns minutos percorrendo corredores escuros e úmidos, você alcança o salão principal."
    "Lá dentro, na imensidão do templo, uma forma escamosa enrosca-se à volta de um punhado de moedas e jóias. O dragão não viu você: sua cabeça está voltada para a entrada, na direção oposta. Se tivesse entrado pela frente, jamais poderia surpreendê-lo."
    "você aproxima-se sorrateiro e, no último momento, um brado de guerra explode em sua garganta - enquanto a Espada Sagrada penetra fundo no ombro do dragão, inutilizando sua pata esqueda. A fera vira-se para lutar, mas a pata quebrada não permite que se mova rapidamente, e você consegue aproveitar sua posição privilegiada para aplicar mais golpes. Em poucos momentos, todo o flanco esquerdo do dragão está destruío. Seu coração pulsante é visível através da carne rasgada. Uma última estocada coloca fim a vida do demônio. você venceu."
    menu:
        "Continuar...":
            jump no_31

label no_30:
    "O dragão tomba sem vida. Não irá mais molestar inocentes, não irá mais aterrorizar aldeões indefesos."
    "Um grade mal foi vencido, e o preço a pagar foi muito pequeno: apenas sua vida."
    "Na terra, sua coragem nunca será esquecida. A vila de Mornard prestará homenagens a seu salvador para sempre, os bardos cantarão suas batalhas pelo reino. E, no céu Hedryl estará esperando por seu mais valoroso guerreiro..."
    "Fim.História publicada na revista Dragão Brasil Ano 1 número 12 pela Editora Trama.História de Andreas McCullosh & Paladino"
    return

label no_31:
    "Tendo matado sozinho um enorme dragão vermelho, coisa que os mais valentes guerreiros não conseguiram ou se recusaram fazer, você  é aclamado como herói. O seu nome será uma lenda entre os cavaleiros da ordem de Hedryl, e você sempre encontrará amigos na vila de Mornard -  bem como em qualquerlugar onde os bardos cantem sua bravura. Parabéns, você conseguiu!"
    "Fim.História publicada na revista Dragão Brasil Ano 1 número 12 pela Editora Trama.História de Andreas McCullosh & Paladino"
    return
