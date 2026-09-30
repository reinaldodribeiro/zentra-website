import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const PALAVRAS_DE_FORNECEDOR = [
  "solução completa", "soluções sob medida", "potencialize", "alavanque", "impulsione", "eleve",
  "transforme sua", "revolucione", "no mundo de hoje", "cada vez mais", "nada mais é do que",
  "pensando nisso", "venha conhecer", "entre em contato conosco", "excelência", "inovador",
  "disruptivo", "robusto", "sinergia", "expertise", "atendimento diferenciado",
  "qualidade e compromisso", "o melhor custo-benefício",
];
const POSICIONAMENTO_PROIBIDO = [
  "pessoa física", "por cpf", "telefone de qualquer", "ficha da pessoa", "dados de pessoas",
];

function arquivosSob(pasta, extensoes) {
  return readdirSync(pasta).flatMap((nome) => {
    const caminho = join(pasta, nome);
    if (statSync(caminho).isDirectory()) return arquivosSob(caminho, extensoes);
    return extensoes.some((extensao) => nome.endsWith(extensao)) ? [caminho] : [];
  });
}

const arquivos = [
  ...readdirSync("src/content").filter((nome) => nome.endsWith(".ts")).map((nome) => join("src/content", nome)),
  ...arquivosSob("src", [".tsx"]),
];

const falhas = [];

for (const arquivo of arquivos) {
  const texto = readFileSync(arquivo, "utf8");
  const minusculo = texto.toLowerCase();
  if (texto.includes("—")) falhas.push(`${arquivo}: há travessão (em dash)`);
  for (const termo of [...PALAVRAS_DE_FORNECEDOR, ...POSICIONAMENTO_PROIBIDO]) {
    if (minusculo.includes(termo)) falhas.push(`${arquivo}: termo proibido "${termo}"`);
  }
}

const layout = readFileSync("src/app/layout.tsx", "utf8");
if (!layout.includes('lang="pt-BR"')) falhas.push('src/app/layout.tsx: falta lang="pt-BR"');

if (falhas.length) {
  console.error(falhas.map((falha) => `- ${falha}`).join("\n"));
  process.exit(1);
}

console.log("O conteúdo e as páginas passaram nas verificações de idioma e de posicionamento.");
