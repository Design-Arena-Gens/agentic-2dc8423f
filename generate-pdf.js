import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 }
});

doc.pipe(fs.createWriteStream('apostila-matematica.pdf'));

// Função para desenhar uma caixa
function drawBox(doc, x, y, width, height, color = '#e8f4f8') {
  doc.rect(x, y, width, height)
     .fillAndStroke(color, '#3498db')
     .stroke();
}

// Função para adicionar título
function addTitle(doc, text, y) {
  doc.fontSize(24)
     .fillColor('#2c3e50')
     .font('Helvetica-Bold')
     .text(text, 50, y, { align: 'center', width: 495 });
}

// Função para adicionar subtítulo
function addSubtitle(doc, text, y) {
  doc.fontSize(18)
     .fillColor('#34495e')
     .font('Helvetica-Bold')
     .text(text, 50, y);
}

// Função para adicionar texto normal
function addText(doc, text, y, options = {}) {
  doc.fontSize(12)
     .fillColor('#2c3e50')
     .font('Helvetica')
     .text(text, 50, y, { width: 495, align: 'justify', ...options });
}

// CAPA
doc.rect(0, 0, 595, 842).fill('#3498db');
doc.fontSize(36)
   .fillColor('white')
   .font('Helvetica-Bold')
   .text('MATEMÁTICA', 50, 200, { align: 'center', width: 495 });

doc.fontSize(28)
   .text('As 4 Operações Fundamentais', 50, 260, { align: 'center', width: 495 });

doc.fontSize(20)
   .text('com Números Naturais', 50, 310, { align: 'center', width: 495 });

// Ilustração na capa (números)
doc.fontSize(80)
   .fillColor('#ecf0f1')
   .text('+ - × ÷', 50, 400, { align: 'center', width: 495 });

doc.fontSize(14)
   .fillColor('white')
   .font('Helvetica')
   .text('Apostila Didática Ilustrada', 50, 700, { align: 'center', width: 495 });

// PÁGINA 2 - ÍNDICE
doc.addPage();
addTitle(doc, 'ÍNDICE', 50);

doc.fontSize(14)
   .fillColor('#2c3e50')
   .font('Helvetica');

let yPos = 120;
const indice = [
  '1. Introdução aos Números Naturais ........................... 3',
  '2. Adição ................................................................ 4',
  '3. Subtração .......................................................... 6',
  '4. Multiplicação ..................................................... 8',
  '5. Divisão .............................................................. 10',
  '6. Exercícios ......................................................... 12'
];

indice.forEach(item => {
  doc.text(item, 80, yPos);
  yPos += 30;
});

// PÁGINA 3 - INTRODUÇÃO
doc.addPage();
addTitle(doc, '1. NÚMEROS NATURAIS', 50);

yPos = 120;
addText(doc, 'Os números naturais são os números que usamos para contar: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12...', yPos);

yPos += 60;
addSubtitle(doc, 'Conjunto dos Números Naturais:', yPos);

yPos += 40;
doc.fontSize(16)
   .fillColor('#e74c3c')
   .font('Helvetica-Bold')
   .text('ℕ = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...}', 50, yPos, { align: 'center', width: 495 });

yPos += 60;
doc.fontSize(12)
   .fillColor('#2c3e50')
   .font('Helvetica')
   .text('Os números naturais são infinitos e sempre podemos adicionar mais 1 para obter o próximo número.', 50, yPos, { width: 495, align: 'justify' });

yPos += 80;
addSubtitle(doc, 'As 4 Operações Fundamentais:', yPos);

yPos += 40;
// Caixas coloridas para cada operação
const operations = [
  { name: 'ADIÇÃO (+)', color: '#2ecc71', desc: 'Juntar ou somar' },
  { name: 'SUBTRAÇÃO (−)', color: '#e74c3c', desc: 'Tirar ou diminuir' },
  { name: 'MULTIPLICAÇÃO (×)', color: '#f39c12', desc: 'Somar repetidamente' },
  { name: 'DIVISÃO (÷)', color: '#9b59b6', desc: 'Repartir igualmente' }
];

