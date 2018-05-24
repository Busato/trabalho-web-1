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
module.exports = Banca;