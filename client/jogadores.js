const Jogador = require('./jogador.js');
class Jogadores {
    constructor(arraySize) {
      this.arrayJogadores = new Array();
      for (let index = 0; index < arraySize; index++) {
        const jogadorBudget = 100;
        this.arrayJogadores.push(new Jogador(jogadorBudget, index));
        console.log("Jogador" + index + " inicializado com " + jogadorBudget + " de bugdet \n");
      }
    }
  
    getJogadores() {
      return this.arrayJogadores;
    }
  }
module.exports = Jogadores;