operations.forEach((op, i) => {
  const boxY = yPos + (i * 60);
  doc.roundedRect(70, boxY, 220, 45, 5)
     .fillAndStroke(op.color, op.color);

  doc.fontSize(14)
     .fillColor('white')
     .font('Helvetica-Bold')
     .text(op.name, 80, boxY + 8, { width: 200 });

  doc.fontSize(10)
     .font('Helvetica')
     .text(op.desc, 80, boxY + 26, { width: 200 });

  doc.roundedRect(310, boxY, 220, 45, 5)
     .fillAndStroke(op.color + '40', op.color);
});

// PÁGINA 4 - ADIÇÃO
doc.addPage();
addTitle(doc, '2. ADIÇÃO', 50);

yPos = 120;
addText(doc, 'A adição é a operação que junta dois ou mais números. O resultado da adição é chamado de SOMA.', yPos);

yPos += 60;
doc.roundedRect(150, yPos, 295, 60, 5)
   .fillAndStroke('#d5f4e6', '#27ae60');

doc.fontSize(16)
   .fillColor('#27ae60')
   .font('Helvetica-Bold')
   .text('PARCELA  +  PARCELA  =  SOMA', 150, yPos + 20, { width: 295, align: 'center' });

yPos += 90;
addSubtitle(doc, 'Exemplo Ilustrado:', yPos);

yPos += 40;
// Desenhar maçãs
doc.fontSize(40).fillColor('#e74c3c').text('🍎 🍎 🍎', 80, yPos);
doc.fontSize(20).fillColor('#2c3e50').text('+', 230, yPos + 10);
doc.fontSize(40).fillColor('#e74c3c').text('🍎 🍎', 280, yPos);
doc.fontSize(20).fillColor('#2c3e50').text('=', 400, yPos + 10);
doc.fontSize(40).fillColor('#e74c3c').text('🍎 🍎 🍎 🍎 🍎', 100, yPos + 60);

yPos += 130;
doc.fontSize(16)
   .fillColor('#27ae60')
   .font('Helvetica-Bold')
   .text('3 + 2 = 5', 50, yPos, { align: 'center', width: 495 });

yPos += 60;
addSubtitle(doc, 'Propriedades da Adição:', yPos);

yPos += 35;
doc.fontSize(11)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('• Comutativa: ', 70, yPos);
doc.font('Helvetica')
   .text('a ordem não altera a soma → 3 + 5 = 5 + 3 = 8', 165, yPos);

yPos += 25;
doc.font('Helvetica-Bold')
   .text('• Elemento neutro: ', 70, yPos);
doc.font('Helvetica')
   .text('somar zero não muda o número → 7 + 0 = 7', 195, yPos);

yPos += 25;
doc.font('Helvetica-Bold')
   .text('• Associativa: ', 70, yPos);
doc.font('Helvetica')
   .text('(2 + 3) + 4 = 2 + (3 + 4) = 9', 165, yPos);

yPos += 50;
addSubtitle(doc, 'Como fazer a conta armada:', yPos);

yPos += 40;
// Exemplo de conta armada
doc.roundedRect(200, yPos, 195, 120, 5)
   .fillAndStroke('#f8f9fa', '#bdc3c7');

doc.fontSize(14)
   .fillColor('#2c3e50')
   .font('Courier-Bold')
   .text('    347', 220, yPos + 15);
doc.text('  + 258', 220, yPos + 35);
doc.moveTo(220, yPos + 55).lineTo(370, yPos + 55).stroke('#34495e');
doc.text('    605', 220, yPos + 65);

doc.fontSize(10)
   .fillColor('#7f8c8d')
   .font('Helvetica')
   .text('Alinhe pela direita!\nSome coluna por coluna.', 220, yPos + 95, { width: 155, align: 'center' });

// PÁGINA 5 - SUBTRAÇÃO
doc.addPage();
addTitle(doc, '3. SUBTRAÇÃO', 50);

yPos = 120;
addText(doc, 'A subtração é a operação que retira ou diminui uma quantidade de outra. O resultado é chamado de DIFERENÇA ou RESTO.', yPos);

yPos += 60;
doc.roundedRect(100, yPos, 395, 60, 5)
   .fillAndStroke('#fadbd8', '#c0392b');

doc.fontSize(16)
   .fillColor('#c0392b')
   .font('Helvetica-Bold')
   .text('MINUENDO  −  SUBTRAENDO  =  DIFERENÇA', 100, yPos + 20, { width: 395, align: 'center' });

yPos += 90;
addSubtitle(doc, 'Exemplo Ilustrado:', yPos);

