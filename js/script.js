var score = 0;
var clickAmount = 1;


var farmer = 0;
var swordsmen = 0;

var farmerCost = 10;
var swordsmenCost = 100;



function addToScore(clickAmount) {
  score = score + clickAmount;
  document.getElementById("score").innerHTML = score;
}




function addFarmer(){
  if(score >= farmerCost){
    score = score - farmerCost;
    farmer = farmer + 1;
    farmerCost = Math.round(farmerCost * 1.15);
    
    document.getElementById("score").innerHTML = score;
    document.getElementById("farmer").innerHTML = farmer;
    document.getElementById("farmerCost").innerHTML = farmerCost;
    
  }
}

function addSwordsmen(){
  if(score >= swordsmenCost){
    score = score - swordsmenCost;
    swordsmen = swordsmen + 1;
    swordsmenCost = Math.round(swordsmenCost * 1.15);

    document.getElementById("score").innerHTML = score;
    document.getElementById("swordsmen").innerHTML = swordsmen;
    document.getElementById("swordsmenCost").innerHTML = swordsmenCost;
    
  }
}
