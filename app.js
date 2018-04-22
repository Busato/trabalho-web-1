/* PARA RODAR - npm install
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

class Jogador {

  constructor (budget, codigo){
    this.budget=budget;
    this.codigo=codigo;
    this.aposta =0;
  }
  getBudget(){
    return this.budget;
  }
  setBudget(budget){
    this.budget = budget;
  }
  getAposta(){
    return this.aposta;
  }
  getCodigo(){
    return this.codigo;
  }
//novo
  jogada (aposta, codigo){
    this.budget = this.budget-1;
    this.aposta = aposta;
    this.codigo = codigo;
  }
}

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.write("Roleta:\n");

function createRoleta(){
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
            createJogada(roleta);
        }
    });
}

// fazer a jogada (loop)
function createJogada (roleta) {
    rl.question("Qual vai ser a sua jogada?(par/impar, vermelho/preto, altos/baixos, numero único)" , function(answer) {
        /* OS NUMEROS IMPARES SERÃO PRETOS E OS NUMEROS PARES SERÃO VERMELHOS */
        if (answer == 'par' || answer == 'impar') {
            jogador1.jogada(answer);
            numeroRoleta = roleta.rodada();
            console.log("A roleta girou : " + numeroRoleta);
            if (numeroRoleta % 2 === 0 ) {
                paridadeRoleta = 'par';
            } else {
                paridadeRoleta = 'impar';
            }
            if (paridadeRoleta === answer) {
               //calcular bugdet do jogador 
               jogador1.setBudget(jogador1.getBudget() + 2);
 
               // Calcular bugdet da banca
               banca.setBudget(banca.getBudget() - 1);

               console.log("Você ganho safado!");

               console.log("Agora você tem " + jogador1.getBudget());
               console.log("Agora a banca tem " + banca.getBudget());
               createJogada(roleta);
            } else {
                
              //calcular bugdet do jogador 
              //jogador1.setBudget(jogador1.getBudget() - 2);
 
              // Calcular bugdet da banca
              banca.setBudget(banca.getBudget() + 1);

              console.log("Você perdeu otário!");

              console.log("Agora você tem " + jogador1.getBudget());
              console.log("Agora a banca tem " + banca.getBudget());

              createJogada(roleta);
            }
        } else if (answer == 'vermelho' || answer == 'preto') {
            jogador1.jogada(answer);
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

                    //calcular bugdet do jogador 
                    //jogador1.setBudget(jogador1.getBudget() - 2);
 
                    // Calcular bugdet da banca
                    banca.setBudget(banca.getBudget() + 1);

                    console.log("Você perdeu otário!");

                   console.log("Agora você tem " + jogador1.getBudget());
                   console.log("Agora a banca tem " + banca.getBudget());

                   createJogada(roleta);
                } else {
                    // ganho safadão
                      
                    //calcular bugdet do jogador 
                    jogador1.setBudget(jogador1.getBudget() + 2);
        
                    // Calcular bugdet da banca
                    banca.setBudget(banca.getBudget() - 1);

                    console.log("Você ganho safado!");

                    console.log("Agora você tem " + jogador1.getBudget());
                    console.log("Agora a banca tem " + banca.getBudget());

                    createJogada(roleta);
                }
            } else {
                if (paridadeRoleta == 'Impar') {
                    // ganho playboy

                    //calcular bugdet do jogador 
                    jogador1.setBudget(jogador1.getBudget() + 2);
 
                    // Calcular bugdet da banca
                    banca.setBudget(banca.getBudget() - 1);

                    console.log("Você ganho safado!");

                    console.log("Agora você tem " + jogador1.getBudget());
                    console.log("Agora a banca tem " + banca.getBudget());
                           
                    createJogada(roleta);
                } else {
                    // perdeu safadão
                    
                    //calcular bugdet do jogador 
                    j//ogador1.setBudget(jogador1.getBudget() - 2);
        
                    // Calcular bugdet da banca
                    banca.setBudget(banca.getBudget() + 1);

                    console.log("Você perdeu otário!");

                    console.log("Agora você tem " + jogador1.getBudget());
                    console.log("Agora a banca tem " + banca.getBudget());
                                              
                    createJogada(roleta);
                }
            }
        } else if (answer == 'altos' || answer == 'baixos') {
            jogador1.jogada(answer);
            numeroRoleta = roleta.rodada();
            console.log("A roleta girou : " + numeroRoleta);
            numeroTotalRoleta = roleta.getNumero();
            numeroTotalRoleta = numeroTotalRoleta/2;
            if (answer == 'altos') {
                if (numeroTotalRoleta > numeroRoleta) {
                    // perdeu playboy
                    
                    //calcular bugdet do jogador 
                    //jogador1.setBudget(jogador1.getBudget() - 2);
        
                    // Calcular bugdet da banca
                    banca.setBudget(banca.getBudget() + 1);
                   
                    console.log("Você perdeu otário!");

                    console.log("Agora você tem " + jogador1.getBudget());
                    console.log("Agora a banca tem " + banca.getBudget());
                                              
                    createJogada(roleta);
                } else {
                    // ganho safadão
                    
                    //calcular bugdet do jogador 
                    jogador1.setBudget(jogador1.getBudget() + 2);
        
                    // Calcular bugdet da banca
                    banca.setBudget(banca.getBudget() - 1);
                   
                    console.log("Você ganho safado!");

                    console.log("Agora você tem " + jogador1.getBudget());
                    console.log("Agora a banca tem " + banca.getBudget());
                                              
                    createJogada(roleta);
                }
            } else {
                if (numeroTotalRoleta > numeroRoleta) {
                    // ganho playboy

                    //calcular bugdet do jogador 
                    jogador1.setBudget(jogador1.getBudget() + 2);
        
                    // Calcular bugdet da banca
                    banca.setBudget(banca.getBudget() - 1);
                   
                    console.log("Você ganho safado!");

                    console.log("Agora você tem " + jogador1.getBudget());
                    console.log("Agora a banca tem " + banca.getBudget());
                                              
                    createJogada(roleta);
                } else {
                    // perdeu safadão

                    //calcular bugdet do jogador 
                    //jogador1.setBudget(jogador1.getBudget() - 2);
        
                    // Calcular bugdet da banca
                    banca.setBudget(banca.getBudget() + 1);
                   
                    console.log("Você perdeu otário!");

                    console.log("Agora você tem " + jogador1.getBudget());
                    console.log("Agora a banca tem " + banca.getBudget());
                                              
                    createJogada(roleta);
                }
            }
        } else if (!isNaN(answer)) {
            jogador1.jogada(answer);
            numeroRoleta = roleta.rodada();
            console.log("A roleta girou : " + numeroRoleta);
            if (Number(answer) === numeroRoleta) {
                // ganho playboy

                //calcular bugdet do jogador 
                jogador1.setBudget(jogador1.getBudget() + 2);
            
                // Calcular bugdet da banca
                banca.setBudget(banca.getBudget() - 1);
               
                console.log("Você ganho safado!");

                console.log("Agora você tem " + jogador1.getBudget());
                console.log("Agora a banca tem " + banca.getBudget());
                                          
                createJogada(roleta);
            } else {
                // perdeu safadão

                //calcular bugdet do jogador 
                //jogador1.setBudget(jogador1.getBudget() - 2);
            
                // Calcular bugdet da banca
                banca.setBudget(banca.getBudget() + 1);

                console.log("Você perdeu otário!");

                console.log("Agora você tem " + jogador1.getBudget());
                console.log("Agora a banca tem " + banca.getBudget());
                
                createJogada(roleta);
            }
        }  else {
            console.log("Você precisa entrar uma informação válida!");
            createJogada(roleta);
        }
    });
}

const jogador1 = new Jogador(100, 1);
console.log("Jogador inicializado com " + jogador1.getBudget());

const banca = new Banca(500);
console.log("Banca inicializada com " + banca.getBudget());

createRoleta();

/*
for(ind = 1; jogadoresArray.length > ind ; ind++ ) {
    createJogada(jogadoresArray[ind]);
}
*/

/*
const roleta = new Roleta( 7);
const jog1 = new Jogador(100);

jog1.jogada(20,13);
console.log(roleta.rodada());
console.log(jog1.getbudget());
console.log(jog1.getAposta());
*/