yPos += 40;
doc.fontSize(40).fillColor('#f39c12').text('⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐', 80, yPos);
yPos += 60;
doc.fontSize(20).fillColor('#2c3e50').text('Tirar 3 estrelas:', 80, yPos);
yPos += 40;
doc.fontSize(40).fillColor('#f39c12').text('⭐ ⭐ ⭐ ⭐', 80, yPos);

yPos += 70;
doc.fontSize(16)
   .fillColor('#c0392b')
   .font('Helvetica-Bold')
   .text('7 − 3 = 4', 50, yPos, { align: 'center', width: 495 });

yPos += 60;
addSubtitle(doc, 'Propriedades da Subtração:', yPos);

yPos += 35;
doc.fontSize(11)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('• NÃO é comutativa: ', 70, yPos);
doc.font('Helvetica')
   .text('a ordem altera o resultado → 5 − 3 ≠ 3 − 5', 205, yPos);

yPos += 25;
doc.font('Helvetica-Bold')
   .text('• Subtrair zero: ', 70, yPos);
doc.font('Helvetica')
   .text('o número não muda → 8 − 0 = 8', 175, yPos);

yPos += 50;
addSubtitle(doc, 'Como fazer a conta armada:', yPos);

yPos += 40;
doc.roundedRect(200, yPos, 195, 140, 5)
   .fillAndStroke('#f8f9fa', '#bdc3c7');

doc.fontSize(14)
   .fillColor('#2c3e50')
   .font('Courier-Bold')
   .text('    523', 220, yPos + 15);
doc.text('  − 187', 220, yPos + 35);
doc.moveTo(220, yPos + 55).lineTo(370, yPos + 55).stroke('#34495e');
doc.text('    336', 220, yPos + 65);

doc.fontSize(10)
   .fillColor('#7f8c8d')
   .font('Helvetica')
   .text('Alinhe pela direita!\nSubtraia coluna por coluna.\nUse empréstimo quando necessário.', 220, yPos + 95, { width: 155, align: 'center' });

// PÁGINA 6 - MULTIPLICAÇÃO
doc.addPage();
addTitle(doc, '4. MULTIPLICAÇÃO', 50);

yPos = 120;
addText(doc, 'A multiplicação é uma adição repetida. É uma forma rápida de somar o mesmo número várias vezes. O resultado é chamado de PRODUTO.', yPos);

yPos += 60;
doc.roundedRect(120, yPos, 355, 60, 5)
   .fillAndStroke('#fef5e7', '#d68910');

doc.fontSize(16)
   .fillColor('#d68910')
   .font('Helvetica-Bold')
   .text('FATOR  ×  FATOR  =  PRODUTO', 120, yPos + 20, { width: 355, align: 'center' });

yPos += 90;
addSubtitle(doc, 'Exemplo Ilustrado:', yPos);

yPos += 40;
doc.fontSize(12)
   .fillColor('#2c3e50')
   .font('Helvetica')
   .text('4 grupos com 3 corações cada:', 70, yPos);

yPos += 30;
// Desenhar grupos de corações
for (let i = 0; i < 4; i++) {
  doc.fontSize(30).fillColor('#e74c3c').text('❤️ ❤️ ❤️', 70 + (i * 120), yPos);
}

yPos += 60;
doc.fontSize(16)
   .fillColor('#d68910')
   .font('Helvetica-Bold')
   .text('4 × 3 = 12    ou    3 + 3 + 3 + 3 = 12', 50, yPos, { align: 'center', width: 495 });

yPos += 70;
addSubtitle(doc, 'Tabuada (importante memorizar!):', yPos);

yPos += 35;
// Tabuada compacta
const startX = 70;
doc.fontSize(10)
   .fillColor('#2c3e50')
   .font('Courier');

for (let i = 1; i <= 5; i++) {
  let text = '';
  for (let j = 1; j <= 10; j++) {
    text += `${i}×${j}=${i*j}`.padEnd(8, ' ');
  }
  doc.text(`${i} × : ${i} ${i*2} ${i*3} ${i*4} ${i*5} ${i*6} ${i*7} ${i*8} ${i*9} ${i*10}`, startX, yPos);
  yPos += 18;
}

yPos += 30;
addSubtitle(doc, 'Propriedades da Multiplicação:', yPos);

yPos += 35;
doc.fontSize(11)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('• Comutativa: ', 70, yPos);
doc.font('Helvetica')
   .text('a ordem não altera → 4 × 5 = 5 × 4 = 20', 165, yPos);

