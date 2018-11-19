
$('.btn__reset').on('click',(event)=>{
  $('#overlay h1').remove();
  $('#overlay').css('display','none');
  $('#overlay').removeClass('win lose');
  resetData();
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
});

function resetData(){
  missed = 0;
  $('#phrase ul').empty();
  $('#qwerty .keyrow button').removeClass('chosen');
  $('#scoreboard ol li').css('display','');
}
//Get the element with the ID of qwerty and save it to a variable.
$qwerty = $('#qwerty');
//Get the element with the ID of phrase and save it to a variable.
$phrase = $('phrase');
//Create a missed variable, initialized to 0.
let missed = 0;
//Create a phrases array that contains at least 5 different phrases as strings.
const phrases = [
   'Hello World',
   'I Love JavaScript',
   'A piece of cake',
   'smart phone',
   'http protocol',
   'react js',
   'html and css',
   'back end',
   'too easy'
];

function getRandomPhraseAsArray(arr){
  let total = arr.length;
  let randomIndex = Math.floor(Math.random() * total);
  let t = [...phrases[randomIndex].toLowerCase()];
  return t;
}

function addPhraseToDisplay(arr){
  console.log(arr);
  arr.forEach(function(entry){
    let $li;
    if(entry===' '){
      $li = $('<li>', {class:'space'});
    }else{
      $li = $('<li>', {class:'letter'});
    }
    $li.text(entry);
    $('#phrase ul').append($li);
  });
}

function checkLetter(button){
  let guessedLetter = button.textContent;
  let matchedLetter = null;
  $('#phrase ul li.letter').each((index, value)=>{
     let $value = $(value);
     if(guessedLetter === $value.text()){
       $value.addClass('show');
       matchedLetter = guessedLetter;
     }
  });
  return matchedLetter;
}

$('#qwerty').on('click',(event)=>{
  let button = event.target;
  console.log(button.tagName);
  if(button.tagName !== 'BUTTON'){
    return;
  }
  button.className = 'chosen';
  let letterFound = checkLetter(button);
  if(letterFound === null){
    missed += 1;
    $(`#scoreboard ol li:nth-of-type(${missed})`).css('display','none');
    console.log(`missed:${missed}`);
  }
  checkWin();
});

function checkWin(){
  let totalWithClassLetter = $('#phrase ul li.letter').length;
  let totalWithClassShow = $('#phrase ul li.show').length;
  if(totalWithClassLetter === totalWithClassShow){
    resetData();
    $('#overlay').css('display','block');
    $('#overlay').addClass('win');
    $('#overlay h2').after($('<h1>You Win!</h1>'))
  }
  if(missed >=5){
    resetData();
    $('#overlay').css('display','block');
    $('#overlay').addClass('lose');
    $('#overlay h2').after($('<h1>You Lose!</h1>'))
  }
}
