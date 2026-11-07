# Capítulo 2 - A Estrada, o Desfiladeiro e o Rio

label no_07:
    nvl clear
    scene bg_estalagem with dissolve
    narrador "A jornada pelo caminho da direita é tranquila. Uma estalagem surge ao longe, e você apressa o passo - imaginando quão bom será comer uma refeição quente e dormir em uma cama macia. Você consegue um quarto, devora um grande pedaço de carne (felizmente sua ordem não exige dieta vegetariana), lava-se e vai dormir."
    nvl clear
    scene bg_montanha_distante with dissolve
    narrador "Pela manhã, após um rápido desjejum, você retoma o caminho da vila de Terum. A estrada bifurca-se novamente logo adiante: o caminho da direita segue sobre uma montanha, e o da esquerda passa por um vale que contorna a montanha."
    menu:
        "Seguir pela montanha ?":
            jump no_09
        "Seguir pelo vale ?":
            jump no_10

label no_08:
    nvl clear
    scene bg_desfiladeiro with dissolve
    narrador "O caminho da esquerda leva você a um gigantesco desfiladeiro. A fenda é enorme, e não há como chegar ao outro lado. Irritado pela perda de tempo, você volta para a encruzilhada e toma o caminho da direita."
    menu:
        "Continuar.":
            jump no_07

label no_09:
    nvl clear
    scene bg_trilha_montanha with dissolve
    narrador "O caminho da montanha pareceu mais atraente. Seguindo por uma trilha que passa entre as rochas, sob sombras refrescantes, você pensa em como seria penosa a caminhada pelo vale castigado pelo sol. Mas a trilha rochosa também apresenta suas desvantagens, como você descobre logo a seguir: vindo de uma caverna próxima, um urro poderoso anuncia a chegada de um enorme urso cinzento."
    narrador "A fera aproxima-se nas patas de trás, pronta a golpear com suas garras negras. Você saca a Espada Sagrada, mas entende que o animal apenas tenta proteger sua toca - talvez seja até mesmo uma fêmea com filhotes -, e não deseja matá-lo. A este pensamento, a lâmina emite uma luz intensa que fere os olhos do urso, afugentando-o."
    narrador "Agradecendo aos deuses por uma solução pacífica para seu dilema, você segue em frente."
    nvl clear
    scene bg_desmoronamento with dissolve
    narrador "Depois de afugentar o urso, você continua pela trilha que singra a montanha. Em certo ponto é obrigado a parar: parte do caminho foi destruída por um desmoronamento."
    narrador "A escalada parece possível, embora perigosa."
    menu:
        "Escalar?":
            jump no_11
        "Voltar e seguir pelo vale?":
            jump no_10

label no_10:
    nvl clear
    scene bg_vale with dissolve
    narrador "O sol castiga você enquanto cruza o vale, fazendo-o pensar se não seria preferível ir pela montanha. A dúvida transforma-se em certeza quando, após algumas horas, você penetra em um antigo campo de batalha: uma clareira cheia de armaduras enferrujadas, armas quebradas e ossos humanos."
    nvl clear
    scene bg_campo_batalha with dissolve
    narrador "Você reza pelas almas desses guerreiros enquanto atravessa a clareira. Em certo momento, coisas movem-se no chão. A princípio você pensa se tratar de bichos escondidos nas carcaças, mas então você percebe: são as próprias carcaças. Os mortos estão se levantando para atacar você."
    if ferido_pescoco:
        jump no_12
    else:
        jump no_13

label no_11:
    nvl clear
    scene bg_desmoronamento with dissolve
    narrador "Julgando que o risco da escalada vale a pena, você avança. Sobe devagar, procurando saliências firmes para se apoiar, sofrendo com o peso da armadura. No caminho até o topo, o inesperado acontece: sua bolsa de moedas cai, e rola até alguns metros abaixo de onde você está."
    menu:
        "Voltar e recuperar a bolsa.":
            jump no_14
        "Esquecer e continuar escalando.":
            jump no_15

