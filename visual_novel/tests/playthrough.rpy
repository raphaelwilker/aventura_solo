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
        advance until "Agir com cautela e dar a volta ?" timeout 60.0
        click "Agir com cautela e dar a volta ?"
        advance until "Lutar ?" timeout 60.0
        click "Lutar ?"
        advance until "Ir para a direita." timeout 60.0
        click "Ir para a direita."
        advance until "Seguir pelo vale ?" timeout 60.0
        click "Seguir pelo vale ?"
        advance until "Rejeitar ?" timeout 60.0
        click "Rejeitar ?"
        advance until "Pagar ?" timeout 60.0
        click "Pagar ?"
        advance until "Continuar" timeout 60.0
        click "Continuar"
        advance until "Ajudar ?" timeout 60.0
        click "Ajudar ?"
        advance until "Entrar pela porta da frente ?" timeout 60.0
        click "Entrar pela porta da frente ?"
        advance until "Continuar..." timeout 60.0
        click "Continuar..."
        advance until eval ("no_30" in visited) timeout 60.0
        assert eval ("no_13" in visited and "no_12" not in visited and "no_28" in visited)

    testcase final_no_31:
        advance until "Agir com cautela e dar a volta ?" timeout 60.0
        click "Agir com cautela e dar a volta ?"
        advance until "Lutar ?" timeout 60.0
        click "Lutar ?"
        advance until "Ir para a direita." timeout 60.0
        click "Ir para a direita."
        advance until "Seguir pelo vale ?" timeout 60.0
        click "Seguir pelo vale ?"
        advance until "Rejeitar ?" timeout 60.0
        click "Rejeitar ?"
        advance until "Pagar ?" timeout 60.0
        click "Pagar ?"
        advance until "Continuar" timeout 60.0
        click "Continuar"
        advance until "Ajudar ?" timeout 60.0
        click "Ajudar ?"
        advance until "Ir pela entrada secreta ?" timeout 60.0
        click "Ir pela entrada secreta ?"
        advance until "Continuar..." timeout 60.0
        click "Continuar..."
        advance until eval ("no_31" in visited) timeout 60.0
        assert eval ("no_29" in visited and "no_28" not in visited)

    testcase flag_ferido_e_recomecar:
        advance until "Passar pelo Pântano da Agonia ?" timeout 60.0
        click "Passar pelo Pântano da Agonia ?"
        advance until "Fugir ?" timeout 60.0
        click "Fugir ?"
        assert eval (ferido_pescoco)
        advance until "Ir para a direita." timeout 60.0
        click "Ir para a direita."
        advance until "Seguir pelo vale ?" timeout 60.0
        click "Seguir pelo vale ?"
        advance until eval ("no_12" in visited) timeout 60.0
        assert eval ("no_13" not in visited)
        advance until "Recomeçar" timeout 60.0
        click "Recomeçar"
        assert eval (not ferido_pescoco)
        $ visited.clear()
        advance until "Agir com cautela e dar a volta ?" timeout 60.0
        click "Agir com cautela e dar a volta ?"
        advance until "Lutar ?" timeout 60.0
        click "Lutar ?"
        advance until "Ir para a direita." timeout 60.0
        click "Ir para a direita."
        advance until "Seguir pelo vale ?" timeout 60.0
        click "Seguir pelo vale ?"
        advance until eval ("no_13" in visited) timeout 60.0
        assert eval ("no_12" not in visited)
