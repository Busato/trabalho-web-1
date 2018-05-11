/* PARA RODAR - npm install
    DEPOIS - node app.js
*/

var http = require('http');
var readline = require('readline');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
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
    getNumero () {
        return this.numeros;
    }
}

class Banca {
    constructor(budget) {
        this.budget = budget;
    }
    getBudget () {
        return this.budget;
    }
    setBudget (newBudget) {
        this.budget = newBudget;
    }
}
class Jogadores {
    constructor (arraySize) {
        this.arrayJogadores = new Array();
        for (let index = 0; index < arraySize; index++) {
            const jogadorBudget = 100;
            this.arrayJogadores.push(new Jogador(jogadorBudget, index));
            console.log("Jogador"+ index +" inicializado com " + jogadorBudget + " de bugdet");
        }
    }
    getJogadores () {
        return this.arrayJogadores;
    }
}
class Jogador {

  constructor (budget, codigo){
    this.budget=budget;
    this.codigo=codigo;
    this.aposta =0;
  }
  getBudget(){
    return this.budget;
  }
  setBudget(newBudget){
    this.budget = newBudget;
  }
  getAposta(){
    return this.aposta;
  }
  getCodigo(){
    return this.codigo;
  }
//novo
  jogada (aposta, quantidade){
      if(typeof quantidade !== 'undefined') {
            this.budget = this.budget-quantidade;
        } else {
            this.budget = this.budget-1;
        }
    this.aposta = aposta;
  }
}

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.write("Roleta:\n");

function createJogadores(){
    rl.question("Quantos jogadores vão jogar?" , function(answer) {
        var arrayJogadores = new Jogadores(answer);
        console.log("Os jogadores foram criados");
        createRoleta(arrayJogadores);
    });
}

function createRoleta(arrayJogadores){

    rl.question("Qual vai ser o tipo de roleta?(1 - americana, 2 - europeia, 3 - francesa)" , function(answer) {
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
        if(numeroRoleta !== 0) {
            const roleta = new Roleta(numeroRoleta);
            console.log("A roleta foi iniciada.");
            const banca = new Banca(1000);
            console.log("Banca inicializada com " + banca.getBudget());
            const arrayJogadoresNew = arrayJogadores.getJogadores();
            createJogada(roleta, banca, arrayJogadoresNew);
        }
    });
}

