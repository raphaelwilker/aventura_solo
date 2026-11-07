# Testes de playthrough (somente para verificação; nao fazem parte do jogo).
init python:
    visited = []
    def _registra_label(name, abnormal):
        visited.append(name)
    config.label_callback = _registra_label

define _test.timeout = 60.0

testsuite playthrough:
    before testcase:
        $ visited.clear()
        run Jump("no_00")

    testcase final_no_30:
        advance until "Agir com cautela e dar a volta ?"
        click "Agir com cautela e dar a volta ?"
        advance until "Lutar ?"
        click "Lutar ?"
        advance until "Ir para a direita."
        click "Ir para a direita."
        advance until "Seguir pelo vale ?"
        click "Seguir pelo vale ?"
        advance until "Rejeitar ?"
        click "Rejeitar ?"
        advance until "Pagar ?"
        click "Pagar ?"
        advance until "Continuar"
        click "Continuar"
        advance until "Ajudar ?"
        click "Ajudar ?"
        advance until "Entrar pela porta da frente ?"
        click "Entrar pela porta da frente ?"
        advance until "Continuar..."
        click "Continuar..."
        advance until eval ("no_30" in visited)
        assert eval ("no_13" in visited and "no_12" not in visited and "no_28" in visited)

    testcase final_no_31:
        advance until "Agir com cautela e dar a volta ?"
        click "Agir com cautela e dar a volta ?"
        advance until "Lutar ?"
        click "Lutar ?"
        advance until "Ir para a direita."
        click "Ir para a direita."
        advance until "Seguir pelo vale ?"
        click "Seguir pelo vale ?"
        advance until "Rejeitar ?"
        click "Rejeitar ?"
        advance until "Pagar ?"
        click "Pagar ?"
        advance until "Continuar"
        click "Continuar"
        advance until "Ajudar ?"
        click "Ajudar ?"
        advance until "Ir pela entrada secreta ?"
        click "Ir pela entrada secreta ?"
        advance until "Continuar..."
        click "Continuar..."
        advance until eval ("no_31" in visited)
        assert eval ("no_29" in visited and "no_28" not in visited)

    testcase flag_ferido_e_recomecar:
        advance until "Passar pelo Pântano da Agonia ?"
        click "Passar pelo Pântano da Agonia ?"
        advance until "Fugir ?"
        click "Fugir ?"
        assert eval (ferido_pescoco)
        advance until "Ir para a direita."
        click "Ir para a direita."
        advance until "Seguir pelo vale ?"
        click "Seguir pelo vale ?"
        advance until eval ("no_12" in visited)
        assert eval ("no_13" not in visited)
        advance until "Recomeçar"
        click "Recomeçar"
        assert eval (not ferido_pescoco)
        $ visited.clear()
        advance until "Agir com cautela e dar a volta ?"
        click "Agir com cautela e dar a volta ?"
        advance until "Lutar ?"
        click "Lutar ?"
        advance until "Ir para a direita."
        click "Ir para a direita."
        advance until "Seguir pelo vale ?"
        click "Seguir pelo vale ?"
        advance until eval ("no_13" in visited)
        assert eval ("no_12" not in visited)