yPos += 25;
doc.font('Helvetica-Bold')
   .text('• Elemento neutro: ', 70, yPos);
doc.font('Helvetica')
   .text('multiplicar por 1 não muda → 7 × 1 = 7', 195, yPos);

yPos += 25;
doc.font('Helvetica-Bold')
   .text('• Elemento absorvente: ', 70, yPos);
doc.font('Helvetica')
   .text('multiplicar por 0 é sempre 0 → 9 × 0 = 0', 215, yPos);

// PÁGINA 7 - DIVISÃO
doc.addPage();
addTitle(doc, '5. DIVISÃO', 50);

yPos = 120;
addText(doc, 'A divisão é a operação que reparte uma quantidade em partes iguais. É o inverso da multiplicação.', yPos);

yPos += 60;
doc.roundedRect(80, yPos, 435, 60, 5)
   .fillAndStroke('#f4ecf7', '#7d3c98');

doc.fontSize(16)
   .fillColor('#7d3c98')
   .font('Helvetica-Bold')
   .text('DIVIDENDO  ÷  DIVISOR  =  QUOCIENTE', 80, yPos + 20, { width: 435, align: 'center' });

yPos += 90;
addSubtitle(doc, 'Exemplo Ilustrado:', yPos);

yPos += 40;
doc.fontSize(12)
   .fillColor('#2c3e50')
   .font('Helvetica')
   .text('12 bolinhas divididas em 3 grupos iguais:', 70, yPos);

yPos += 30;
// Desenhar divisão em grupos
doc.fontSize(25).fillColor('#3498db').text('●●●●', 80, yPos);
doc.fontSize(14).fillColor('#2c3e50').text('Grupo 1', 80, yPos + 35);

doc.fontSize(25).fillColor('#3498db').text('●●●●', 220, yPos);
doc.fontSize(14).fillColor('#2c3e50').text('Grupo 2', 220, yPos + 35);

doc.fontSize(25).fillColor('#3498db').text('●●●●', 360, yPos);
doc.fontSize(14).fillColor('#2c3e50').text('Grupo 3', 360, yPos + 35);

yPos += 90;
doc.fontSize(16)
   .fillColor('#7d3c98')
   .font('Helvetica-Bold')
   .text('12 ÷ 3 = 4    (cada grupo tem 4 bolinhas)', 50, yPos, { align: 'center', width: 495 });

yPos += 70;
addSubtitle(doc, 'Termos da Divisão:', yPos);

yPos += 40;
doc.roundedRect(150, yPos, 295, 100, 5)
   .fillAndStroke('#f8f9fa', '#bdc3c7');

doc.fontSize(13)
   .fillColor('#2c3e50')
   .font('Courier-Bold')
   .text('    15  |  3  ', 200, yPos + 15);
doc.text('   -15    ─────', 200, yPos + 35);
doc.text('   ───    5', 200, yPos + 50);
doc.text('     0', 200, yPos + 65);

doc.fontSize(9)
   .fillColor('#7f8c8d')
   .font('Helvetica')
   .text('Dividendo = 15\nDivisor = 3\nQuociente = 5\nResto = 0', 320, yPos + 15);

yPos += 130;
addSubtitle(doc, 'Propriedades da Divisão:', yPos);

yPos += 35;
doc.fontSize(11)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('• NÃO é comutativa: ', 70, yPos);
doc.font('Helvetica')
   .text('a ordem altera → 12 ÷ 3 ≠ 3 ÷ 12', 205, yPos);

yPos += 25;
doc.font('Helvetica-Bold')
   .text('• Dividir por 1: ', 70, yPos);
doc.font('Helvetica')
   .text('o número não muda → 8 ÷ 1 = 8', 175, yPos);

yPos += 25;
doc.font('Helvetica-Bold')
   .text('• NÃO existe divisão por zero! ', 70, yPos);
doc.font('Helvetica')
   .text('→ impossível!', 245, yPos);

// PÁGINA 8 - EXERCÍCIOS PARTE 1
doc.addPage();
addTitle(doc, '6. EXERCÍCIOS', 50);

yPos = 120;
doc.roundedRect(50, yPos, 495, 40, 5)
   .fillAndStroke('#d5f4e6', '#27ae60');