// fazer a jogada (loop)
function createJogada (roleta, banca, arrayJogadores) {
    
    // verificaçoes se jogadores ou banca perderam
    if (banca.getBudget <= 0) {
        console.log("A banca quebrou! Parabéns!");
    }
    for (let index = 0; index < arrayJogadores.length; index++) {
        var jogador = arrayJogadores[index];
        if (jogador.getBudget <= 0) {
            arrayJogadores.splice(jogador.getCodigo, 1);
            console.log(arrayJogadores);
        }
    }

    for (let index = 0; index < arrayJogadores.length; index++) {

        rl.question("Sua vez jogador" + arrayJogadores[index].getCodigo() + ". Qual vai ser a sua jogada?(par/impar, vermelho/preto, altos/baixos, numero(s) único(s))" , function(answer) {
            /* OS NUMEROS IMPARES SERÃO PRETOS E OS NUMEROS PARES SERÃO VERMELHOS */

            // PAR OU IMPAR
            if (answer == 'par' || answer == 'impar') {
                arrayJogadores[index].jogada(answer);
                numeroRoleta = roleta.rodada();
                console.log("A roleta girou : " + numeroRoleta);
                if (numeroRoleta % 2 === 0 ) {
                    paridadeRoleta = 'par';
                } else {
                    paridadeRoleta = 'impar';
                }
                if (paridadeRoleta === answer) {
                //calcular bugdet do jogador 
                arrayJogadores[index].setBudget(arrayJogadores[index].getBudget() + 2);
    
                // Calcular bugdet da banca
                banca.setBudget(banca.getBudget() - 1);

                console.log("Você ganho safado!");

                console.log("Agora você tem " + arrayJogadores[index].getBudget());
                console.log("Agora a banca tem " + banca.getBudget());
                createJogada(roleta, banca, arrayJogadores);
                } else {
                // Calcular bugdet da banca
                banca.setBudget(banca.getBudget() + 1);

                console.log("Você perdeu otário!");

                console.log("Agora você tem " + arrayJogadores[index].getBudget());
                console.log("Agora a banca tem " + banca.getBudget());

                createJogada(roleta, banca, arrayJogadores);
                }
            } 
            // VERMELHO OU PRETO
            else if (answer == 'vermelho' || answer == 'preto') {
                arrayJogadores[index].jogada(answer);
                numeroRoleta = roleta.rodada();
                console.log("A roleta girou : " + numeroRoleta);
                if (numeroRoleta % 2 === 0 ) {
                    paridadeRoleta = 'Par';
                } else {
                    paridadeRoleta = 'Impar';
                }
                if (answer == 'vermelho') {
                    if (paridadeRoleta == 'Impar') {
                        // perdeu playboy
    
                        // Calcular bugdet da banca
                        banca.setBudget(banca.getBudget() + 1);

                        console.log("Você perdeu otário!");

                    console.log("Agora você tem " + arrayJogadores[index].getBudget());
                    console.log("Agora a banca tem " + banca.getBudget());

                    createJogada(roleta, banca, arrayJogadores);

                    } else {
                        // ganho safadão
                        
                        //calcular bugdet do jogador 
                        arrayJogadores[index].setBudget(arrayJogadores[index].getBudget() + 2);
            
                        // Calcular bugdet da banca
                        banca.setBudget(banca.getBudget() - 1);

                        console.log("Você ganho safado!");

                        console.log("Agora você tem " + arrayJogadores[index].getBudget());
                        console.log("Agora a banca tem " + banca.getBudget());

                        createJogada(roleta, banca, arrayJogadores);

                    }
                } else {
                    if (paridadeRoleta == 'Impar') {
                        // ganho playboy

                        //calcular bugdet do jogador 
                        arrayJogadores[index].setBudget(arrayJogadores[index].getBudget() + 2);
    
                        // Calcular bugdet da banca
                        banca.setBudget(banca.getBudget() - 1);

                        console.log("Você ganho safado!");

                        console.log("Agora você tem " + arrayJogadores[index].getBudget());
                        console.log("Agora a banca tem " + banca.getBudget());
                            
                        createJogada(roleta, banca, arrayJogadores);

                    } else {
                        // perdeu safadão
            
                        // Calcular bugdet da banca
                        banca.setBudget(banca.getBudget() + 1);

                        console.log("Você perdeu otário!");

                        console.log("Agora você tem " + arrayJogadores[index].getBudget());
                        console.log("Agora a banca tem " + banca.getBudget());
                                                
                        createJogada(roleta, banca, arrayJogadores);

                    }
                }
            } 
            // ALTOS OU BAIXOS
            else if (answer == 'altos' || answer == 'baixos') {
                arrayJogadores[index].jogada(answer);
                numeroRoleta = roleta.rodada();
                console.log("A roleta girou : " + numeroRoleta);
                numeroTotalRoleta = roleta.getNumero();
                numeroTotalRoleta = numeroTotalRoleta/2;
                if (answer == 'altos') {
                    if (numeroTotalRoleta > numeroRoleta) {
                        // perdeu playboy
            
                        // Calcular bugdet da banca
                        banca.setBudget(banca.getBudget() + 1);
                    
                        console.log("Você perdeu otário!");

                        console.log("Agora você tem " + arrayJogadores[index].getBudget());
                        console.log("Agora a banca tem " + banca.getBudget());
                                                
                        createJogada(roleta, banca, arrayJogadores);

                    } else {
                        // ganho safadão
                        
                        //calcular bugdet do jogador 
                        arrayJogadores[index].setBudget(arrayJogadores[index].getBudget() + 2);
            
                        // Calcular bugdet da banca
                        banca.setBudget(banca.getBudget() - 1);
                    
                        console.log("Você ganho safado!");

                        console.log("Agora você tem " + arrayJogadores[index].getBudget());
                        console.log("Agora a banca tem " + banca.getBudget());
                                                
                        createJogada(roleta, banca, arrayJogadores);

                    }
                } else {
                    if (numeroTotalRoleta > numeroRoleta) {
                        // ganho playboy

                        //calcular bugdet do jogador 
                        arrayJogadores[index].setBudget(arrayJogadores[index].getBudget() + 2);
            
                        // Calcular bugdet da banca
                        banca.setBudget(banca.getBudget() - 1);
                    
                        console.log("Você ganho safado!");

                        console.log("Agora você tem " + arrayJogadores[index].getBudget());
                        console.log("Agora a banca tem " + banca.getBudget());
                                                
                        createJogada(roleta, banca, arrayJogadores);

                    } else {
                        // perdeu safadão
            
                        // Calcular bugdet da banca
                        banca.setBudget(banca.getBudget() + 1);
                    
                        console.log("Você perdeu otário!");

                        console.log("Agora você tem " + arrayJogadores[index].getBudget());
                        console.log("Agora a banca tem " + banca.getBudget());
                                                
                        createJogada(roleta, banca, arrayJogadores);

                    }
                }
            } 
            // NUMEROS UNICOS e INFO INVÁLIDA
            else {
                var allNumbers = answer.split(',');
                for (let index = 0; index < allNumbers.length; index++) {
                    var count = 0;
                    const element = allNumbers[index];
                    if ( isNaN(element) ) {
                        count++;
                    }
                }
                if (count == 0) {
                    arrayJogadores[index].jogada(allNumbers, allNumbers.length);
                    numeroRoleta = roleta.rodada();
                    console.log("A roleta girou : " + numeroRoleta);
                    var quantidade_perdida = 0;
                    for (ind = 0; ind < allNumbers.length; ind++) {
                        if (Number(allNumbers[ind]) === numeroRoleta) {
                            // ganho playboy

                            //calcular bugdet do jogador 
                            arrayJogadores[index].setBudget(arrayJogadores[index].getBudget() + allNumbers.length*2);
                            
                            // Calcular bugdet da banca
                            banca.setBudget(banca.getBudget() - allNumbers.length);
                        
                            console.log("Você ganho safado!");
            
                            console.log("Agora você tem " + arrayJogadores[index].getBudget());
                            console.log("Agora a banca tem " + banca.getBudget());
                            break;
                        } else {
                            // perdeu safadão
                            quantidade_perdida++;
                            if ( quantidade_perdida == allNumbers.length) {
                                // Calcular bugdet da banca
                                banca.setBudget(banca.getBudget() + allNumbers.length);
                
                                console.log("Você perdeu otário!");
                
                                console.log("Agora você tem " + arrayJogadores[index].getBudget());
                                console.log("Agora a banca tem " + banca.getBudget());
                            }
                        } 
                    }
                    createJogada(roleta, banca, arrayJogadores);
                } else {
                    console.log("Você precisa entrar uma informação válida!");
                    createJogada(roleta, banca, arrayJogadores);
                }
            } 
        });
    }
}


createJogadores();
