# Cenários provisórios: uma cor lisa com o nome do cenário, até existir a imagem.
# Para trocar por arte: salve a imagem em game/images/ com o mesmo nome (ex.: bg_estrada.jpg).
# Se o arquivo existir (jpg, jpeg, png ou webp), este provisório é ignorado. Gerado por tools/scenes-file.js.
init python:
    _PLACEHOLDERS = {
        "bg_estrada": "#8c7b52",
        "bg_encruzilhada": "#7d8a5a",
        "bg_pantano_margem": "#2f3b36",
        "bg_pantano_dentro": "#3d4a2f",
        "bg_montanha_distante": "#5f7a93",
        "bg_trilha_montanha": "#6b6258",
        "bg_desmoronamento": "#7a5f4d",
        "bg_desfiladeiro": "#8a6a52",
        "bg_vale": "#b08a4a",
        "bg_campo_batalha": "#4b4147",
        "bg_rio_ponte": "#4f7a8a",
        "bg_rio_jangada": "#3f6f86",
        "bg_estalagem": "#6b4a2f",
        "bg_quarto": "#5a4056",
        "bg_estabulo": "#3d3a2e",
        "bg_mornard": "#3a2f2f",
        "bg_colina_templo": "#5a5f66",
        "bg_templo_interior": "#2e2540",
        "bg_templo_corredor": "#1f2a2e",
        "bg_final_ceu": "#c9b36a",
        "bg_final_vila": "#8aa05a",
    }
    for _nome, _cor in _PLACEHOLDERS.items():
        if not any(renpy.loadable("images/%s.%s" % (_nome, _ext)) for _ext in ("jpg", "jpeg", "png", "webp")):
            renpy.image(_nome, Fixed(Solid(_cor), Text(_nome, size=22, color="#ffffff66", xalign=0.5, yalign=0.03), xfill=True, yfill=True))
