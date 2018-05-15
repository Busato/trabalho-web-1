/* PARA RODAR - npm install
DEPOIS - node app.js
*/

var http = require('http');
var readline = require('readline');

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end();
}).listen(80);

class Roleta {
  constructor(numeros) {
    // always initialize all instance properties
    this.numeros = numeros;
  }
  rodada() {
    return Math.floor(Math.random() * this.getNumero());
  }
  getNumero() {
    return this.numeros;
  }
}

class Banca {
  constructor(budget) {
    this.budget = budget;
  }
  getBudget() {
    return this.budget;
  }
  setBudget(newBudget) {
    this.budget = newBudget;
  }
}
class Jogadores {
  constructor(arraySize) {
    this.arrayJogadores = new Array();
    for (let index = 0; index < arraySize; index++) {
      const jogadorBudget = 10;
      this.arrayJogadores.push(new Jogador(jogadorBudget, index));
      console.log("Jogador" + index + " inicializado com " + jogadorBudget + " de bugdet");
    }
  }
  getJogadores() {
    return this.arrayJogadores;
  }
}
class Jogador {

  constructor(budget, codigo) {
    this.budget = budget;
    this.codigo = codigo;
    this.aposta = 0;
    this.resultado ='';
    this.qttPassouJogada = 0;
  }
  getBudget() {
    return this.budget;
  }
  setBudget(newBudget) {
    this.budget = newBudget;
  }
  getResultado() {
    return this.resultado;
  }
  setResultado(newResultado) {
    this.resultado = newResultado;
  }
  getAposta() {
    return this.aposta;
  }
  getCodigo() {
    return this.codigo;
  }
  getQttPassouJogada(){
    return this.qttPassouJogada;
  }
  setQttPassouJogada(){
    return this.qttPassouJogada++;
  }
  zerarQttPassouJogada(){
    this.qttPassouJogada = 0;
    return this.qttPassouJogada;
  }
  //novo
  jogada(aposta, quantidade) {
    if (typeof quantidade !== 'undefined') {
      this.budget = this.budget - quantidade;
    } else if (aposta != "passar") {
      this.budget = this.budget - 1;
    }
    this.aposta = aposta;
  }
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.write("Roleta:\n");

function createJogadores() {
  rl.question("Quantos jogadores vão jogar? ", function (answer) {
    if (answer <= 0){
      console.log("Não há jogadores para iniciar o jogo.")
      process.exit();
    }
    var arrayJogadores = new Jogadores(answer);
    console.log("Os jogadores foram criados");
    createRoleta(arrayJogadores);
  });
}

function createRoleta(arrayJogadores) {

  rl.question("Qual vai ser o tipo de roleta?(1 - americana, 2 - europeia, 3 - francesa) ", function (answer) {
    if (answer == 1) {
      numeroRoleta = 10;
    } else if (answer == 2) {
      numeroRoleta = 10;
    } else if (answer == 3) {
      numeroRoleta = 10;
    } else {
      numeroRoleta = 0;
      console.log("Você precisa entrar uma informação válida!");
      createRoleta();
    }
    if (numeroRoleta !== 0) {
      const roleta = new Roleta(numeroRoleta);
      console.log("A roleta foi iniciada.");
      const banca = new Banca(100);
      console.log("Banca inicializada com " + banca.getBudget());
      const arrayJogadoresNew = arrayJogadores.getJogadores();
      var numeroRolado;
      createJogada(roleta, banca, arrayJogadoresNew, 0);
    }
  });
}

// fazer a jogada (loop)
var passException = 'nao';

function createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo) {

  // Se passou por todos jogadores, fala quem ganhou, quanto e volta pro primeiro
  if (arrayJogadores.length <= jogadorNowCodigo && passException == 'nao' ) {
    console.log('A roleta girou o número', numeroRolado);
    // Diz quem ganhou e se ganhou
    for (let index = 0; index < arrayJogadores.length; index++) {
      var jogadorNow = arrayJogadores[index];
      console.log("Jogador" + jogadorNow.getCodigo() +" jogou "+jogadorNow.getAposta()+" e "+jogadorNow.getResultado () +". Tem agora " +
      + jogadorNow.getBudget());
    }
    console.log("Agora a banca tem " + banca.getBudget());
    jogadorNowCodigo = 0;
  }
  // verificaçoes se jogadores ou banca perderam
  if (banca.getBudget() <= 0) {
    console.log("A banca quebrou! Parabéns!");
    return;
  }

  // passar por todos os jogadores e ver se alguem perdeu, se perdeu retirar do arrayJogadoress
  for (let index = 0; index < arrayJogadores.length; index++) {
    var jogador = arrayJogadores[index];
    if (jogador.getBudget() <= 0) {
      console.log("O jogador"+jogador.getCodigo() +" quebrou!");
      arrayJogadores.splice(jogador.getCodigo(), 1);
      jogadorNowCodigo = jogadorNowCodigo + 1;
      createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
    }
  }

  // verificar se todos jogadores perderam
  if (arrayJogadores.length == 0) {
    console.log('Todos os jogadores perderam!');
    return;
  }

  // É inicio da rodada
  if (jogadorNowCodigo == 0) {
    // Rodar roleta para a rodada
    numeroRolado = roleta.rodada();
  }

  // Faz as perguntas do que o jogador quer jogar
  rl.question("Sua vez jogador" + jogadorNowCodigo + ". Qual vai ser a sua jogada?(par/impar, vermelho/preto, altos/baixos, numero(s) único(s)) ou passar? ", function (answer) {

    /* OS NUMEROS IMPARES SERÃO PRETOS E OS NUMEROS PARES SERÃO VERMELHOS */

    // PAR OU IMPAR
    if (answer == 'par' || answer == 'impar') {
      arrayJogadores[jogadorNowCodigo].jogada(answer);
      arrayJogadores[jogadorNowCodigo].zerarQttPassouJogada();
      //numeroRolado = roleta.rodada();
      if (numeroRolado % 2 === 0) {
        paridadeRoleta = 'par';
      } else {
        paridadeRoleta = 'impar';
      }
      if (paridadeRoleta === answer) {
        //GANHOU

        //calcular bugdet do jogador
        arrayJogadores[jogadorNowCodigo].setBudget(arrayJogadores[jogadorNowCodigo].getBudget() + 2);
        arrayJogadores[jogadorNowCodigo].setResultado('ganhou');

        // Calcular bugdet da banca
        banca.setBudget(banca.getBudget() - 1);
        jogadorNowCodigo = jogadorNowCodigo + 1;
        createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
      } else {
        // Calcular bugdet da banca
        banca.setBudget(banca.getBudget() + 1);

        arrayJogadores[jogadorNowCodigo].setResultado('perdeu');
        jogadorNowCodigo = jogadorNowCodigo + 1;
        createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
      }
    }
    // VERMELHO OU PRETO
    else if (answer == 'vermelho' || answer == 'preto') {
      arrayJogadores[jogadorNowCodigo].jogada(answer);
      arrayJogadores[jogadorNowCodigo].zerarQttPassouJogada();

      //numeroRolado = roleta.rodada();
      if (numeroRolado % 2 === 0) {
        paridadeRoleta = 'Par';
      } else {
        paridadeRoleta = 'Impar';
      }
      if (answer == 'vermelho') {
        if (paridadeRoleta == 'Impar') {

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() + 1);

          // perdeu playboy
          arrayJogadores[jogadorNowCodigo].setResultado('perdeu');

          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);

        } else {
          // ganho safadão
          arrayJogadores[jogadorNowCodigo].setResultado('ganhou');
          //calcular bugdet do jogador
          arrayJogadores[jogadorNowCodigo].setBudget(arrayJogadores[jogadorNowCodigo].getBudget() + 2);

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() - 1);

          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);

        }
      } else {
        if (paridadeRoleta == 'Impar') {
          // ganho playboy
          arrayJogadores[jogadorNowCodigo].setResultado('ganhou');

          //calcular bugdet do jogador
          arrayJogadores[jogadorNowCodigo].setBudget(arrayJogadores[jogadorNowCodigo].getBudget() + 2);

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() - 1);

          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);

        } else {
          // perdeu safadão
          arrayJogadores[jogadorNowCodigo].setResultado('perdeu');

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() + 1);

          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);

        }
      }
    }
    // ALTOS OU BAIXOS
    else if (answer == 'altos' || answer == 'baixos') {
      arrayJogadores[jogadorNowCodigo].jogada(answer);
      arrayJogadores[jogadorNowCodigo].zerarQttPassouJogada();

      //numeroRolado = roleta.rodada();
      numeroTotalRoleta = roleta.getNumero();
      numeroTotalRoleta = numeroTotalRoleta / 2;
      if (answer == 'altos') {
        if (numeroTotalRoleta > numeroRolado) {
          // perdeu playboy
          arrayJogadores[jogadorNowCodigo].setResultado('perdeu');

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() + 1);

          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);

        } else {
          // ganho safadão
          arrayJogadores[jogadorNowCodigo].setResultado('ganhou');

          //calcular bugdet do jogador
          arrayJogadores[jogadorNowCodigo].setBudget(arrayJogadores[jogadorNowCodigo].getBudget() + 2);

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() - 1);

          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);

        }
      } else {
        if (numeroTotalRoleta > numeroRolado) {
          // ganho playboy
          arrayJogadores[jogadorNowCodigo].setResultado('ganhou');

          //calcular bugdet do jogador
          arrayJogadores[jogadorNowCodigo].setBudget(arrayJogadores[jogadorNowCodigo].getBudget() + 2);

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() - 1);

          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);

        } else {
          // perdeu safadão
          arrayJogadores[jogadorNowCodigo].setResultado('perdeu');

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() + 1);

          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);

        }
      }

      // PASSAR JOGADA
    } else if (answer == 'passar'){
      arrayJogadores[jogadorNowCodigo].setQttPassouJogada();
      if(arrayJogadores[jogadorNowCodigo].getQttPassouJogada() > 3){
        console.log("Você não pode mais passar!!");
        createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
      }
      if(arrayJogadores[jogadorNowCodigo].getQttPassouJogada() <= 3){
        console.log("O jogador "+jogadorNowCodigo+" passou a jogada!");
        jogadorNowCodigo = jogadorNowCodigo + 1;
        createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
      }
    }

    // NUMEROS UNICOS e INFO INVÁLIDA
    else {
      var allNumbers = answer.split(',');
      for (let index = 0; index < allNumbers.length; index++) {
        var count = 0;
        const element = allNumbers[index];
        if (isNaN(element)) {
          count++;
        }
      }
      if (count == 0) {
        arrayJogadores[jogadorNowCodigo].jogada(allNumbers, allNumbers.length);
        arrayJogadores[jogadorNowCodigo].zerarQttPassouJogada();

        //numeroRolado = roleta.rodada();
        var quantidade_perdida = 0;
        for (ind = 0; ind < allNumbers.length; ind++) {
          if (Number(allNumbers[ind]) === numeroRolado) {
            // ganho playboy
            arrayJogadores[jogadorNowCodigo].setResultado('ganhou');

            //calcular bugdet do jogador
            arrayJogadores[jogadorNowCodigo].setBudget(arrayJogadores[jogadorNowCodigo].getBudget() + allNumbers.length * 2);

            // Calcular bugdet da banca
            banca.setBudget(banca.getBudget() - allNumbers.length);
            break;a
          } else {
            // perdeu safadão
            quantidade_perdida++;
            if (quantidade_perdida == allNumbers.length) {

              arrayJogadores[jogadorNowCodigo].setResultado('perdeu');
              // Calcular bugdet da banca
              banca.setBudget(banca.getBudget() + allNumbers.length);
            }
          }
        }
        jogadorNowCodigo = jogadorNowCodigo + 1;
        createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
      } else {
        console.log("Você precisa entrar uma informação válida!");
        createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
      }
    }
  });
}


createJogadores();
