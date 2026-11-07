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
        advance until screen "choice"

    testcase final_no_30:
        click "Agir com cautela e dar a volta ?"
        advance until screen "choice"
        click "Lutar ?"
        advance until screen "choice"
        click "Ir para a direita."
        advance until screen "choice"
        click "Seguir pelo vale ?"
        advance until screen "choice"
        click "Regeitar ?"
        advance until screen "choice"
        click "Pagar ?"
        advance until screen "choice"
        click "Continuar"
        advance until screen "choice"
        click "Ajudar ?"
        advance until screen "choice"
        click "Entrar pela porta da frente ?"
        advance until screen "choice"
        click "Continuar..."
        advance until eval ("no_30" in visited)
        assert eval ("no_13" in visited and "no_12" not in visited and "no_28" in visited)

    testcase final_no_31:
        click "Agir com cautela e dar a volta ?"
        advance until screen "choice"
        click "Lutar ?"
        advance until screen "choice"
        click "Ir para a direita."
        advance until screen "choice"
        click "Seguir pelo vale ?"
        advance until screen "choice"
        click "Regeitar ?"
        advance until screen "choice"
        click "Pagar ?"
        advance until screen "choice"
        click "Continuar"
        advance until screen "choice"
        click "Ajudar ?"
        advance until screen "choice"
        click "Ir pela entrada secreta ?"
        advance until screen "choice"
        click "Continuar..."
        advance until eval ("no_31" in visited)
        assert eval ("no_29" in visited and "no_28" not in visited)

    testcase flag_ferido_e_recomecar:
        click "Passar pelo Pântano da Agonia ?"
        advance until screen "choice"
        click "Fugir ?"
        advance until screen "choice"
        assert eval (ferido_pescoco)
        click "Ir para a direita."
        advance until screen "choice"
        click "Seguir pelo vale ?"
        advance until eval ("no_12" in visited)
        assert eval ("no_13" not in visited)
        advance until screen "choice"
        click "Recomeçar"
        advance until screen "choice"
        assert eval (not ferido_pescoco)
        $ visited.clear()
        click "Agir com cautela e dar a volta ?"
        advance until screen "choice"
        click "Lutar ?"
        advance until screen "choice"
        click "Ir para a direita."
        advance until screen "choice"
        click "Seguir pelo vale ?"
        advance until eval ("no_13" in visited)
        assert eval ("no_12" not in visited)
