/*
   Jogo: Tetris
   Autor: Code Explained (www.codeexplained.org)
   Adaptado por: Gilson Pereira
*/

/* NOTAS 
Tamanho da tela do jogo aumentada (NO HTML)
Painéis (NO HTML)

*/ 

// Rotina principal

//BACKGROUND
const ulSquares = document.querySelector("ul.squares");

for (let i = 0; i < 11; i++) {
  const li = document.createElement("li");

  const random = (min, max) => Math.random() * (max - min) + min;

  const size = Math.floor(random(10, 120));
  const position = random(1, 99);
  const delay = random(5, 0.1);
  const duration = random(24, 12);

  li.style.width = `${size}px`;
  li.style.height = `${size}px`;
  li.style.bottom = `-${size}px`;

  li.style.left = `${position}%`;

  li.style.animationDelay = `${delay}s`;
  li.style.animationDuration = `${duration}s`;
  li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;

  ulSquares.appendChild(li);
}
// JOGO

function abrirConfig() {
  document.getElementById("config").style.top = "0";
}

let score = 0;
let linhas = 0;
let linhasTotais = 0;
let nivel = 1;

const scoreElement = document.getElementById("score");
const scoreElement2 = document.getElementById("score2");
const linhasElement = document.getElementById("linhas");
const linhasElement2 = document.getElementById("linhas2");
const linhasTotaisElement = document.getElementById("linhastotais");
const nivelElement = document.getElementById("nivel");
const nivelElement2 = document.getElementById("nivel2");

const mostrarPecaZ = document.getElementById("qntdZ");
const mostrarPecaS = document.getElementById("qntdS");
const mostrarPecaT = document.getElementById("qntdT");
const mostrarPecaO = document.getElementById("qntdO");
const mostrarPecaL = document.getElementById("qntdL");
const mostrarPecaI = document.getElementById("qntdI");
const mostrarPecaJ = document.getElementById("qntdJ");
//Velocidade de descida dos tetraminós
var velocidade = 1 * 1000; // em segundos

//audio
var audio = document.getElementById("trilhasonora");
var playPauseBTN = document.getElementById("btnMusic");
var countMusic = 0;
audio.volume = 0.2;

function playPause() {
  if (countMusic == 0 && fimDeJogo == false) {
    countMusic = 1;
    audio.play();
  } else {
    countMusic = 0;
    audio.pause();
  }
}

var audioTrilhaMorte = document.getElementById("trilhaSonoraMorte");
audioTrilhaMorte.volume = 0.2;

function playTrilhaMorte() {
  audioTrilhaMorte.play();
}

var audioPeca = document.getElementById("pecaMovimento");
var playPauseBTN = document.getElementById("btnSound");
var countSound = 0;
audioPeca.volume = 0.1;

function playSound() {
  if (countSound == 0) {
    audioPeca.play();
  }
}

var audioTravamento = document.getElementById("travamentoDaPeca");
audioTravamento.volume = 0.1;

function playTravamento() {
  if (countSound == 0) {
    audioTravamento.play();
  }
}

var audioEliminacaoLinha = document.getElementById("eliminacaoLinha");
audioEliminacaoLinha.volume = 0.2;

function playEliminacaoLinha() {
  if (countSound == 0) {
    audioEliminacaoLinha.play();
  }
}

function ativarSound() {
  if (countSound == 0) countSound = 1;
  else countSound = 0;
}

// ranking
var tabelaRanking = JSON.parse(localStorage.getItem("rankingTetris")) || [];
var iniciaisJogador;
const I = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
];

const J = [
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
];

const L = [
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
];

const O = [
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
];

const S = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const T = [
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const Z = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
];
//Cores dos tetraminós modificadas
const PECAS = [
  [Z, "yellow"],
  [S, "purple"],
  [T, "red"],
  [O, "blue"],
  [L, "green"],
  [I, "orange"],
  [J, "pink"],
];
let z = 0;
let s = 0;
let t = 0;
let o = 0;
let l = 0;
let pecaI = 0;
let j = 0;

const LINHA = 20;
const COLUNA = 10;
const TAMANHO = 20;
const VAGO = "gray"; //Cor de fundo da tela do jogo modificada

var peca;
var peca2;
var peca3;
var peca4;

var tabuleiro = [];

var inicioDescida;
var fimDeJogo = false;

var tela = document.getElementById("tela");
var c = tela.getContext("2d");

var proxPecaTela = document.getElementById("prox-peca");
var d = proxPecaTela.getContext("2d");

onkeydown = controlarPeca;

playPause();

iniciarTabuleiro();

desenharTabuleiro();

desenharTabuleiroProxPeca();

gerarPrimeiraPeca();

inicioDescida = Date.now();

