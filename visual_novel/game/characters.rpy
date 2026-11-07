# Narrador em modo ADV: o texto aparece numa caixa larga na parte de baixo da tela,
# com o cenário visível por cima (como numa visual novel clássica).
define narrador = Character(None)

# Caixa de texto: tamanho e posição do texto dentro dela. O template de GUI usa `init offset = -2`,
# então estes defines (offset 0) valem no lugar dos dele.
define gui.textbox_height = 190
define gui.dialogue_xpos = 50
define gui.dialogue_ypos = 28
define gui.dialogue_width = 1020
define gui.text_size = 24

# A caixa: larga, centralizada, um pouco acima da borda (para o menu rápido ficar embaixo),
# num marrom-escuro translúcido que deixa o cenário aparecer.
style window:
    xalign 0.5
    xfill False
    yalign 0.92
    ysize gui.textbox_height
    background Solid("#1a120ccc")
    xsize 1120

# Contorno leve para o texto branco continuar legível sobre cenários claros.
style say_dialogue:
    outlines [ (1, "#000000b0", 0, 1) ]

# O cinza do template deixa as opções do menu apagadas sobre a imagem do cenário.
style choice_button_text:
    idle_color "#f0f0f0"
    hover_color "#ffd479"

# Menu rápido no rodapé (Back, History, Skip...): branco com contorno, para ler sobre qualquer cenário.
style quick_button_text:
    idle_color "#ffffff"
    hover_color "#ffd479"
    outlines [ (1, "#000000c0", 0, 1) ]
