// Divide os parágrafos longos em trechos curtos, para caberem na caixa de texto (modo ADV).
// Nenhuma palavra é alterada: juntar os trechos com um espaço devolve o parágrafo original.
const ADV_CHUNK_CHARS = 230;

// Fim de frase: . ! ? … (com aspas/parêntese opcional) e a próxima frase começa com maiúscula,
// aspas ou travessão seguido de maiúscula. "? - você pergunta" NÃO é fim de frase.
const SENTENCE_SPLIT = /(?<=[.!?…]["»)]?)\s+(?=[A-ZÀ-Ú"«]|[-–—]\s*[A-ZÀ-Ú])/;
const CLAUSE_SPLIT = /(?<=[,;:])\s+/;

function pack(parts, max) {
  const out = [];
  let cur = '';
  for (const p of parts) {
    if (cur && cur.length + 1 + p.length > max) {
      out.push(cur);
      cur = p;
    } else {
      cur = cur ? `${cur} ${p}` : p;
    }
  }
  if (cur) out.push(cur);
  return out;
}

function hardWrap(text, max) {
  return pack(text.split(/\s+/).filter(Boolean), max);
}

function splitText(text, max = ADV_CHUNK_CHARS) {
  const trimmed = text.trim();
  if (trimmed.length <= max) return [trimmed];
  const chunks = [];
  for (const sentence of pack(trimmed.split(SENTENCE_SPLIT), max)) {
    if (sentence.length <= max) {
      chunks.push(sentence);
      continue;
    }
    for (const clause of pack(sentence.split(CLAUSE_SPLIT), max)) {
      if (clause.length <= max) chunks.push(clause);
      else chunks.push(...hardWrap(clause, max));
    }
  }
  return chunks;
}

const SAY = /^(\s+narrador ")(.*)(")$/;

function splitScript(text, max = ADV_CHUNK_CHARS) {
  return text
    .split('\n')
    .flatMap((line) => {
      const m = line.match(SAY);
      if (!m) return [line];
      return splitText(m[2], max).map((chunk) => `${m[1]}${chunk}${m[3]}`);
    })
    .join('\n');
}

module.exports = { ADV_CHUNK_CHARS, splitText, splitScript };
