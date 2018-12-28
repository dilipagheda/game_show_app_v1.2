/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

 /*
  Create a phrases array that contains at least 5 different phrases as strings.
  Note that numbers and special characters are not allowed.
*/
const phrases = [
    'Hello World',
    'smart phone',
    'too Easy',
    'elephant',
    'home work',
    'school',
    'cricket',
    'card game',
    'boxing day',
    'child',
    'oFFiCe',
    'WEB',
    'Australia',
    'America',
    'I love food',
    'Happy birthday'
 ];

 /*
A click event listener to the "Start Game" button which creates a new Game object and starts the game by calling 
the startGame() method.
 */
let game = null; // make game a global variable
//Animate start game button only for the first page load
$('#btn__reset').addClass('animated bounce');
$('#btn__reset').on('click',(event)=>{
    $('#btn__reset').removeClass('animated bounce');
    game = new Game(0,phrases,null);
    game.startGame();
  });

/*
A click event listener on #qwerty, so that clicking a button calls the 
handleInteraction() method on the Game object. Clicking the space between and around the onscreen 
keyboard buttons do not result in the handleInteraction() method being called.

*/
$('#qwerty').on('click',(event)=>{
    let button = event.target;
    console.log(button.tagName);
    if(button.tagName !== 'BUTTON'){
      return;
    }
    if(game===null){
        console.log("game object is null!")
        return;
    }
    game.handleInteraction(button);

  });

$('body').on('keypress',(event)=>{
    let keyCode = event.keyCode;
    console.log(String.fromCharCode(keyCode));
    let letter = String.fromCharCode(keyCode).toLowerCase();
    let button = $(`button.key:contains('${letter}')`);
    console.log(button);
    game.handleInteraction(button.get(0));

});
