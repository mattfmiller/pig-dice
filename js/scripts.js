//Business Logic
function Player(userName,score) {
  this.userName = userName;
  this.score = score;
}

Player.prototype.totalScore = function (number) {
  return this.score += number;
};

var playerArray = [];
var rollArray = [0];

function rollDice(number) {
  return Math.floor(Math.random() * Math.floor(number)) + 1;
}

function getSum(total, number) {
  return total + number;
}

function rollArrayTotal(sum) {
  return rollArray.reduce(sum)
}

function runningRollDice() {
  rollArray.push(rollDice(6))
  return rollArrayTotal(getSum);
}

function emptyRollArray() {
 return rollArray = [0];
}

//User Logic
$(function(){
  $("#player1-form").submit(function(event){
    event.preventDefault();
    var p1Name = $("#p1InputName").val();
    var playerObject = new Player(p1Name, 0);
    var computerObject = new Player("Bob", 0);
    playerArray.push(playerObject, computerObject);
    $("#player1-name").text(p1Name);
    $("#player1-scorecard").fadeIn();
    $("#player2-name").text("Bob");
    $("#player2-scorecard").fadeIn();
    $("#p1-hide").hide();
  });

  $("#roll-button").click(function(){
    var p1CurrentRunningTotal = runningRollDice();
    var currentRollPlayer= rollArray[rollArray.length-1];
    console.log(rollArray);
    if (currentRollPlayer === 1) {
      $("#p1runningTotal").text(0);
      emptyRollArray();
      //computer turn
      for (var i = 0; i < 2; i++) {
        runningRollDice();
        var currentRollComputer= rollArray[rollArray.length-1];
        console.log(rollArray);
        if (currentRollComputer === 1) {
          emptyRollArray();
          i=2;
          $("#p2runningTotal").text(0);
        } else {
          $("#p2runningTotal").text(rollArrayTotal(getSum));
        }
      }
      playerArray[1].totalScore(rollArrayTotal(getSum));
      $("#p2scoreTotal").text(playerArray[1].score);
      emptyRollArray();
    } else {
      $("#p1runningTotal").text(p1CurrentRunningTotal);
    }
    $("#rollDisplay p").text(currentRollPlayer);
    $("#player1-scorecard").show();
    $("#rollDisplay").show();
  });

  $("#hold-button").click(function(){
    playerArray[0].totalScore(rollArrayTotal(getSum));
    $("#p1scoreTotal").text(playerArray[0].score);
    emptyRollArray();
    $("#p1runningTotal").text(0);
    //computer turn
    for (var i = 0; i < 2; i++) {
      runningRollDice();
      var currentRollComputer= rollArray[rollArray.length-1];
      console.log(rollArray);
      if (currentRollComputer === 1) {
        emptyRollArray();
        i=2;
        $("#p2runningTotal").text(0);
      } else {
        $("#p2runningTotal").text(rollArrayTotal(getSum));
      }
    }
    playerArray[1].totalScore(rollArrayTotal(getSum));
    $("#p2scoreTotal").text(playerArray[1].score);
    emptyRollArray();
  });
});
