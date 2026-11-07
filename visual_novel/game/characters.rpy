# Narrador em modo NVL: o texto ocupa a tela como numa light novel.
# `menu = nvl_menu` desenha as escolhas junto do texto (sem isso o texto some quando o menu aparece).
define narrador = Character(None, kind=nvl)
define config.narrator_menu = True
define menu = nvl_menu

# O template de GUI fixa cada parágrafo NVL em 115 px; parágrafos longos transbordam e se sobrepõem.
# None = altura automática. (gui.rpy usa `init offset = -2`, então este define vence.)
define gui.nvl_height = None
