$(document).ready(function(){
// GLOBAL VARIABLES
var theDeck =[];
var playersHand =[];
var dealersHand =[];




console.log(theDeck);
	// GET THE DEAL WORKING 
	// Listen for the click
	$(".deal-button").click(function(){
		// console.log(this);
		// Need a way to make the deck
		createDeck(); 
		shuffleDeck();
		// Add card 0, to the playersHand
		console.log(theDeck);
		playersHand.push(theDeck[0]);
		theDeck.shift(0);
		
		// Add card 1 to the dealers hand
		dealersHand.push(theDeck[0]);
		theDeck.shift(0);
		// Add card 2 to the players hand
		playersHand.push(theDeck[0]);
		theDeck.shift(0);
		// Add card 3 to the dealers hand
		dealersHand.push(theDeck[0]);
		theDeck.shift(0);
		console.log("After Deal " +theDeck);
		console.log("After Deal Dealers Hand" +dealersHand);
		console.log("After Deal Players Hand" +playersHand);
		// Put the first card in the players hand
		placeCard(playersHand[0], "player","one");
		// Put the second card in the players hand
		placeCard(playersHand[1], "player","two");
		// Put the first card in the dealers hand
		placeCard(dealersHand[0], "dealer","one");
		// Put the second card in the dealers hand
		placeCard(dealersHand[1], "dealer","two");

		calculateTotal("player", playersHand);
		calculateTotal("dealer", dealersHand);

	});
	// GET THE HIT WORKING 
	// Listen for the click 
	$(".hit-button").click(function(){
		// console.dir(this);
		hitCard();
	});
	// GET THE STAY WORKING
	// Listen for the click
	$(".stand-button").click(function(){
		// console.dir(this);
	});
function createDeck(){
	// Fill the deck with 52 cards 4suits (h,s,d,c) 
	var suits = ["h","s","d","c"];
	// Loop through all 4 suits array
	for(let s =0; s < suits.length; s++){
		for(let c=1;c<=13;c++){
			theDeck.push(c+suits[s]);
		}
	}
	// console.log(theDeck);
}

function shuffleDeck(){
	// switching elements in the array to create a shuffle 9000 times
	for(let i=0;i<9000;i++){
		var card1ToSwitch = Math.floor(Math.random()*theDeck.length);
		var card2ToSwitch = Math.floor(Math.random()*theDeck.length);
		var temp = theDeck[card1ToSwitch];
		// console.log("this is the first assignment "+temp+ " at index "+ card1ToSwitch);
		// console.log("now " + theDeck[card1ToSwitch] + " is where " + theDeck[card2ToSwitch] + " was at index "+ card2ToSwitch);
		theDeck[card1ToSwitch] = theDeck[card2ToSwitch];
		// console.log("now " + theDeck[card1ToSwitch] + " is where " + temp + " was at index "+ card1ToSwitch);
		theDeck[card2ToSwitch] = temp;		
	}
	// Reassignment
	// var temp = theDeck[3];
	// theDeck[3] = theDeck[41];
	// theDeck[41] = temp;
	// console.log(theDeck);
}

function placeCard(whatCard, who, whichSlot){
	var classToTarget = "."+who+"-cards .card-"+whichSlot;
	// console.log(classToTarget);
	$(classToTarget).html('<img src= "../cards/' +whatCard+ '.png">');
}

function calculateTotal(who, theirHand){
	var cardValue;
	var total = 0;
	for(let i=0;i<theirHand.length;i++){
		cardValue = Number(theirHand[i].slice(0,-1));
		if(cardValue > 10){
			cardValue = 10;
		}
		else{
		// console.log(cardValue);
		}
	total += cardValue;
	}
	var classToTarget = "."+who+"-total-number";
	$(classToTarget).text(total);
}
function hitCard(){

	playersHand.push(theDeck[0]);
	theDeck.shift(0);
	calculateTotal("player",playersHand)
	// console.log("After Hit " +theDeck);
	// console.log("After Hit Dealers Hand" +dealersHand);
	console.log("After Hit Players Hand" +playersHand);
	dealersHand.push(theDeck[0]);
	theDeck.shift(0);
	calculateTotal("dealer",dealersHand)
	// console.log("After Hit " +theDeck);
	console.log("After Hit Dealers Hand" +dealersHand);
	// console.log("After Hit Players Hand" +playersHand);
	// console.log("this is the hit card "+theDeck[4]);
	// placeCard();
}

});
