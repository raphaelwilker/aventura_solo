// Regras por nó que o JSON expressa só em texto.
// sets: atribui uma flag ao entrar no nó. branch: troca o menu por um desvio automático.
const NODE_RULES = {
  0: { sets: { ferido_pescoco: false } },
  6: { sets: { ferido_pescoco: true } },
  10: { branch: { flag: 'ferido_pescoco', ifTrue: 12, ifFalse: 13 } },
};

module.exports = { NODE_RULES };
