const Roleta = require('./client/roleta.js');
const Banca = require('./client/banca.js');
const Jogadores = require('./client/jogadores.js');
const Jogador = require('./client/jogador.js');

var http = require('http');
var readline = require('readline');

// Criacao do servidor node
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end();
}).listen(8080);

// criacao da interface do terminal
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.write("Roleta:\n");

// inicio do jogo, criacao dos jogadores
createJogadores();

function createJogadores() {
  rl.question("Quantos jogadores vão jogar? \n", function (answer) {
    // verificacao se escreveu um numero
    if (isNaN(answer)){
      console.log("Insira um valor númerico para definir quantidade de jogadores.\n")
      process.exit();
    }
    // verificacao se escreveu algum numero negativo
    if (answer <= 0){
      console.log("Insira um valor maior que zero para definir quantidade de jogadores.\n")
      process.exit();
    }
    // cria o arrayJogadores com todos os jogadores e cria a roleta
    var arrayJogadores = new Jogadores(answer);
    console.log("Os jogadores foram criados");
    createRoleta(arrayJogadores);
  });
}

function createRoleta(arrayJogadores) {

  // Pergunta qual tipo de roleta e instacia a quantidade de numero em cada roleta
  rl.question("Qual vai ser o tipo de roleta?(1 - americana, 2 - europeia, 3 - francesa) \n", function (answer) {
    if (answer == 1) {
      numeroRoleta = 37;
    } else if (answer == 2) {
      numeroRoleta = 37;
    } else if (answer == 3) {
      numeroRoleta = 37;
    } else {
      numeroRoleta = 0;
      console.log("Você precisa entrar uma informação válida!\n");
      createRoleta();
    }
    if (numeroRoleta !== 0) {
      // criacao da constante roleta
      const roleta = new Roleta(numeroRoleta);
      console.log("A roleta foi iniciada.");
      // criacao da constante banca
      const banca = new Banca(1000);
      console.log("Banca inicializada com " + banca.getBudget() + "\n");
      // criacao da constante jogadores
      const arrayJogadoresNew = arrayJogadores.getJogadores();
      var numeroRolado;
      // Comeca a primeira jogada
      createJogada(roleta, banca, arrayJogadoresNew, 0);
    }
  });
}

// fazer a jogada (loop)

function createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo) {

  // Se passou por todos jogadores, fala quem ganhou, quanto e volta pro primeiro
  if (arrayJogadores.length <= jogadorNowCodigo) {
    console.log('A roleta girou o número', numeroRolado + "\n");
    // Diz quem ganhou e se ganhou
    for (let index = 0; index < arrayJogadores.length; index++) {
      var jogadorNow = arrayJogadores[index];
      // verifica se jogador nao passou a jogada
      if(jogadorNow.getQttPassouJogada() == 0){
        console.log("Jogador" + jogadorNow.getCodigo() +" jogou "+jogadorNow.getAposta()+" e "+jogadorNow.getResultado () +". Tem agora " +
        + jogadorNow.getBudget() + "\n");
      }
      // verifica se jogador passou a rodada
      if(jogadorNow.getQttPassouJogada() > 0){
        console.log("Jogador" + jogadorNow.getCodigo() + " passou esse round. \n");
      }
    }
    console.log("Agora a banca tem " + banca.getBudget() + "\n");
    jogadorNowCodigo = 0;
  }

  // passar por todos os jogadores e ver se alguem perdeu, se perdeu retirar do arrayJogadoress
  for (let index = 0; index < arrayJogadores.length; index++) {
    var jogador = arrayJogadores[index];
    // se o budget do jogador e menor que 0, esse jogador perdeu e sai do arrayJogadores
    if (jogador.getBudget() <= 0) {
      console.log("O jogador"+jogador.getCodigo() +" quebrou! \n");
      arrayJogadores.splice(jogador.getCodigo(), 1);
      jogadorNowCodigo = jogadorNowCodigo + 1;
      createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
    }
  }

  // verificar se todos jogadores perderam
  if (arrayJogadores.length == 0) {
    console.log('Todos os jogadores perderam!\n');
    process.exit();
  }

  // É inicio da rodada
  if (jogadorNowCodigo == 0) {
    // Rodar roleta para a rodada
    numeroRolado = roleta.rodada();
  }

  // Faz as perguntas do que o jogador quer jogar
  rl.question("Sua vez jogador" + jogadorNowCodigo + ". Qual vai ser a sua jogada?(par/impar, vermelho/preto, altos/baixos, numero(s) único(s)) ou passar? \n", function (answer) {

    /* OS NUMEROS IMPARES SERÃO PRETOS E OS NUMEROS PARES SERÃO VERMELHOS */

    // JOGADA PAR OU IMPAR
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

        // O proximo jogador
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

          // O proximo jogador
          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
        } else {
          // ganho safadão
          arrayJogadores[jogadorNowCodigo].setResultado('ganhou');
          //calcular bugdet do jogador
          arrayJogadores[jogadorNowCodigo].setBudget(arrayJogadores[jogadorNowCodigo].getBudget() + 2);

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() - 1);

          // O proximo jogador
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

          // O proximo jogador
          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
        } else {
          // perdeu safadão
          arrayJogadores[jogadorNowCodigo].setResultado('perdeu');

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() + 1);

          // O proximo jogador
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

          // O proximo jogador
          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
        } else {
          // ganho safadão
          arrayJogadores[jogadorNowCodigo].setResultado('ganhou');

          //calcular bugdet do jogador
          arrayJogadores[jogadorNowCodigo].setBudget(arrayJogadores[jogadorNowCodigo].getBudget() + 2);

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() - 1);

          // O proximo jogador
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

          // O proximo jogador
          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
        } else {
          // perdeu safadão
          arrayJogadores[jogadorNowCodigo].setResultado('perdeu');

          // Calcular bugdet da banca
          banca.setBudget(banca.getBudget() + 1);

          // O proximo jogador
          jogadorNowCodigo = jogadorNowCodigo + 1;
          createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
        }
      }
      // PASSAR JOGADA
    } else if (answer == 'passar'){
      arrayJogadores[jogadorNowCodigo].setQttPassouJogada();
      if(arrayJogadores[jogadorNowCodigo].getQttPassouJogada() > 3){
        console.log("Você não pode mais passar!!\nEscolha uma opção diferente e jogue.\n");
        createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
      }
      if(arrayJogadores[jogadorNowCodigo].getQttPassouJogada() <= 3){
        // O proximo jogador
        jogadorNowCodigo = jogadorNowCodigo + 1;
        createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
      }
    }

    // NUMEROS UNICOS e INFO INVÁLIDA
    else {
      // verifica se todos sao numeros inteiros
      var allNumbers = answer.split(',');
      for (let index = 0; index < allNumbers.length; index++) {
        var count = 0;
        const element = allNumbers[index];
        if (isNaN(element)) {
          count++;
        }
      }
      // se forem, entra
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
            break;
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
        // O proximo jogador
        jogadorNowCodigo = jogadorNowCodigo + 1;
        createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
      } else {
        console.log("Você precisa entrar uma informação válida!\n");
        createJogada(roleta, banca, arrayJogadores, jogadorNowCodigo);
      }
    }
  });
  // verificaçoes se jogadores ou banca perderam
  if (banca.getBudget() <= 0) {
    console.log("A banca quebrou! Parabéns! \n");
    process.exit();
  }
}