descerPeca();

// Sub-rotinas (funções)
function gerarPrimeiraPeca() {
  var r = Math.floor(Math.random() * PECAS.length);
  var r2 = Math.floor(Math.random() * PECAS.length);
  var r3 = Math.floor(Math.random() * PECAS.length);
  var r4 = Math.floor(Math.random() * PECAS.length);
  peca = {
    tetramino: PECAS[r][0],
    cor: PECAS[r][1],
    tetraminoN: 0,
    tetraminoAtivo: [[]],
    x: 3,
    y: -2,
  };

  peca2 = {
    tetramino: PECAS[r2][0],
    cor: PECAS[r2][1],
    tetraminoN: 0,
    tetraminoAtivo: [[]],
    x: 3,
    y: -2,
  };

  peca3 = {
    tetramino: PECAS[r3][0],
    cor: PECAS[r3][1],
    tetraminoN: 0,
    tetraminoAtivo: [[]],
    x: 3,
    y: -2,
  };

  peca4 = {
    tetramino: PECAS[r4][0],
    cor: PECAS[r4][1],
    tetraminoN: 0,
    tetraminoAtivo: [[]],
    x: 3,
    y: -2,
  };

  peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
  peca2.tetraminoAtivo = peca2.tetramino[peca2.tetraminoN];
  peca3.tetraminoAtivo = peca3.tetramino[peca3.tetraminoN];
  peca4.tetraminoAtivo = peca4.tetramino[peca4.tetraminoN];

  switch (r) {
    case 0:
      z++;
      break;
    case 1:
      s++;
      break;
    case 2:
      t++;
      break;
    case 3:
      o++;
      break;
    case 4:
      l++;
      break;
    case 5:
      pecaI++;
      break;
    case 6:
      j++;
      break;
    default:
      console.log("deu ruim");
      break;
  }
}
function reiniciarJogo() {
  document.location.reload(true);
  fecharConfig();
}

function abrirConfig() {
  document.getElementById("config").style.top = "0";
}

function fecharConfig() {
  document.getElementById("config").style.top = "-100%";
}

function iniciarTabuleiro() {
  for (var i = 0; i < LINHA; i++) {
    tabuleiro[i] = [];

    for (var j = 0; j < COLUNA; j++) {
      tabuleiro[i][j] = VAGO;
    }
  }
}

function desenharTabuleiro() {
  for (var i = 0; i < LINHA; i++) {
    for (var j = 0; j < COLUNA; j++) {
      desenharQuadrado(j, i, tabuleiro[i][j]);
    }
  }
}

function desenharTabuleiroProxPeca() {
  for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 6; j++) {
      desenharQuadradoPequeno(j, i, tabuleiro[i][j]);
    }
  }
}

function desenharQuadrado(x, y, cor) {
  //mexe nisso
  c.fillStyle = cor;
  c.fillRect(x * TAMANHO, y * TAMANHO, TAMANHO, TAMANHO);

  c.strokeStyle = "black";
  c.strokeRect(x * TAMANHO, y * TAMANHO, TAMANHO, TAMANHO);
}

function desenharQuadradoPequeno(x, y, cor) {
  d.fillStyle = cor;
  d.fillRect(x * TAMANHO, y * TAMANHO, TAMANHO, TAMANHO);

  d.strokeStyle = "black";
  d.strokeRect(x * TAMANHO, y * TAMANHO, TAMANHO, TAMANHO);
}

function apagarPeca() {
  preencherPeca(VAGO);
}

function gerarPeca() {
  var r = Math.floor(Math.random() * PECAS.length);

  peca = peca2;
  peca2 = peca3;
  peca3 = peca4;
  peca4 = {
    tetramino: PECAS[r][0],
    cor: PECAS[r][1],
    tetraminoN: 0,
    tetraminoAtivo: [[]],
    x: 3,
    y: -2,
  };

  peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
  peca2.tetraminoAtivo = peca2.tetramino[peca2.tetraminoN];
  peca3.tetraminoAtivo = peca3.tetramino[peca3.tetraminoN];
  peca4.tetraminoAtivo = peca4.tetramino[peca4.tetraminoN];

  switch (r) {
    case 0:
      z++;
      break;
    case 1:
      s++;
      break;
    case 2:
      t++;
      break;
    case 3:
      o++;
      break;
    case 4:
      l++;
      break;
    case 5:
      pecaI++;
      break;
    case 6:
      j++;
      break;
    default:
      console.log("deu ruim");
      break;
  }
}
var darScore;
function descerPeca() {
  var agora = Date.now();
  var delta = agora - inicioDescida;

  if (delta > velocidade) {
    //velocidade
    moverAbaixo();
    inicioDescida = Date.now();
  }

  if (!fimDeJogo) {
    requestAnimationFrame(descerPeca);
  }
}

