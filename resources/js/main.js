$("document").ready(function() {
  let cardArray = MatchGame.generateCardValues();
  let $game = $("#game");
  MatchGame.renderCards(cardArray, $game);
})

var MatchGame = {};

let count = 0;

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

 MatchGame.generateCardValues = function () {
   let orderedCardValues = [];
   let randomCardValues = [];

   for (let i = 1; i < 9; i++) {
     orderedCardValues.push(i);
     orderedCardValues.push(i);
   }

   let j = 0;

   while (j < 16) {
     let randomIndex = Math.floor(Math.random() * orderedCardValues.length);
     let randomCard = orderedCardValues[randomIndex];
     randomCardValues.push(randomCard);
     orderedCardValues.splice(randomIndex, 1);
     j++;
   }
   return randomCardValues;
 };

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.empty();
  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)',
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  for (let valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
    let $newCard = $('<div class="card col-lg-3 col-sm-6"></div>');
    let cardValue = cardValues[valueIndex];
    let data = {
      value: cardValue,
      color: colors[valueIndex],
      flipped: false
    }
    $game.data("flippedCards", []);
    $newCard.data(data);
    $game.append($newCard);
  }
  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  let flippedStatus = $card.data("flipped");
  let cardColor = $card.data("color");
  let cardValue = $card.data("value");
  let flippedArray = $game.data("flippedCards");

  if (flippedStatus === true) {
    return;
  }

  if (flippedStatus === false) {
    $card.css("background-color", cardColor)
    .text(cardValue)
    .data("flipped", true);
    flippedArray.push($card);
  }

  if (flippedArray.length === 2) {
    if (flippedArray[0].data("value") === flippedArray[1].data("value")) {
      flippedArray[0].css("background-color", "green");
      flippedArray[1].css("background-color", "green");
      count += 1;
    } else if (flippedArray[0].data("value") !== flippedArray[1].data("value")) {
      window.setTimeout(function() {
        flippedArray[0].css("background-color", "")
        .text("")
        .data("flipped", false);
        flippedArray[1].css("background-color", "")
        .text("")
        .data("flipped", false);
      }, 350)
    }
    $game.data("flippedCards", []);
  }

  if (count === 8) {
    window.alert("ok ok you win already. hit refresh to play again");
  }
};
