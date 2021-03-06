var game = {
  score: 0,
  totalScore: 0,
  totalClicks: 0,
  clickAmount: 1,
  version: 0.1,

  addToScore: function (amount) {
    this.score += amount;
    this.totalScore += amount;
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
  name: [" Farmer", " Swordsmen", " Archer", " Mage"],
  count: [0, 0, 0, 0],
  income: [0.5, 2, 10, 50],
  cost: [10, 100, 1000, 5000],

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
      document.getElementById("shopContainer").innerHTML +=
        '<table class="shopButton" onclick="building.purchase(' +
        i +
        ')"><tr><td id="nameAndCost"><p>' +
        building.name[i] +
        "</p><p>Cost: <span>" +
        building.cost[i] +
        '</span> Score</p></td><td id="amount">Amount: <span>' +
        building.count[i] +
        "</span></td></tr></table>";
    }
  },
};

function saveGame() {
  var GameSave = {
    score: game.score,
    totalScore: game.totalScore,
    totalClicks: game.totalClicks,
    clickAmount: game.clickAmount,
    version: game.version,
    buildingCount: building.count,
    buildingIncome: building.income,
    buildingCost: building.cost,
  };
  localStorage.setItem("gameSave", JSON.stringify(GameSave));
}

function loadGame() {
  var savedGame = JSON.parse(localStorage.getItem("gameSave"));
  if (localStorage.getItem("gameSave") !== null) {
    if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
    if (typeof savedGame.totalScore !== "undefined")
      game.totalScore = savedGame.totalScore;
    if (typeof savedGame.totalClicks !== "undefined")
      game.totalClicks = savedGame.totalClicks;
    if (typeof savedGame.clickAmount !== "undefined")
      game.clickAmount = savedGame.clickAmount;

    if (typeof savedGame.buildingCount !== "undefined") {
      for (i = 0; i < savedGame.buildingCount.length; i++) {
        building.count[i] = savedGame.buildingCount[i];
      }
    }

    if (typeof savedGame.buildingIncome !== "undefined") {
      for (i = 0; i < savedGame.buildingIncome.length; i++) {
        building.income[i] = savedGame.buildingIncome[i];
      }
    }

    if (typeof savedGame.buildingCost !== "undefined") {
      for (i = 0; i < savedGame.buildingCost.length; i++) {
        building.cost[i] = savedGame.buildingCost[i];
      }
    }
  }
}

window.onload = function () {
  loadGame();
  display.updateScore();
  display.updateShop();
};

setInterval(function () {
  game.score += game.getScorePerSecond();
  game.totalScore += game.getScorePerSecond();
  display.updateScore();
}, 1000);

function resetGame() {
  if (confirm("Are you sure you want to reset your game?")) {
    var gameSave = {};
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
    location.reload();
  }
}

setInterval(function () {
  saveGame();
}, 30000);

document.addEventListener(
  "keydown",
  function (event) {
    if (event.ctrlKey && event.which == 83) {
      event.preventDefault();
      saveGame();
    }
  },
  false
);
