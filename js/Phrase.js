/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
     constructor(phrase){
         this.phrase = phrase.toLowerCase();
     }

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

     showMatchedLetter(matchedLetterElement){
       // $(matchedLetterElement).addClass('show');
       let letter = $(matchedLetterElement).text();
       let elementFromPhrase = $(`#phrase ul li.letter:contains('${letter}')`);
       elementFromPhrase.addClass('show animated flash');
     }
 }