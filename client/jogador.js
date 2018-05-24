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
  module.exports = Jogador;