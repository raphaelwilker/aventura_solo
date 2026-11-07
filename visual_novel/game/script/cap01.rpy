# Capítulo 1 - O Pântano da Agonia

label no_00:
    $ ferido_pescoco = False
    nvl clear
    scene bg_estrada with dissolve
    narrador "As comemorações terminaram e você está a caminho de casa, em uma vila próxima, quando ocorre um encontro inesperado; um viajante está caído à beira da estrada. Suas roupas estão sujas e rasgadas, embora pareçam ter sido de luxuosas outrora. E ele está sendo cruelmente espancado por um bando de ladrões. Cinco deles."
    narrador "Quantidade pequena demais para fazer frente a um guerreiro de Hedryl."
    narrador "A luta é breve. Os assaltantes que não morreram fogem da fúria de sua lâmina. Você devolve a Espada Sagrada à bainha e presta socorro ao viajante caído. Quando ele se recupera, diz que está procurando ajuda para sua vila - que está sendo aterrorizada por um dragão. Um dragão vermelho."
    nvl clear
    narrador "Um dragão vermelho? Pelo visto, o deus Hedryl está colocando você no caminho da justiça mais cedo do que esperava. Sua missão exige a morte de uma criatura tão maligna. A vila ameaçada fica a dois dias de viagem, e você segue para lá."
    narrador "A viagem até a vila não é longa, mas tem sua dose de perigo. Logo você alcança as proximidades do Pântano da Agonia, lugar habitado por todo tipo de horrores rastejantes."
    narrador "Contornar essa região maldita é mais seguro, mas levaria tempo demais - tempo que pode custar a vida de mais vítimas do dragão. Seguir através do pântano, por outro lado, é um convite para saciar o apetite dos predadores que infestam suas águas."
    menu:
        "Agir com cautela e dar a volta ?":
            jump no_01
        "Passar pelo Pântano da Agonia ?":
            jump no_02

label no_01:
    nvl clear
    scene bg_pantano_margem with dissolve
    narrador "Você decide ser cauteloso e continua no caminho, à margem do pântano, seguindo até perto do anoitecer quando pára e improvisa um acampamento, acendendo uma fogueira para manter-se quente e seguro."
    narrador "Depois de algum tempo, quando a escuridão é intensa, ruídos estranhos chegam do pântano. Sua mão voa para o punho da espada. Das sombras começam a surgir seis criaturas corpulentas, escamosas, com olhos amarelos e línguas silvantes."
    narrador "São homens-lagartos, armados com espadas curtas, e parece que procuram briga."
    menu:
        "Lutar ?":
            jump no_03
        "Fugir ?":
            jump no_04

label no_02:
    nvl clear
    scene bg_pantano_dentro with dissolve
    narrador "Preocupado com as pessoas que possam vir a ser mortas pelo dragão, você entra no Pântano da Agonia para ganhar tempo. Caminha através de lama e águas estagnadas até o poente, parando apenas por um instante para acender uma tocha e beliscar um pedaço de carne defumada."
    narrador "Durante essa rápida pausa, ruídos incomuns chegam até você. Passos aproximam-se, sombras movem-se adiante. Da escuridão surgem duas criaturas bípedes, esverdeadas e tremendamente feias: são scrags, os trolls d'água."
    menu:
        "Lutar ?":
            jump no_05
        "Fugir ?":
            jump no_06

label no_03:
    nvl clear
    scene bg_pantano_margem with dissolve
    narrador "Fugir seria tolice. Seis homens-lagartos são uma ameaça séria para um aventureiro qualquer, é verdade... mas você não é um qualquer! É um guerreiro de Hedryl, empunhando uma Espada Sagrada. Contra você esses asquerosos predadores do pântano são menos que NADA!"
    narrador "As abominações escamosas tombam uma a uma sob o ataque de sua lâmina. Tenso demais para dormir, você decide que o Pântano da Agonia não é seguro para um cochilo - e resolve seguir viagem."
    narrador "Após ter se distanciado do Pântano da Agonia, você descansa um pouco. Ora aos deuses, agradecendo sua bondade por permitir que continue vivo - e, em resposta, os poucos ferimentos que recebeu durante a luta curam-se como que por mágica."
    narrador "Mágica dos deuses, você sabe."
    narrador "Ao amanhecer você resolve comer algo e descansar um pouco antes de continuar a viagem. Afinal, sua armadura é de ferro, mas você não"
    nvl clear
    scene bg_encruzilhada with dissolve
    narrador "A viagem continua calma, sem mais nenhum problema relevante, e permanece assim até o meio da tarde. Em certo ponto o caminho se bifurca."
    menu:
        "Ir para a direita.":
            jump no_07
        "Ir para a esquerda.":
            jump no_08