doc.fontSize(14)
   .fillColor('#27ae60')
   .font('Helvetica-Bold')
   .text('PARTE A - ADIÇÃO', 50, yPos + 12, { width: 495, align: 'center' });

yPos += 60;
doc.fontSize(12)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('1. Calcule as seguintes adições:', 70, yPos);

yPos += 30;
doc.font('Helvetica');
const adicoes = ['a) 23 + 45 = _____', 'b) 127 + 89 = _____', 'c) 356 + 278 = _____', 'd) 1.025 + 3.487 = _____'];
adicoes.forEach((ex, i) => {
  doc.text(ex, 90, yPos + (i * 25));
});

yPos += 130;
doc.font('Helvetica-Bold')
   .text('2. Problema contextualizado:', 70, yPos);

yPos += 25;
doc.font('Helvetica')
   .text('Maria tinha 135 figurinhas. Ganhou 78 figurinhas de seu irmão e depois comprou mais 42 figurinhas. Quantas figurinhas Maria tem agora?', 90, yPos, { width: 430 });

yPos += 60;
doc.text('Resposta: _____________', 90, yPos);

yPos += 50;
doc.font('Helvetica-Bold')
   .text('3. Complete a sequência:', 70, yPos);

yPos += 25;
doc.font('Helvetica')
   .text('10 + 5 = ____     20 + 5 = ____     30 + 5 = ____     40 + 5 = ____', 90, yPos);

yPos += 50;
doc.roundedRect(50, yPos, 495, 40, 5)
   .fillAndStroke('#fadbd8', '#c0392b');
doc.fontSize(14)
   .fillColor('#c0392b')
   .font('Helvetica-Bold')
   .text('PARTE B - SUBTRAÇÃO', 50, yPos + 12, { width: 495, align: 'center' });

yPos += 60;
doc.fontSize(12)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('4. Calcule as seguintes subtrações:', 70, yPos);

yPos += 30;
doc.font('Helvetica');
const subtracoes = ['a) 78 − 34 = _____', 'b) 156 − 89 = _____', 'c) 500 − 237 = _____', 'd) 2.345 − 1.678 = _____'];
subtracoes.forEach((ex, i) => {
  doc.text(ex, 90, yPos + (i * 25));
});

yPos += 130;
doc.font('Helvetica-Bold')
   .text('5. Problema contextualizado:', 70, yPos);

yPos += 25;
doc.font('Helvetica')
   .text('João tinha R$ 850,00 na sua conta bancária. Pagou uma conta de R$ 325,00 e depois comprou um livro por R$ 68,00. Quanto ainda resta na conta de João?', 90, yPos, { width: 430 });

// PÁGINA 9 - EXERCÍCIOS PARTE 2
doc.addPage();

yPos = 80;
doc.roundedRect(50, yPos, 495, 40, 5)
   .fillAndStroke('#fef5e7', '#d68910');
doc.fontSize(14)
   .fillColor('#d68910')
   .font('Helvetica-Bold')
   .text('PARTE C - MULTIPLICAÇÃO', 50, yPos + 12, { width: 495, align: 'center' });

yPos += 60;
doc.fontSize(12)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('6. Calcule as seguintes multiplicações:', 70, yPos);

yPos += 30;
doc.font('Helvetica');
const multiplicacoes = ['a) 7 × 8 = _____', 'b) 15 × 6 = _____', 'c) 23 × 12 = _____', 'd) 125 × 8 = _____'];
multiplicacoes.forEach((ex, i) => {
  doc.text(ex, 90, yPos + (i * 25));
});

yPos += 130;
doc.font('Helvetica-Bold')
   .text('7. Problema com gráfico:', 70, yPos);

yPos += 25;
doc.font('Helvetica')
   .text('Uma fábrica produz 45 caixas por dia. Quantas caixas serão produzidas em 12 dias?', 90, yPos, { width: 430 });

yPos += 50;
// Gráfico simples de barras
doc.fontSize(10)
   .font('Helvetica-Bold')
   .text('Produção Diária:', 90, yPos);

yPos += 25;
const barHeight = 4;
for (let i = 1; i <= 12; i++) {
  const x = 90 + (i - 1) * 38;
  doc.rect(x, yPos, 30, 80).fillAndStroke('#3498db', '#2980b9');
  doc.fontSize(8)
     .fillColor('#2c3e50')
     .font('Helvetica')
     .text(`D${i}`, x + 8, yPos + 85);
}

