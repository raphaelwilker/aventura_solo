# Tela inicial: ilustração de abertura em tela cheia, título à esquerda e menu em português.
# Para trocar o título do jogo, edite só estas duas linhas:
define titulo_jogo = "Aventura Solo"
define subtitulo_jogo = "Uma aventura solo"

style titulo_jogo_texto is text:
    size 68
    color "#ffffff"
    outlines [ (3, "#000000b0", 0, 2) ]
    line_spacing -6

style titulo_subtitulo_texto is text:
    size 26
    color "#ffd479"
    outlines [ (2, "#000000b0", 0, 1) ]

style titulo_botao is button:
    background None
    hover_background None
    padding (0, 6)

style titulo_botao_texto is button_text:
    size 40
    idle_color "#f0f0f0"
    hover_color "#ffd479"
    outlines [ (2, "#000000b0", 0, 1) ]

screen main_menu():
    tag menu

    add "bg_titulo"
    add "titulo_degrade"

    vbox:
        xpos 70
        ypos 70
        spacing 10
        text titulo_jogo style "titulo_jogo_texto" xmaximum 560
        text subtitulo_jogo style "titulo_subtitulo_texto"

    vbox:
        xpos 80
        yalign 0.82
        spacing 14

        textbutton "Iniciar" action Start() style "titulo_botao" text_style "titulo_botao_texto"
        textbutton "Continuar" action ShowMenu("load") style "titulo_botao" text_style "titulo_botao_texto"
        textbutton "Opções" action ShowMenu("preferences") style "titulo_botao" text_style "titulo_botao_texto"
        textbutton "Sobre" action ShowMenu("about") style "titulo_botao" text_style "titulo_botao_texto"

        if renpy.variant("pc"):
            textbutton "Sair" action Quit(confirm=not main_menu) style "titulo_botao" text_style "titulo_botao_texto"

    text "v[config.version]" xalign 1.0 yalign 1.0 xoffset -24 yoffset -16 size 18 color "#ffffffaa"
