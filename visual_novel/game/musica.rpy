# Música. Cada nó da história chama tocar_musica("mus_..."); a lista de faixas está em docs/lista-de-musicas.md.
# Para colocar uma faixa: salve o arquivo em game/audio/ com o nome exato (ex.: mus_viagem.ogg; também vale
# opus, mp3, flac ou wav). Sem o arquivo, o jogo fica em silêncio naquele ponto, sem erro.
default musica_atual = None

init python:
    EXTENSOES_AUDIO = ("ogg", "opus", "mp3", "flac", "wav")

    def arquivo_de_musica(faixa):
        for ext in EXTENSOES_AUDIO:
            caminho = "audio/%s.%s" % (faixa, ext)
            if renpy.loadable(caminho):
                return caminho
        return None

    def tocar_musica(faixa):
        # Mesma faixa em nós seguidos continua tocando, sem reiniciar.
        if store.musica_atual == faixa:
            return
        store.musica_atual = faixa
        arquivo = arquivo_de_musica(faixa)
        if arquivo:
            renpy.music.play(arquivo, channel="music", loop=True, fadein=1.5, fadeout=1.5)
        else:
            renpy.music.stop(channel="music", fadeout=1.5)

    # Música da tela inicial (só toca se o arquivo existir).
    if arquivo_de_musica("mus_titulo"):
        config.main_menu_music = arquivo_de_musica("mus_titulo")