function moverAbaixo() {
  if (!colisao(0, 1, peca.tetraminoAtivo)) {
    apagarPeca();
    peca.y++;
    desenharPeca();
  } else {
    travarPeca();
    playTravamento();
    gerarPeca();
  }
  darScore = 0;

  if (darScore == 0 && quantasLinhas == 1) {
    score = score + 100 * nivel;
  } else if (darScore == 0 && quantasLinhas == 2) {
    score += 300 * nivel;
  } else if (darScore == 0 && quantasLinhas == 3) {
    score += 500 * nivel;
  } else if (darScore == 0 && quantasLinhas == 4) {
    score += 800 * nivel;
  }
  quantasLinhas = 0;
  scoreElement.innerHTML = score;
}

function moverDireita() {
  if (!colisao(1, 0, peca.tetraminoAtivo)) {
    apagarPeca();
    peca.x++;
    desenharPeca();
  }
}

function moverEsquerda() {
  if (!colisao(-1, 0, peca.tetraminoAtivo)) {
    apagarPeca();
    peca.x--;
    desenharPeca();
  }
}

function colisao(x, y, p) {
  for (var i = 0; i < p.length; i++) {
    for (var j = 0; j < p.length; j++) {
      if (!p[i][j]) {
        continue;
      }

      var novoX = peca.x + j + x;
      var novoY = peca.y + i + y;

      if (novoX < 0 || novoX >= COLUNA || novoY >= LINHA) {
        return true;
      }

      if (novoY < 0) {
        continue;
      }

      if (tabuleiro[novoY][novoX] != VAGO) {
        return true;
      }
    }
  }

  return false;
}

function apagarPeca() {
  preencherPeca(VAGO);
}

function desenharPeca() {
  preencherPeca(peca.cor);
  apagarProxPeca(VAGO);
  preencherProxPeca(peca2.cor);
  preencherProxPeca2(peca3.cor);
  preencherProxPeca3(peca4.cor);
}

function preencherPeca(cor) {
  for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
    for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
      if (peca.tetraminoAtivo[i][j]) {
        desenharQuadrado(peca.x + j, peca.y + i, cor);
      }
    }
  }
}

function preencherProxPeca(cor) {
  for (var i = 0; i < peca2.tetraminoAtivo.length; i++) {
    for (var j = 0; j < peca2.tetraminoAtivo.length; j++) {
      if (peca2.tetraminoAtivo[i][j]) {
        desenharQuadradoPequeno(1 + j, 1 + i, cor);
      }
    }
  }
}

function preencherProxPeca2(cor) {
  for (var i = 0; i < peca3.tetraminoAtivo.length; i++) {
    for (var j = 0; j < peca3.tetraminoAtivo.length; j++) {
      if (peca3.tetraminoAtivo[i][j]) {
        desenharQuadradoPequeno(1 + j, 4 + i, cor);
      }
    }
  }
}

function preencherProxPeca3(cor) {
  for (var i = 0; i < peca4.tetraminoAtivo.length; i++) {
    for (var j = 0; j < peca4.tetraminoAtivo.length; j++) {
      if (peca4.tetraminoAtivo[i][j]) {
        desenharQuadradoPequeno(1 + j, 7 + i, cor);
      }
    }
  }
}

function apagarProxPeca(cor) {
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 11; j++) {
      desenharQuadradoPequeno(i, j, cor);
    }
  }
}

function atualizarDisplay() {
  //Estatística
  scoreElement2.innerHTML = score;
  linhasElement2.innerHTML = linhas;
  nivelElement2.innerHTML = nivel;
  linhasTotaisElement.innerHTML = linhasTotais;
  mostrarPecaZ.innerHTML = z;
  mostrarPecaS.innerHTML = s;
  mostrarPecaT.innerHTML = t;
  mostrarPecaO.innerHTML = o;
  mostrarPecaL.innerHTML = l;
  mostrarPecaI.innerHTML = pecaI;
  mostrarPecaJ.innerHTML = j;
  for (var i = 0; i < 5; i++) {
    document.getElementById("ranking" + i).innerHTML =
      tabelaRanking[i].iniciaisJogador;
    document.getElementById("scoreR" + i).innerHTML = tabelaRanking[i].score;
  }
}