label no_12:
    nvl clear
    scene bg_campo_batalha with dissolve
    narrador "Você leva a mão ao pescoço, em busca de seu símbolo sagrado - o pequeno medalhão que poderá canalizar sua fé e esconjurar os mortos-vivos. Não encontra: deve ter sido arrancado no momento em que o scrag agarrou-o no pescoço."
    narrador "Agora só resta lutar. À medida que os mortos-vivos se aproximam, você começa a brandir sua espada. A lâmina sagrada transforma-os em pedaços facilmente - mas, para cada um que cai, dez outros se levantam. A luta incessante esgota suas forças, e os cadáveres acabam alcançando-o. Você sucumbe ao ataque de suas garras."
    narrador "Fim."
    menu:
        "Recomeçar":
            jump no_00

label no_13:
    nvl clear
    scene bg_campo_batalha with dissolve
    narrador "Com a aproximação dos putrefatos mortos-vivos, você busca o pequeno medalhão de prata em formato de espada, o símbolo da justiça de Hedryl. Com uma prece, você pede a seu deus que afaste as criaturas malditas."
    narrador "Os cadáveres parecem espantados com a visão da pequena espada. Alguns emitem gritos sufocados e desmancham-se em pó, enquanto outros somem na escuridão. Agora é seguro prosseguir."
    nvl clear
    scene bg_rio_ponte with dissolve
    narrador "Sua viagem é interrompida por um rio com cerca de 50 metros de largura. Sua armadura proíbe qualquer tentativa de cruzá-lo a nado. Há uma ponte nas proximidades, mas ela parece velha e fraca demais para suportar um guerreiro pesadamente equipado."
    narrador "Enquanto você examina a ponte, uma pequena jangada aproxima-se. Seu ocupante é um homem de pele escura que tira o chapéu de palha e o cumprimenta-o com um sorriso de dentes falhos:"
    nvl clear
    narrador "- Não se arrisque nessa ponte apodrecida senhor. Por duas peças de cobre, posso levá-lo à outra margem em minha jangada."
    menu:
        "Aceitar ?":
            jump no_16
        "Rejeitar ?":
            jump no_17

label no_14:
    nvl clear
    scene bg_desmoronamento with dissolve
    narrador "Na tentativa de recuperar seu dinheiro, você experimenta descer um pouco a encosta - quando olha para baixo e descobre que é uma queda imensa! Não se trata apenas da distância entre você e a trilha, porque você está em um lugar diferente e corre o risco de rolar centenas de metros montanha abaixo. O risco é maior do que supunha."
    menu:
        "Desistir ?":
            jump no_15
        "Continuar tentando ?":
            jump no_19

label no_15:
    nvl clear
    scene bg_desmoronamento with dissolve
    narrador "Você se recorda os ensinamentos dos clérigos de sua ordem, sobre como a ganância sempre leva à ruína."
    narrador "Arriscar-se por algumas moedas não seria sábio. Você esquece a bolsa e completa a escalada atravessando o desmoronamento em segurança e retornando à trilha."
    narrador "Você continua no caminho até que, restando apenas alguns minutos para o pôr-do-sol, avista uma estalagem e segue para lá."
    nvl clear
    scene bg_estalagem with dissolve
    narrador "A estalagem é quente e acolhedora. Você se senta em uma mesa próxima à lareira, e uma rapariga serve-lhe um prato de sopa fumegante. Antes que você possa dizer qualquer coisa, um homem baixo e de grandes bigodes apresenta-se como Stew, o dono do estabelecimento. Diz que a sopa é por conta da casa, e que um quarto, comida e um banhão custarão quatro peças de cobre."
    menu:
        "Revelar sua missão ?":
            jump no_22
        "Falar que não tem dinheiro ?":
            jump no_23

