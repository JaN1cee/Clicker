var game = {
  score: 0,
  totalScore: 0,
  totalClicks: 0,
  clickAmount: 1,
  version: 0.0,

  addToScore: function (clickAmount) {
    this.score += clickAmount;
    this.totalScore += clickAmount;
    display.updateScore();
  },
  getScorePerSecond: function () {
    var scorePerSecond = 0;
    for (i = 0; i < building.name.length; i++) {
      scorePerSecond += building.income[i] * building.count[i];
    }
    return scorePerSecond;
  },
};

var building = {
  name: ["Farmer", "Swordsmen", "Archer"],
  count: [0, 0, 0],
  income: [0.5, 2, 10],
  cost: [10, 100, 1000],

  purchase: function (index) {
    if (game.score >= this.cost[index]) {
      game.score -= this.cost[index];
      this.count[index]++;
      this.cost[index] = Math.ceil(this.cost[index] * 1.15);
      display.updateScore();
      display.updateShop();
    }
  },
};

var display = {
  updateScore: function () {
    document.getElementById("score").innerHTML = game.score;
    document.getElementById(
      "scorePerSecond"
    ).innerHTML = game.getScorePerSecond();
    document.title = game.score + " Clicks";
  },

  updateShop: function () {
    document.getElementById("shopContainer").innerHTML = "";
    for (i = 0; i < building.name.length; i++) {
      document.getElementById("shopContainer").innerHTML += "";
    }
  },
};

window.onload = function () {
  display.updateScore();
  display.updateShop();
};
