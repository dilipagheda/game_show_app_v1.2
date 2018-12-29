/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
     constructor(phrase){
         this.phrase = phrase.toLowerCase();
     }

     //A function to convert a string phrase into an array of letters and then use that to render it on the page
     //For each letter, it will display li element
     addPhraseToDisplay(){
        let arr = [...this.phrase];

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

     //A function to check if letter is part of the phrase or not.
     checkLetter(letterElementSelected){
        let isMatched = false;
        let letter = letterElementSelected.textContent;
        $('#phrase ul li.letter').each((index, value)=>{
           let $value = $(value);
           if(letter === $value.text()){
             isMatched=true;
           }
        });
        return isMatched;
      }

     //A function to show matched letter.
     //It uses animation and styling to reveal the letter to the user.
     showMatchedLetter(matchedLetterElement){
       // $(matchedLetterElement).addClass('show');
       let letter = $(matchedLetterElement).text();
       let elementFromPhrase = $(`#phrase ul li.letter:contains('${letter}')`);
       elementFromPhrase.addClass('show animated flash');
     }
 }