yPos += 110;
doc.fontSize(12)
   .text('Resposta: _____________ caixas', 90, yPos);

yPos += 50;
doc.font('Helvetica-Bold')
   .text('8. Complete a tabuada:', 70, yPos);

yPos += 25;
doc.font('Helvetica')
   .text('6 × 1 = ___   6 × 2 = ___   6 × 3 = ___   6 × 4 = ___   6 × 5 = ___', 90, yPos);

yPos += 50;
doc.roundedRect(50, yPos, 495, 40, 5)
   .fillAndStroke('#f4ecf7', '#7d3c98');
doc.fontSize(14)
   .fillColor('#7d3c98')
   .font('Helvetica-Bold')
   .text('PARTE D - DIVISÃO', 50, yPos + 12, { width: 495, align: 'center' });

yPos += 60;
doc.fontSize(12)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('9. Calcule as seguintes divisões:', 70, yPos);

yPos += 30;
doc.font('Helvetica');
const divisoes = ['a) 56 ÷ 7 = _____', 'b) 144 ÷ 12 = _____', 'c) 225 ÷ 15 = _____', 'd) 1.000 ÷ 25 = _____'];
divisoes.forEach((ex, i) => {
  doc.text(ex, 90, yPos + (i * 25));
});

// PÁGINA 10 - EXERCÍCIOS PARTE 3
doc.addPage();

yPos = 80;
doc.fontSize(12)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('10. Problema contextualizado:', 70, yPos);

yPos += 25;
doc.font('Helvetica')
   .text('Uma escola recebeu 240 livros para distribuir igualmente entre 8 salas de aula. Quantos livros cada sala receberá?', 90, yPos, { width: 430 });

yPos += 60;
doc.text('Resposta: _____________', 90, yPos);

yPos += 50;
doc.roundedRect(50, yPos, 495, 40, 5)
   .fillAndStroke('#e8daef', '#8e44ad');
doc.fontSize(14)
   .fillColor('#8e44ad')
   .font('Helvetica-Bold')
   .text('PARTE E - EXERCÍCIOS MISTOS', 50, yPos + 12, { width: 495, align: 'center' });

yPos += 60;
doc.fontSize(12)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('11. Resolva aplicando a operação correta:', 70, yPos);

yPos += 30;
doc.font('Helvetica')
   .text('a) Pedro comprou 3 pacotes de figurinhas com 8 figurinhas em cada pacote. Quantas figurinhas ele comprou ao todo?', 90, yPos, { width: 430 });

yPos += 50;
doc.text('Operação: ____________     Resposta: _____________', 90, yPos);

yPos += 40;
doc.text('b) Ana tinha 150 balas e deu 65 balas para sua amiga. Com quantas balas Ana ficou?', 90, yPos, { width: 430 });

yPos += 50;
doc.text('Operação: ____________     Resposta: _____________', 90, yPos);

yPos += 40;
doc.font('Helvetica-Bold')
   .text('12. Problema com diagrama:', 70, yPos);

yPos += 25;
doc.font('Helvetica')
   .text('Em uma fazenda há galinhas e coelhos. Se há 12 galinhas e cada galinha põe 6 ovos por semana, quantos ovos são produzidos em uma semana?', 90, yPos, { width: 430 });

yPos += 60;
// Diagrama simples
doc.fontSize(10)
   .font('Helvetica-Bold')
   .text('Representação:', 90, yPos);

yPos += 25;
for (let i = 0; i < 12; i++) {
  const x = 90 + (i % 6) * 70;
  const y = yPos + Math.floor(i / 6) * 50;

  doc.circle(x + 15, y + 15, 15).fillAndStroke('#f39c12', '#e67e22');
  doc.fontSize(8)
     .fillColor('white')
     .font('Helvetica-Bold')
     .text('6', x + 11, y + 11);
}

yPos += 120;
doc.fontSize(12)
   .fillColor('#2c3e50')
   .font('Helvetica')
   .text('Resposta: _____________ ovos', 90, yPos);

yPos += 50;
doc.font('Helvetica-Bold')
   .text('13. Desafio:', 70, yPos);

yPos += 25;
doc.font('Helvetica')
   .text('Carlos quer comprar um videogame que custa R$ 480,00. Ele já economizou R$ 125,00 e recebe R$ 35,00 de mesada todo mês. Quantos meses ele precisa esperar para ter dinheiro suficiente?', 90, yPos, { width: 430 });

