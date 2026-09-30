import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const PALAVRAS_DE_FORNECEDOR = [
  'solução completa', 'soluções sob medida', 'potencialize', 'alavanque', 'impulsione', 'eleve',
  'transforme sua', 'revolucione', 'no mundo de hoje', 'cada vez mais', 'nada mais é do que',
  'pensando nisso', 'venha conhecer', 'entre em contato conosco', 'excelência', 'inovador',
  'disruptivo', 'robusto', 'sinergia', 'expertise', 'atendimento diferenciado',
  'qualidade e compromisso', 'o melhor custo-benefício',
];
const POSICIONAMENTO_PROIBIDO = ['pessoa física', 'por cpf', 'telefone de qualquer', 'ficha da pessoa', 'dados de pessoas'];

const falhas = [];

for (const arquivo of readdirSync('api').filter((nome) => nome.endsWith('.js'))) {
  execFileSync(process.execPath, ['--check', `api/${arquivo}`]);
}

if (!existsSync('index.html')) {
  console.log('index.html ainda não existe; só a função de contato foi verificada.');
  process.exit(0);
}

const html = readFileSync('index.html', 'utf8');
const minusculo = html.toLowerCase();

if (!html.includes('<html lang="pt-BR"')) falhas.push('falta lang="pt-BR" no <html>');
if (!/<meta charset="utf-8"/i.test(html)) falhas.push('falta <meta charset="utf-8">');
if (html.includes('—')) falhas.push('há travessão (em dash) no texto');
for (const termo of [...PALAVRAS_DE_FORNECEDOR, ...POSICIONAMENTO_PROIBIDO]) {
  if (minusculo.includes(termo)) falhas.push(`termo proibido no texto: "${termo}"`);
}

if (falhas.length) {
  console.error(falhas.map((falha) => `- ${falha}`).join('\n'));
  process.exit(1);
}

console.log('index.html passou nas verificações de idioma e de posicionamento.');