label no_04:
    nvl clear
    scene bg_pantano_margem with dissolve
    narrador "Você se deixa dominar pelo medo e vira-se para fugir."
    narrador "Antes que consiga dar dois passos, contudo, sente uma picada no ombro. Os homens-lagartos estão disparando dardos com zarabatanas, e um deles atingiu-o."
    narrador "Depois de uma curta corrida, você deixa seus lentos perseguidores para trás - mas percebe que seu corpo está ardendo em febre intensa. O dardo estava envenenado, e mesmo sua saúde excepcional não consegue anular a forte toxina que paralisa seu corpo. Ao final de uma hora, todos os seus músculos estão imóveis exceto o coração, que ainda pulsa com dificuldade quando os homens-lagartos finalmente aparecem."
    narrador "É... Você vai ser servido com batatas no jantar!"
    narrador "Fim."
    menu:
        "Recomeçar.":
            jump no_00

label no_05:
    nvl clear
    scene bg_pantano_dentro with dissolve
    narrador "Ao olhar para aqueles horrendos monstros, você se lembra de ter ouvido algo sobre os scrags: eles, como os trolls, temem fogo. Você procura mantê-los afastados com a tocha enquanto procura por um frasco de óleo em sua mochila. Quando encontra, joga-a com toda a sua força contra um dos scrags. Ela se quebra, cobrindo a criatura com óleo inflamável, e basta um toque de sua tocha para fazê-lo arder em chamas."
    narrador "Você se vira para enfrentar o outro scrag, apenas para notar que este foge para a escuridão. Tendo a tocha em uma mão e outro frasco de óleo na outra, você segue viagem."
    narrador "Você continua seguindo, agora mais atento a sons peculiares, até deixar o pântano. Quando está longe, aproveita para descansar um pouco e aliviar suas dores. Já é de manhã e você está longe do Pântano da Agonia."
    nvl clear
    scene bg_encruzilhada with dissolve
    narrador "A viagem continua calma, sem mais nenhum problema relevante, e permanece assim até o meio da tarde. Em certo ponto do caminho se bifurca."
    menu:
        "Ir para a direita.":
            jump no_07
        "Ir para a esquerda.":
            jump no_08

label no_06:
    $ ferido_pescoco = True
    nvl clear
    scene bg_pantano_dentro with dissolve
    narrador "Além de garras e presas temíveis, os scrags, possuem a capacidade de regenerar ferimentos muito rapidamente; suas feridas começam a cicatrizar logo depois de abertas, e membros amputados crescem de novo inteiramente. Mesmo sua Espada Sagrada pode não ser suficiente para matar tais monstros."
    narrador "Você acha mais sensato fugir através do pântano."
    narrador "Quando você julgava ter deixado os scrags para trás, um deles salta sobre você, agarrando-o pelas costas. Você é tomado de horror e tenta livrar-se a todo custo. Seu espadanar desesperado termina por soltá-lo das garras do monstro, e você consegue correr para longe - tendo apenas um arranhão no pescoço. Bem não há problema: guerreiros de Hedryl são imunes a doenças vulgares, e scrags não transmitem qualquer tipo de praga mágica, como licantropia ou coisa parecida."
    nvl clear
    narrador "Você continua seguindo, agora mais atento a sons peculiares, até deixar o pântano. Quando está longe, aproveita para descansar um pouco e aliviar suas dores. Já é de manhã e você está longe do Pântano da Agonia."
    nvl clear
    scene bg_encruzilhada with dissolve
    narrador "A viagem continua calma, sem mais nenhum problema relevante, e permanece assim até o meio da tarde. Em certo ponto do caminho se bifurca."
    menu:
        "Ir para a direita.":
            jump no_07
        "Ir para a esquerda.":
            jump no_08
