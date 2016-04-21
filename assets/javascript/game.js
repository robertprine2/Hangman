//waits for js to start until after html has loaded

$(document).ready(function(){

	// sets the picture array pick order to index 0

	var zPicNum = 0;

	// zombie pictures as the game progresses

	var zombieParts = ["assets/images/zombie13.png", "assets/images/zombie12.png", "assets/images/zombie11.png", "assets/images/zombie10.png", "assets/images/zombie9.png", "assets/images/zombie8.png", "assets/images/zombie7.png", "assets/images/zombie6.png", "assets/images/zombie5.png", "assets/images/zombie4.png", "assets/images/zombie3.png", "assets/images/zombie2.png", "assets/images/zombie1.png", "assets/images/zombiehead.png", "assets/images/zombie13.png"];

	// sound effects for eating a brain

	var brains = ["assets/sounds/brains.wav", "assets/sounds/brains-dad.wav"];

	//sound effects for getting a letter right

	var scream = ["assets/sounds/scream-dad.wav", "assets/sounds/scream-getaway.wav", "assets/sounds/scream.wav", "assets/sounds/scream-kid.wav", "assets/sounds/scream-male.wav", "assets/sounds/scream-whatisthat.wav"];

	//sound effects for getting a letter wrong repeats to let cat and cow be less likely

	var limb = ["assets/sounds/limb-chop.wav", "assets/sounds/limb-chop.wav", "assets/sounds/limb-chop.wav", "assets/sounds/limb-chop.wav", "assets/sounds/limb-chop.wav", "assets/sounds/limb-chainsaw.wav", "assets/sounds/limb-chainsaw.wav", "assets/sounds/limb-chainsaw.wav", "assets/sounds/limb-chainsaw.wav", "assets/sounds/limb-chainsaw.wav", "assets/sounds/limb-cat.wav", "assets/sounds/limb-cow.wav"];

	//object with variables that I don't understand the point of, but I have an object! :)

	var game = {

		//The array of words that the computer can choose at random for the password

		words: ["ankle biters", "infected", "roamers", "risen", "living dead", "walking dead", "undead", "walkers", "corpse", "death", "disembody", "disembowel", "monster", "nightmare", "brains", "survival", "molotov cocktail", "traumatize", "crowbar", "machete", "tourniquet", "cadaverous", "fester", "armageddon"],

		// The array of guessed letters that are not in the password

		guessedLetters: [],

		// The array of the _ and letters guessed in the password so far

		letters_: [],

		// The variable of the password (word that player has to guess) that the game picked at random

		randword: "",

		// the key pressed by the player

		userGuess: "",

		//total brains eaten

		brains: 0,

		// Number of guesses user gets based on body parts they still have remaining

		bodyparts: 14,

		//function to start the game/reset the game

		startGame: function(){

			//pick a word at random

			game.randword = game.words[Math.floor(Math.random() * game.words.length)];

			console.log(game.randword);

			// clear game.letters_

			$(".password").html("");

			//clear game.guessedLetters

			$(".guessed").html("");

			//adds brains and body part score to picture

			$("#brainsAmount").html("Brains Eaten: " + game.brains);

			$("#bodyAmount").html("Body Pieces Remaining: " + game.bodyparts);

			// List _ for each letter

			for (var i=0; i < game.randword.length; i++) {

				// pushes a _ to the array for each letter in the randword variable

				game.letters_.push(" _ ");

				//fill in spaces with spaces

				if (game.randword[i] == " ") {
					game.letters_[i] = "&nbsp;&nbsp;&nbsp;"; 
				} // ends if statment

				//print to user's screen letters_[i];

				$(".password").append(game.letters_[i]);

				console.log(game.letters_[i]);

			} //ends for loop

			// sets zPicNum to 0 then puts the starting zombie picture up

			$('.zombie').html("<img src='" +zombieParts[zPicNum] + "'>");

		} //ends startGame function

	} //ends game object

	// call start game function

	game.startGame();
	console.log(game.letters_);

	// press any letter to start guessing

	document.onkeyup = function(event) {

		// sets variable userGuess to the key that was pressed by the player

		game.userGuess = String.fromCharCode(event.keyCode).toLowerCase();

		console.log(game.userGuess);
		
		// if statement to make sure that the keypress is a letter

		if (event.keyCode >= 65 && event.keyCode <= 90) {

			// if it has already been guessed prompt user for another guess

			var alreadyGuessed = game.guessedLetters.indexOf(game.userGuess);
		 
			var alreadyGot = game.letters_.indexOf(game.userGuess);

			if (alreadyGuessed != -1 || alreadyGot != -1) {
				$(".fadein").html("You have already guessed that letter!");;
			} //end if already guessed letters

			//If it isn't a previously guessed letter proceed with code

			else {

				// reset fadein information

				$(".fadein").html("");

				// if correct write the letter(s) in the space(s) they go

				for (index = game.randword.indexOf(game.userGuess); index >= 0; index = game.randword.indexOf(game.userGuess, index + 1)) {

					if (index != -1) {
						game.letters_[index] = game.userGuess;

					// print new letters to screen 

					$(".password").html(game.letters_[0]);

					for (var i = 1; i < game.letters_.length; i++) {
						var password = game.letters_[i];
						$(".password").append(password);
					} //end of for loop to print game.letters_

					//scream/get away from me sound effect at random
					
					new Audio(scream[Math.floor(Math.random() * scream.length)]).play();

					} //end if statement for correct letter guess
				} //end of for loop

					// if it is not in the randword put it under lettersGuessed and cut off a limb plus sound effect

					if(game.randword.indexOf(game.userGuess) == -1){

						//add to letters guessed section

						game.guessedLetters.push(game.userGuess);

						$(".guessed").append(game.userGuess);
						
						console.log(game.guessedLetters);
						
						//cut off a bodypart

						game.bodyparts--;

						$("#bodyAmount").html("Body Pieces Remaining: " + game.bodyparts);

						//play cutting off limb sound effect

						new Audio(limb[Math.floor(Math.random() * limb.length)]).play();

						//update picture to match bodyparts

						zPicNum = zPicNum + 1;
						$('.zombie').html("<img src='" +zombieParts[zPicNum] + "'>");

						//You lose if you have no body parts left and the game starts over

						if (game.bodyparts <= 0) {

							// ********You lost fade in -doesn't fade in:(

							// function unfade(element) {
							//     var op = 0.1;  // initial opacity
							//     var timer = setInterval(function () {
							//         if (op >= 1){
							//             clearInterval(timer);
							//         }
							//         element.style.opacity = op;
							//         op = op + 0.1;
							//     }, 1000);
							// }							

							// var lost = $(".fadein").html("You have been sliced to bits! No more brains for you!");

							// unfade(lost);

							$(".fadein").html("You have been sliced to bits! No more brains for you! The correct word was: ");

							// *******print the correct word so that they know - won't append

							$(".fadin").append(game.randword);
							console.log(game.randword);

							//reset brains and bodyparts and picture

							game.brains = 0;

							console.log(game.brains);

							game.bodyparts = 14;

							console.log(game.bodyparts);

							zPicNum = 0;

							//clears letters_ and guessedLetters arrays so you can try again

							game.letters_ = [];

							game.guessedLetters = [];

							// picks another random word

							game.startGame();
							
						} //end of if statement for losing

					} //end of if statment for missing a letter
				
				console.log(game.letters_);
				console.log(game.guessedLetters);

				// If you get the word, you get brains, clears arrays, plays sound clip of a zombie saying "mmm brains", and picks a new randword

				if (game.letters_.indexOf(" _ ") == -1) {
					
					// Add one to brains eaten count

					game.brains++;

					$("#brainsAmount").html("Brains Eaten: " + game.brains);

					//plays a sound clip of a zombie saying "mmm brains"

					new Audio(brains[Math.floor(Math.random() * brains.length)]).play();

					//clears letters_ and guessedLetters arrays so you can try and eat more brains

					game.letters_ = [];

					game.guessedLetters = [];

					// picks another random word

					game.startGame();

				} //ends if statement for getting a brain

			} // ends else statment after the check to see if it was a letter key

		} //ends if statement checking to see if key was a letter

		// tell the player that they have not hit a letter through fade in

		else {
			$(".fadein").html("You should only guess letters!");
		} // ends else statement for if user didn't click a letter

	} //end of key press function

}) //ends ready function