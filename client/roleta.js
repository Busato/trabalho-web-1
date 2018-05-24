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
  module.exports = Roleta;