// PÁGINA 11 - GABARITO
doc.addPage();
addTitle(doc, 'GABARITO', 50);

yPos = 120;
doc.fontSize(11)
   .fillColor('#27ae60')
   .font('Helvetica-Bold')
   .text('ADIÇÃO:', 70, yPos);

yPos += 25;
doc.fillColor('#2c3e50')
   .font('Helvetica')
   .text('1. a) 68   b) 216   c) 634   d) 4.512', 90, yPos);
yPos += 20;
doc.text('2. 135 + 78 + 42 = 255 figurinhas', 90, yPos);
yPos += 20;
doc.text('3. 15, 25, 35, 45', 90, yPos);

yPos += 40;
doc.fillColor('#c0392b')
   .font('Helvetica-Bold')
   .text('SUBTRAÇÃO:', 70, yPos);

yPos += 25;
doc.fillColor('#2c3e50')
   .font('Helvetica')
   .text('4. a) 44   b) 67   c) 263   d) 667', 90, yPos);
yPos += 20;
doc.text('5. 850 − 325 − 68 = 457 reais', 90, yPos);

yPos += 40;
doc.fillColor('#d68910')
   .font('Helvetica-Bold')
   .text('MULTIPLICAÇÃO:', 70, yPos);

yPos += 25;
doc.fillColor('#2c3e50')
   .font('Helvetica')
   .text('6. a) 56   b) 90   c) 276   d) 1.000', 90, yPos);
yPos += 20;
doc.text('7. 45 × 12 = 540 caixas', 90, yPos);
yPos += 20;
doc.text('8. 6, 12, 18, 24, 30', 90, yPos);

yPos += 40;
doc.fillColor('#7d3c98')
   .font('Helvetica-Bold')
   .text('DIVISÃO:', 70, yPos);

yPos += 25;
doc.fillColor('#2c3e50')
   .font('Helvetica')
   .text('9. a) 8   b) 12   c) 15   d) 40', 90, yPos);
yPos += 20;
doc.text('10. 240 ÷ 8 = 30 livros por sala', 90, yPos);

yPos += 40;
doc.fillColor('#8e44ad')
   .font('Helvetica-Bold')
   .text('EXERCÍCIOS MISTOS:', 70, yPos);

yPos += 25;
doc.fillColor('#2c3e50')
   .font('Helvetica')
   .text('11. a) Multiplicação: 3 × 8 = 24 figurinhas', 90, yPos);
yPos += 20;
doc.text('    b) Subtração: 150 − 65 = 85 balas', 90, yPos);
yPos += 20;
doc.text('12. 12 × 6 = 72 ovos', 90, yPos);
yPos += 20;
doc.text('13. Falta: 480 − 125 = 355. Meses: 355 ÷ 35 = 10 meses + resto', 90, yPos);
yPos += 15;
doc.text('    (aproximadamente 11 meses)', 90, yPos);

yPos += 60;
doc.roundedRect(100, yPos, 395, 80, 5)
   .fillAndStroke('#d5f4e6', '#27ae60');

doc.fontSize(14)
   .fillColor('#27ae60')
   .font('Helvetica-Bold')
   .text('Parabéns por completar os exercícios!', 100, yPos + 15, { width: 395, align: 'center' });

doc.fontSize(11)
   .fillColor('#2c3e50')
   .font('Helvetica')
   .text('Continue praticando as 4 operações para se tornar um expert em matemática!', 100, yPos + 45, { width: 395, align: 'center' });

// CONTRACAPA
doc.addPage();
doc.rect(0, 0, 595, 842).fill('#ecf0f1');

doc.fontSize(28)
   .fillColor('#2c3e50')
   .font('Helvetica-Bold')
   .text('Matemática é divertida!', 50, 300, { align: 'center', width: 495 });

doc.fontSize(60)
   .fillColor('#3498db')
   .text('+ − × ÷', 50, 370, { align: 'center', width: 495 });

doc.fontSize(14)
   .fillColor('#7f8c8d')
   .font('Helvetica')
   .text('Apostila desenvolvida para auxiliar no aprendizado\ndas operações fundamentais com números naturais.', 50, 500, { align: 'center', width: 495 });

doc.end();

console.log('✅ PDF gerado com sucesso: apostila-matematica.pdf');
