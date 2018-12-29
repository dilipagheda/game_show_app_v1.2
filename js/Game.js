/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor(missed=0, phrases, activePhrase=null){
         this.missed = missed;
         this.phrases = phrases;
         this.activePhrase = activePhrase;
     }

     //A function to start game. it first resets data from the previous game, generates a random phrase and then
     //prepares the game for play
     startGame(){
        //hide the start screen overlay
        $('#overlay h1').remove();
        $('#overlay').css('display','none');
        $('#overlay').removeClass('win lose');
        
        //reset data
        this.resetData();

        //generate a random phrase and set property of a Phrase object
        this.activePhrase = new Phrase(this.getRandomPhrase());
        //add new phrase
        this.activePhrase.addPhraseToDisplay();


     }

     //A function to generate and return a random phrase from the phrases array
     getRandomPhrase(){
        let arr = this.phrases; 
        let total = arr.length;
        let randomIndex = Math.floor(Math.random() * total);
        return this.phrases[randomIndex];
     }

     handleInteraction(buttonClicked){
        //Disable the selected letter’s onscreen keyboard button.
        $(buttonClicked).addClass('chosen animated pulse key');
        $(buttonClicked).prop('disabled',true);

        //check if the letter on a button clicked is part of the phrase or not
        let letterFound = this.activePhrase.checkLetter(buttonClicked);
        if(letterFound === false){
          //letter is not part of the phrase so remove life  
          this.removeLife();
        }else{
            //letter is part of the phrase so show that letter
            this.activePhrase.showMatchedLetter(buttonClicked);
        }
        //check here if a player has won or not
        this.checkForWin();

     }

     //A function to remove life. it hides one heart icon and reduces missed variable by 1.
     removeLife(){
        this.missed += 1;
        $(`#scoreboard ol li:nth-of-type(${this.missed})`).css('display','none');
        console.log(`missed:${this.missed}`);
     }

     //A function to check if user has won or not. it checks if all letters of the phrase are shown or not.
     //Then it checks if user has used all the remaining lives.
     checkForWin(){
        let totalWithClassLetter = $('#phrase ul li.letter').length;
        let totalWithClassShow = $('#phrase ul li.show').length;
        if(totalWithClassLetter === totalWithClassShow){
            this.gameOver(true);
        }
        if(this.missed >=5){
            this.gameOver(false);
        }
     }

     //A function to declare that a game is over by either win or lose message.
     //It brings back the overlay and resets game data.
     gameOver(win){
        this.resetData();
        if(win){
            $('#overlay').css('display','flex');
            $('#overlay').addClass('win');
            $('#overlay h2').after($('<h1>You Win!</h1>'))
        }else{
            $('#overlay').css('display','flex');
            $('#overlay').addClass('lose');
            $('#overlay h2').after($('<h1>You Lose!</h1>'))
        }

        /*
            Animate Start Game button after 2 seconds
            Animate win or lose message by using rubberBand animation
        */
        setTimeout(function(){
            $('#btn__reset').removeClass('animated bounce');
            $('#btn__reset').addClass('animated bounce');
        },3000);

        setTimeout(function(){
            $('#overlay h1').removeClass('animated rubberBand');
            $('#overlay h1').addClass('animated rubberBand');
        },500);
     }

     //a function to reset game data.
     resetData(){
        this.missed = 0;
        $('#phrase ul').empty();
        $('#qwerty .keyrow button').removeClass('chosen animated pulse key');
        $('#qwerty .keyrow button').addClass('key');
        $('#qwerty .keyrow button').prop('disabled',false);
        $('#scoreboard ol li').css('display','');
     }
 }
