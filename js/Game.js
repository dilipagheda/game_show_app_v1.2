/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor(missed=0, phrases, activePhrase=null){
         this.missed = missed;
         this.phrases = phrases;
         this.activePhrase = activePhrase;
     }

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

     getRandomPhrase(){
        let arr = this.phrases; 
        let total = arr.length;
        let randomIndex = Math.floor(Math.random() * total);
        return this.phrases[randomIndex];
     }

     handleInteraction(buttonClicked){
        //Disable the selected letter’s onscreen keyboard button.
        buttonClicked.className = 'chosen';
        $(buttonClicked).addClass('animated pulse');
        $(buttonClicked).prop('disabled',true);

        let letterFound = this.activePhrase.checkLetter(buttonClicked);
        if(letterFound === false){
          this.removeLife();
        }else{
            console.log("match found!");
            this.activePhrase.showMatchedLetter(buttonClicked);
        }
        this.checkForWin();

     }

     removeLife(){
        this.missed += 1;
        $(`#scoreboard ol li:nth-of-type(${this.missed})`).css('display','none');
        console.log(`missed:${this.missed}`);
     }

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
            Animate win or lose message too
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

     resetData(){
        this.missed = 0;
        $('#phrase ul').empty();
        $('#qwerty .keyrow button').removeClass('chosen animated pulse');
        $('#qwerty .keyrow button').prop('disabled',false);
        $('#scoreboard ol li').css('display','');
     }
 }