var quantasLinhas = 0;
function travarPeca() {
  for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
    for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
      if (!peca.tetraminoAtivo[i][j]) {
        continue;
      }

      if (peca.y + i < 0) {
        //Mensagem no final do jogo modificada
        abrirConfig();
        countMusic = 1;
        playPause();

        tabelaRanking[tabelaRanking.length] = {
          iniciaisJogador: prompt("Digite suas iniciais com até três digitos"),
          score: score,
        };
        playTrilhaMorte();
        //ordenar o vetor
        var aux, aux2, k;
        for (var p = 1; p < tabelaRanking.length; p++) {
          aux = tabelaRanking[p].score;
          aux2 = tabelaRanking[p].iniciaisJogador;

          k = p - 1;

          while (k >= 0 && aux < tabelaRanking[k].score) {
            if (aux < tabelaRanking[k].score) {
              tabelaRanking[k + 1].score = tabelaRanking[k].score;
              tabelaRanking[k + 1].iniciaisJogador =
                tabelaRanking[k].iniciaisJogador;
            }
            k--;
          }
          tabelaRanking[k + 1].score = aux;
          tabelaRanking[k + 1].iniciaisJogador = aux2;
        }

        var auxtabelaRanking;
        var tamanho = tabelaRanking.length;
        var meio = Math.trunc((tamanho - 1) / 2);
        for (var i = 0; i <= meio; i++) {
          auxtabelaRanking = tabelaRanking[i];
          tabelaRanking[i] = tabelaRanking[tamanho - 1 - i];
          tabelaRanking[tamanho - 1 - i] = auxtabelaRanking;
        }
        localStorage.setItem("rankingTetris", JSON.stringify(tabelaRanking));
        atualizarDisplay();
        fimDeJogo = true;
        break;
      }

      tabuleiro[peca.y + i][peca.x + j] = peca.cor;
    }
  }

  for (var i = 0; i < LINHA; i++) {
    //score
    var linhaCheia = true;
    for (var j = 0; j < COLUNA; j++) {
      linhaCheia = linhaCheia && tabuleiro[i][j] != VAGO;
    }

    if (linhaCheia) {
      darScore = 1;
      for (var y = i; y > 1; y--) {
        for (var j = 0; j < COLUNA; j++) {
          tabuleiro[y][j] = tabuleiro[y - 1][j];
        }
      }

      for (var j = 0; j < COLUNA; j++) {
        tabuleiro[0][j] = VAGO;
      }
      playEliminacaoLinha();
      quantasLinhas++;
      linhas++;
      linhasTotais++;
      //A cada 10 linhas removidas
      if (linhas == 10) {
        linhas = 0;
        nivel++;
        //A cada nível, a velocidade do jogo deve aumentar.
        velocidade *= 0.5;
      }
    }
    linhasElement.innerHTML = linhas;
    nivelElement.innerHTML = nivel;
  }

  desenharTabuleiro();
}

function rodarPeca() {
  var proximoPadrao =
    peca.tetramino[(peca.tetraminoN + 1) % peca.tetramino.length];
  var recuo = 0;
  if (colisao(0, 0, proximoPadrao)) {
    if (peca.x > COLUNA / 2) {
      recuo = -1;
      inicioDescida = Date.now();
    } else {
      recuo = 1;
    }
  }

  if (!colisao(recuo, 0, proximoPadrao)) {
    apagarPeca();
    peca.x += recuo;
    peca.tetraminoN = (peca.tetraminoN + 1) % peca.tetramino.length;
    peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
    desenharPeca();
  }
}

function rodarPeca2() {
  var proximoPadrao =
    peca.tetramino[(peca.tetraminoN + 3) % peca.tetramino.length];
  console.log(4 % 4);
  var recuo = 0;
  if (colisao(0, 0, proximoPadrao)) {
    if (peca.x > COLUNA / 2) {
      recuo = -1;
      inicioDescida = Date.now();
    } else {
      recuo = 1;
    }
  }

  if (!colisao(recuo, 0, proximoPadrao)) {
    apagarPeca();
    peca.x += recuo;
    peca.tetraminoN = (peca.tetraminoN + 3) % peca.tetramino.length;
    peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
    desenharPeca();
  }
}

function controlarPeca(evento) {
  var tecla = evento.keyCode;

  if (tecla == 37 || tecla == 65) {
    if (countSound == 0) playSound();
    moverEsquerda();
  } else if (tecla == 38 || tecla == 87) {
    if (countSound == 0) playSound();
    rodarPeca();
  } else if (tecla == 39 || tecla == 68) {
    if (countSound == 0) playSound();
    moverDireita();
  } else if (tecla == 40 || tecla == 83) {
    if (countSound == 0) playSound();
    moverAbaixo();
    //Quando o jogador usar a tecla para baixo
    score++;
  } else if (tecla == 32) {
    //apertar espaço para descer a peça direto
    while (!colisao(0, 1, peca.tetraminoAtivo)) {
      moverAbaixo();
      score += 2;
    }
  } else if (tecla == 90) {
    playSound();
    rodarPeca2();
  }
}
