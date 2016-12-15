// <--------GLOBALS-------->
// This Cannot Be Changed
const freshDeck = createDeck();
// This cannot be changed
var theDeck = createDeck();
var playersHand =[];
var dealersHand = [];

// Will call the create deck function
// console.log(theDeck);

// FUNCTIONS
// createDeck();
// shuffleDeck();


// ES6 anonymous function ()=>



$(document).ready(function(){
	// DEAL BUTTON
	$(".deal-button").click(function(){
		
		shuffleDeck();
		// GIVE PLAYER A CARD GIVE DEALER A CARD
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());	
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());

		// PLAYERS CARDS
		placeCard("player",1, playersHand[0]);
		placeCard("player",2, playersHand[1]);
		calculateTotal(playersHand,"player");
		
		// DEALERS CARDS
		placeCard("dealer",1, dealersHand[0]);
		placeCard("dealer",2, "deck");
		calculateTotal(dealersHand,"dealer");
		// console.log(true);
		// Check for a winer on the deal

		// ADD THE DEALING ANIMATION
		$(".card-1").addClass("dealcard-"+1);

	});

	// HIT BUTTON
	$(".hit-button").click(function(){
		// This is the returned value fo the players total
		var playerTotal = calculateTotal(playersHand, "player");
		// console.log(playerTotal);
		if(playerTotal <21){
			// Add another card for Player
			playersHand.push(theDeck.shift());
			var slotForNewPlayerCard =playersHand.length;
			console.log(playersHand.length);
			// Update the Players total
			var lastPlayerCardIndex = playersHand.length-1;
			placeCard("player", slotForNewPlayerCard, playersHand[lastPlayerCardIndex]);
			calculateTotal(playersHand, "player");
		}
		checkWin();
	});

	// STAND BUTTON
	$(".stand-button").click(function(){
		// What happens to player now
		// control now goes to the dealer
		var dealerTotal = calculateTotal(dealersHand, "dealer"); 
		placeCard("dealer",2, dealersHand[1]);
		while(dealerTotal < 17){
			dealersHand.push(theDeck.shift());
			var slotForNewDealerCard =dealersHand.length;
			var lastDealerCardIndex = dealersHand.length-1;
			placeCard("dealer",slotForNewDealerCard,dealersHand[lastDealerCardIndex])
			dealerTotal = calculateTotal(dealersHand, "dealer");
		}
	});

	$(".reset-button").click(function(){
		resetGame();
	});
}); 


// A FUNCTION TO CREATE THE DECK
function createDeck(){
	var newDeck =[];	
	// 4 suits to choose from
	var suits = ["h","s","d","c"];
	// Use a nested for loop to target each card of each suit
	for(let s=0;s<suits.length;s++){
		// for loop to target each card
		for(let c=1;c<=13;c++){
			newDeck.push(c+suits[s]);
		}
	}
	return newDeck;	
}
// A FUNCTION TO SHUFFLE THE DECK
function shuffleDeck(){
	// console.log(theDeck);
	for(let i=0;i<9000;i++){
		var randomCard1 = Math.floor(Math.random()*theDeck.length);
		var randomCard2 = Math.floor(Math.random()*theDeck.length);
		// switch theDeck[random1] with theDeck[random2]
		// store the value of theDeck[random1]
		var temp = theDeck[randomCard1];
		// overwrite theDeck[random1] with theDeck[random2]
		theDeck[randomCard1]=theDeck[randomCard2];
		// overwrite theDeck[random2] with temp
		theDeck[randomCard2]=temp;
		// console.log(true);
	}
	// console.log(theDeck);
	return theDeck;
}
// A FUNCTION TO PLACE THE CARD 
function placeCard(who, where, whatCard){
	// Create the class selector as a string using the parameters
	var classSelector = "."+who+"-cards .card-"+where;
	$(classSelector).html("<img src='../cards/"+whatCard+".png'>");
}

// A FUNCTION TO CALCULATE TOTAL
function calculateTotal(hand, who){
	// Initialize a total 
	var total = 0;
	// Temp value to store the cardvalue
	var aceCounter =0;
	var cardValue;
	for(let i=0;i<hand.length;i++){
		cardValue = Number(hand[i].slice(0,-1));
		// FACE CARD LOGIC If the card is a face card
		if(cardValue >10){
			cardValue =10;
		}
		// ACE LOGIC If the card is an Ace
		if((cardValue === 1)&&(total<11)){
			cardValue = 11;
			aceCounter ++;
			console.log(aceCounter);
		}
		if((cardValue ===1)&&(total>21)){

		}
		total += cardValue;
	}
	for(let i=0;i<aceCounter;i++){
		if(total > 21){
			total -= 10;
		}
	}
	// console.log(total);
	var classSelector = "."+who+"-total-number";
	$(classSelector).html(total);
	// console.log(total);
	return total;
}

// A FUNCTION TO CHECK WHO WON 
function checkWin(){
	var playerTotal = calculateTotal(playersHand,"player");
	var dealerTotal = calculateTotal(dealersHand, "dealer");
	console.log(playerTotal);
	console.log(dealerTotal);
	// If player has more than 21. Player Busts & Loses
	if(playerTotal > 21){
		winner = "dealer";
	}
	// If dealer has more than 21. Dealer busts 
	else if(dealerTotal>21){
		winner = "player";
	}

	else{
		// Player Won
		if(playerTotal > dealerTotal){
			winner = "player";
		}
		// Dealer Won
		else if (dealerTotal > playerTotal){
			winner = "dealer";
		}
		else if ((dealerTotal === playerTotal)&&(dealerTotal<18)){

		}
		// We have a tie!
		else{
			winner = "stand";
		}
	}
	console.log("The winner is "+ winner);
}

// A FUNCTION TO RESET THE DECK
function resetGame(){
	// The deck needs to be reset
	theDeck = createDeck();
	// The player and dealer hands need to reset
	playersHand = [];
	dealersHand =[];

	// reset the DOM 
	// -cards 
	$(".card").html("");
	// -totals
	var playerTotal = calculateTotal(playersHand,"player");
	var dealerTotal = calculateTotal(dealersHand, "dealer");
	// console.log(theDeck.length);
}







