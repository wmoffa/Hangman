// instructor note:

// I had one hell of a time with the confirm and alerts. Seems that the last js line prior to
// the confirms and alerts were not executing. I researched this and the seems to be happening
// but there was no solution.

// Also the jquery .hide and .empty were not working and I am not sure why, but I solved this problem
// with a work around. 

// one of the tools I really needed was a way to pause for a prompt - I originally used the confirm, but
// as I stated above, it caused other problems





$(document).ready(function() {
		// set up global variables
		var charsUsed = "";
		var displayStage;
		var maxAttempts = 0;
		var gameStatus   = "n";

		var artists      = ["JEFFERSON AIRPLANE",
                            "JETRO TULL",
                            "JIMI HENDRIX",
                            "ROLLING STONES",
                            "YOUNG RASCALS",
                            "ERIC CLAPTON"
                            ];
		var hints        = ["They needed this to fly with the third President",
                            "They had nothing to do with water, but they did have a aqualung",
                            "Hey Joe, Are you experienced with purple haze?",
                            "They can't get satisfied",
                            "Their Lovin has to be good and they like to groove on a Sunday afternoon",
                            "He was once a bird, then he became the main ingredient in Cream"
                            ]
		var userChoice;
		var message = "";
		var gameNo       = 6;
		var artistsName;
		var openSelection;
        	var alertFlag = 0;
		var previousStatus;
		var letterUsed = "";
		var letterFound = "";
        var hmimg          = ["hangman.png",
                            "hangman1.png",
                            "hangman2.png",
                            "hangman3.png",
                            "hangman4.png",
                            "hangman5.png",
                            "hangman6.png"
                            ]

        initGame()
		checkStatus();

//if(gameStatus = 'play') {

	document.onkeyup = function(event) {

                if(gameStatus == "pause") {
                    initGame();
                    checkStatus()
                    $("#alertBox").html("<img src='assets/images/blank.png'>");
                }

                if(gameStatus != 'play') {
                    return
                }

                // this will clear the you won you lost images
             //   $("#alertBox").html("<img src='assets/images/blank.png'>")

		        updateScreen()

		        userChoice = event.key;
		        letterType = event.code

	            // test if entry is a valid key
	            userChoiceValid = letterType.startsWith('Key');

	            if(userChoiceValid) {
	            	userChoice = userChoice.toUpperCase();            	
	            	validateAndProcess();
	            	checkStatus()

	            } // end of UserChoiceValid condition 
			} // end of keyup
		//} // end of gameStatus play condition


	function initGame() {
		charsUsed    = "";
		displayStage = "";
		// displayMan = ["","","","",""];
		maxAttempts  = 0;
		userChoice   = "";
		message		 = "";
		gameNo       = gameNo - 1;        
		artistsName  = artists[gameNo];
        // the following will initially set the display stage to underscores
        openSelection = "[ABCDEFGHIJKLMNOPQRSTUVWXYZ]";
        reg = new RegExp(openSelection, "g");
        userChoice = "#";
        updateScreen();
        updateBody();
        gameStatus = 'play';

	} // end of function init game


	function updateScreen() {
		reg = RegExp(userChoice, "g");
		openSelection = openSelection.replace(reg,"#");

		var reg = RegExp(openSelection, "g");
		displayStage = artistsName.replace(reg, "-");

        $("#displayStage").html(displayStage);
        $("#hintBox").html("<h4>Hint:</h4> <h4>"+hints[gameNo]+"</h4>");

        $("#charsUsed").html(charsUsed.split(""));
        $("#message").html(message);
        $("#maxAttempts").html("Lives Remaining " +(6 -maxAttempts));

    }  // end of function update screen

    // this function builds the hangmans body
    function updateBody() {
        $("#deadMan").html("<img src='assets/images/"+hmimg[maxAttempts]+"' </img>")
    } // end of function update body

    function validateAndProcess() {
    		// check if letter was used before
    		if(charsUsed.search(userChoice) != -1) {
    			message = "This letter has been used before";
    			$("#message").css('color- ','blue');
    		} else {
    			charsUsed = charsUsed + userChoice;

    			if(artistsName.search(userChoice) != -1) {
    				message = "Yes. we found a hit!!";
    			//	updateScreen()
    				$("#message").css('color','black')
    			} else {
    				maxAttempts += 1;
    				message = "The letter " + userChoice + " is not in the artists name";
    				$("#message").css('color','red')
    			//	updateScreen()
    			//	updateBody();
    			}
    		}
            updateScreen()
            updateBody()
    		checkStatus()
    		//charsUsed = charsUsed + userChoice;

    } // end of function ValidateandProcess

    function checkStatus() {	
    	if((displayStage == artistsName) || (maxAttempts == 6)) {			
    		gameStatus = 'pause';
            alertFlag = 1;
    		if(maxAttempts == 6) {

                $("#alertBox").html("<img src='assets/images/youlost.png'>")
                $('#alertBox').show				   
    			message = "Sorry - you lost";
                $("#deadMan").html("<img src='assets/images/"+hmimg[6]+"'>");
	
    		} else {
                $("#alertBox").html("<img src='assets/images/youwon.png'>")
                $('#alertBox').show;
    			message = "You Won - Great Job";		
    		}
    		updateScreen();

    		if(gameNo == 0) {
    			gameStatus = 'end'
    		}    		
     } // end of check current game status
     switch(gameStatus) {

     	case 'new':
     	      updateScreen();
     	      break;
     	case 'end':                 
                $("#alertBox").html("<img src='assets/images/thanks.png'>")
                $('#alertBox').show;
     	break;
     }
        // check if user wants to play another game
        //console.log(gameStatus);

        console.log(gameStatus)
        if(gameStatus == 'play') {
            console.log("i am here")
        	initGame();
        }
    }


}) //ready
