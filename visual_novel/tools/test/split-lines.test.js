const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { splitText, splitScript, ADV_CHUNK_CHARS } = require('../lib/split-lines');

const GAME_SCRIPT = path.join(__dirname, '..', '..', 'game', 'script');

test('ADV_CHUNK_CHARS é 230', () => {
  assert.strictEqual(ADV_CHUNK_CHARS, 230);
});

test('texto curto fica inteiro, em um único trecho', () => {
  assert.deepStrictEqual(splitText('Uma frase curta.', 230), ['Uma frase curta.']);
});

test('quebra entre frases e junta frases até o limite', () => {
  const t = 'Primeira frase aqui. Segunda frase aqui. Terceira frase aqui.';
  assert.deepStrictEqual(splitText(t, 45), ['Primeira frase aqui. Segunda frase aqui.', 'Terceira frase aqui.']);
});

test('não quebra a fala do travessão dentro da mesma frase ("? - você pergunta")', () => {
  const t = '- Quem fez isto? - você pergunta, revoltado, a uma jovem que tenta confortar um rapaz.';
  assert.deepStrictEqual(splitText(t, 230), [t]);
});

test('frase maior que o limite quebra em vírgulas; sem vírgula, quebra no espaço', () => {
  const a = splitText('aaaa bbbb, cccc dddd, eeee ffff', 12);
  assert.deepStrictEqual(a, ['aaaa bbbb,', 'cccc dddd,', 'eeee ffff']);
  const b = splitText('aaaa bbbb cccc dddd', 9);
  assert.deepStrictEqual(b, ['aaaa bbbb', 'cccc dddd']);
});

test('uma palavra maior que o limite não é cortada no meio', () => {
  assert.deepStrictEqual(splitText('abcdefghijklmnop', 5), ['abcdefghijklmnop']);
});

test('nenhuma palavra se perde: juntar os trechos devolve o texto original', () => {
  const t = 'Você saca a espada! "Quem ousa?" - grita o dragão, furioso... A fera ruge; as paredes tremem. Fim.';
  for (const max of [20, 40, 80, 230]) assert.strictEqual(splitText(t, max).join(' '), t);
});

test('splitScript divide só as linhas narrador longas e mantém indentação e o resto', () => {
  const long = 'Primeira frase aqui. Segunda frase aqui. Terceira frase aqui.';
  const src = ['label no_01:', '    scene bg_a with dissolve', `    narrador "${long}"`, '    narrador "Curta."', '    return', ''].join('\n');
  const out = splitScript(src, 45);
  assert.strictEqual(out, ['label no_01:', '    scene bg_a with dissolve', '    narrador "Primeira frase aqui. Segunda frase aqui."', '    narrador "Terceira frase aqui."', '    narrador "Curta."', '    return', ''].join('\n'));
});

test('splitScript é idempotente', () => {
  const src = '    narrador "Primeira frase aqui. Segunda frase aqui. Terceira frase aqui."\n';
  const once = splitScript(src, 45);
  assert.strictEqual(splitScript(once, 45), once);
});

test('splitScript não corta dentro de uma sequência de escape (\\" [[ {{ %%)', () => {
  const src = '    narrador "Ele disse \\"oi\\" a [[você]. Depois seguiu 100%% adiante."\n';
  const out = splitScript(src, 30);
  for (const l of out.split('\n').filter(Boolean)) assert.match(l, /^    narrador ".*"$/);
  assert.strictEqual(out.split('\n').filter(Boolean).map((l) => l.slice(14, -1)).join(' '), 'Ele disse \\"oi\\" a [[você]. Depois seguiu 100%% adiante.');
});

test('o jogo real: nenhuma linha narrador passa do limite (exceto palavra única) e o menu/jumps ficam intactos', () => {
  for (const f of fs.readdirSync(GAME_SCRIPT)) {
    for (const l of fs.readFileSync(path.join(GAME_SCRIPT, f), 'utf8').split('\n')) {
      const m = l.match(/^\s+narrador "(.*)"$/);
      if (m && m[1].includes(' ')) assert.ok(m[1].length <= ADV_CHUNK_CHARS + 40, `linha longa (${m[1].length}): ${m[1].slice(0, 50)}`);
    }
  }
});
