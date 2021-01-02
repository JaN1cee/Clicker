var score = 100000;
var scorePerSecond = 0;
var clickAmount = 1;

var farmer = 0;
var swordsmen = 0;

var farmerCost = 10;
var swordsmenCost = 100;

function addToScore(clickAmount) {
  score = score + clickAmount;
  document.getElementById("score").innerHTML = score;
}

function addFarmer() {
  if (score >= farmerCost) {
    score = score - farmerCost;
    farmer = farmer + 1;
    farmerCost = Math.round(farmerCost * 1.15);

    document.getElementById("score").innerHTML = score;
    document.getElementById("farmer").innerHTML = farmer;
    document.getElementById("farmerCost").innerHTML = farmerCost;
    updateScorePerSecond();
  }
}

function addSwordsmen() {
  if (score >= swordsmenCost) {
    score = score - swordsmenCost;
    swordsmen = swordsmen + 1;
    swordsmenCost = Math.round(swordsmenCost * 1.15);

    document.getElementById("score").innerHTML = score;
    document.getElementById("swordsmen").innerHTML = swordsmen;
    document.getElementById("swordsmenCost").innerHTML = swordsmenCost;
    updateScorePerSecond();
  }
}

function updateScorePerSecond() {
  scorePerSecond = farmer * 0.5 + swordsmen * 2;
  document.getElementById("scorePerSecond").innerHTML = scorePerSecond;
}

setInterval(function () {
  score = score + farmer * 0.5 + swordsmen * 2;
  document.getElementById("score").innerHTML = score;
}, 1000);

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

function saveGame() {
  var gameSave = {
    score: score,
    clickAmount: clickAmount,

    farmer: farmer,
    farmerCost: farmerCost,

    swordsmen: swordsmen,
    swordsmenCost: swordsmenCost,
  };
  localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
  var savedGame = JSON.parse(localStorage.getItem("gameSave"));
  if (typeof savedGame.score !== "undefined") score = savedGame.score;
  if (typeof savedGame.clickAmount !== "undefined")
    clickAmount = savedGame.clickAmount;

  if (typeof savedGame.farmer !== "undefined") farmer = savedGame.farmer;
  if (typeof savedGame.farmerCost !== "undefined")
    farmerCost = savedGame.farmerCost;

  if (typeof savedGame.swordsmen !== "undefined")
    swordsmen = savedGame.swordsmen;
  if (typeof savedGame.swordsmenCost !== "undefined")
    swordsmenCost = savedGame.swordsmenCost;
}

window.onload = function () {
  loadGame();
  updateScorePerSecond();
  document.getElementById("scorePerSecond").innerHTML = scorePerSecond;

  document.getElementById("score").innerHTML = score;
  document.getElementById("swordsmen").innerHTML = swordsmen;
  document.getElementById("swordsmenCost").innerHTML = swordsmenCost;

  document.getElementById("score").innerHTML = score;
  document.getElementById("farmer").innerHTML = farmer;
  document.getElementById("farmerCost").innerHTML = farmerCost;
};