label no_16:
    nvl clear
    scene bg_rio_jangada with dissolve
    narrador "Você entrega algumas moedas ao homem, que coloca a jangada em movimento. Quando estão no meio do rio, contudo, o jangadeiro exibe um sorriso matreiro:"
    narrador "- Agora, amigo, se quiser chegar à outra margem com vida, irá entregar-me todo o seu dinheiro."
    menu:
        "Entregar todo o dinheiro.":
            jump no_18
        "Recusar ?":
            jump no_20

label no_17:
    nvl clear
    scene bg_rio_ponte with dissolve
    narrador "Você olha melhor para a ponte, e acha que ela não irá desabar sob os pés de um servo dos deuses. Agradecendo ao jangadeiro pela oferta, você declina e segue pela ponte. Ela range um pouco em protesto, mas cumpre seu papel; você chega ao outro lado em segurança."
    narrador "O rio e a ponte foram deixados para trás. A noite cairá logo. As luzes de uma taverna podem ser vistas ao longe, e você segue para lá."
    nvl clear
    scene bg_estalagem with dissolve
    narrador "A estalagem é quente e acolhedora. Você se senta em uma mesa próxima à lareira, e uma rapariga serve-lhe um prato de sopa fumegante. Antes que você possa dizer qualquer coisa, um homem baixo e de grandes bigodes apresenta-se como Stew, o dono do estabelecimento. Diz que a sopa é por conta da casa, e que um quarto, comida e um banhão custarão quatro peças de cobre."
    menu:
        "Pagar ?":
            jump no_24
        "Revelar sua missão ?":
            jump no_22
        "Falar que não tem dinheiro ?":
            jump no_21

label no_18:
    nvl clear
    scene bg_rio_jangada with dissolve
    narrador "Você analisa sua situação: está no meio de um rio, em uma frágil jangada, que pode desmanchar-se se tentar um combate. Sua armadura faria com que afundasse feito pedra. Dando de ombros, você entrega a bolsa. O jangadeiro sorri em aprovação e prossegue remando."
    narrador "Quando estão próximos da margem, um remo atinge suas costas e derruba você na água. Felizmente a água não é profunda aqui - mas, quando consegue se levantar, o jangadeiro já está longe. Você amaldiçoa sua tolice, prometendo a si mesmo que, depois do dragão, esse assaltante será o próximo a provar a justiça de Hedryl."
    narrador "A viagem segue tranquila. Quando o sol aproxima-se do horizonte, você vê uma estalagem e segue sua direção."
    nvl clear
    scene bg_estalagem with dissolve
    narrador "A estalagem é quente e acolhedora. Você se senta em uma mesa próxima à lareira, e uma rapariga serve-lhe um prato de sopa fumegante. Antes que você possa dizer qualquer coisa, um homem baixo e de grandes bigodes apresenta-se como Stew, o dono do estabelecimento. Diz que a sopa é por conta da casa, e que um quarto, comida e um banhão custarão quatro peças de cobre."
    menu:
        "Revelar sua missão ?":
            jump no_22
        "Falar que não tem dinheiro ?":
            jump no_23

label no_19:
    nvl clear
    scene bg_desmoronamento with dissolve
    narrador "Você continua descendo em busca de seus pertences, mas a armadura é desajeitada para alpinismo. Em certo ponto você perde o apoio e cai. Pois é, você esqueceu os ensinamentos de sua ordem, e deixou que a ganância fosse maior que a prudência. Seu cadáver arrebentado servirá de alimento para abutres e hienas."
    menu:
        "Recomeçar":
            jump no_00

label no_20:
    nvl clear
    scene bg_rio_jangada with dissolve
    narrador "Você ri do jangadeiro, perguntando se é alguma brincadeira. Quando entende que não receberá dinheiro algum, o assaltante empurra você com um movimento rápido do remo. O peso da armadura desequilibra você, fazendo com que caia na água e afunde."
    narrador "Afogamento. Que triste fim para um guerreiro de Hedryl..."
    narrador "Fim."
    menu:
        "Recomeçar":
            jump no_00

label no_21:
    nvl clear
    scene bg_rio_jangada with dissolve
    narrador "Você ri do jangadeiro, perguntando se é alguma brincadeira. Quando entende que não receberá dinheiro algum, o assaltante empurra você com um movimento rápido do remo. O peso da armadura desequilibra você, fazendo com que caia na água e afunde."
    narrador "Afogamento. Que triste fim para um guerreiro de Hedryl..."
    narrador "Fim."
    menu:
        "Recomeçar":
            jump no_00

label no_22:
    nvl clear
    scene bg_estalagem with dissolve
    narrador "Você aceita a sopa, mas diz que não pode pagar. Quando o estalajadeiro pergunta o que alguém faz sem dinheiro em um lugar como aquele, você fala sobre sua caça ao dragão que ameaça a vila de Mornard."
    narrador "- Um guerreiro de Hedryl! - espanta-se o pequeno Stew. - Não se preocupe com o dinheiro, nobre herói. Será uma honra ajudá-lo em sua missão sagrada, especialmente se puder livrar Mornard daquele monstro ganancioso. Ele está arruinando meus negócios!"
    narrador "Stew revela que o dragão instalou-se na vila recentemente, passando a tomar dinheiro dos habitantes. Agora, contudo, parecia ter se cansado da simples extorsão e massacrava sem piedade."
    nvl clear
    scene bg_quarto with dissolve
    narrador "Você agradece a Stew pelas informações e pela lauta refeição que ele prepara. Quando termina de comer e vai para seu quarto, encontra a rapariga que serviu-lhe a sopa: ela está preparando seu banho, derramando um balde de água quente em uma bacia."
    nvl clear
    narrador "- Precisa estar descansado para a batalha que virá, senhor - diz ela, com os olhos baixos. - Se me permitir essa honra, gostaria de banhá-lo e aquecê-lo durante a noite."
    narrador "Você tenta convencer a jovem de que não é digno de tanta dedicação, que está meramente cumprindo seu dever sagrado - mas, depois de alguma conversa, descobre que os pais dela viviam em Mornard e foram mortos pelo monstro. Ela deseja intensamente fazer qualquer coisa para colaborar com a morte da fera."
    narrador "Concluindo que não seria justo negar esse desejo à jovem, você concorda. Ela te banha e você adormece, na manhã seguinte você é um guerreiro revigorado, disposto a matar mil dragões."
    narrador "A vila de Mornard está logo adiante."
    menu:
        "Continuar":
            jump no_25

label no_23:
    nvl clear
    scene bg_estalagem with dissolve
    narrador "Você aceita a sopa, mas diz que não pode pagar. Quando o estalajadeiro pergunta o que alguém faz sem dinheiro em um lugar como aquele, você responde; a missão de um guerreiro de Hedryl não diz respeito a qualquer um."
    nvl clear
    scene bg_estabulo with dissolve
    narrador "O estalajadeiro fecha a cara. Diz que não faz caridade, e mostra-lhe a porta. Sem alternativa, você deixa a estalagem e procura um lugar para dormir no estábulo. A noite é longa e fria, mas você consegue dormir, e segue para a vila ameaçada na manhã seguinte."
    menu:
        "Continuar":
            jump no_25

label no_24:
    nvl clear
    scene bg_estalagem with dissolve
    narrador "Você saca quatro moedas da bolsa e entrega ao estalajadeiro, que retira-se com um sorriso. Pouco depois, a rapariga retorna com vinho e um grande pedaço de carne de javali. Você come até fartar-se (pedindo perdão aos deuses pela gula, claro) e retira-se para seu quarto, onde encontra uma bacia de água quente para seu banho. Limpo e alimentado, você faz suas orações e desaba na cama, entregue aos deuses dos sonhos."
    narrador "Pela manhã você abandona a estalagem e coloca-se a caminho de Mornard."
    menu:
        "Continuar":
            jump no_25
