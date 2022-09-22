import { useState } from "react";
import Wordle from "./components/Wordle";
import { allSolutions } from "./data/db";

function App() {
  const [solution] = useState(
    allSolutions[Math.floor(Math.random() * allSolutions.length)].word
  );

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;

/*
Data that need to be tracked:
  - solution
    - 5 letter string. For example: flame.
  
  - past guesses
    - an array of past guesses
    - each past guess is an array of letter objects.
    - each object represents a letter in the guess word. 
      For example {letter: e, color: 'yellow'}
    
  - current guess
    - 5 letter string.

  - keypad letters
    - array of letter objects [{key: 'a', color: 'green'}, {}, {} ...]

  - number of turns
    - an integer 0 - 6


game process:
  - entering words:
    - user enters a letter & a square is filled with that letter
    - when user hits delete it removes the previous letter
    - when user hits enter it submits the word
      - only if all the squares are filled with letters. The word will be submitted.
      - If that word has already been used in a previous guess then the word will not be submitted.
    - checking submitted words:
      - each letter is checked to see if it matches to the solution.
      - each letter is assigned a color based on it's inclusion in the solution.
        - exact matches (correct position in the solution) are green
        - partial matches (letter present in solution but not the correct position) are yellow.
        - no matches (letter not present in the solution) are grey.
      - correct colors are added to the guess in the grid.
      - the current guess moves to the next row.
      - the keypad letters are updated with the correct colors.
  
  - ending the game.
    - when the guessed word fully matches the solution
      - modal to display "well done"
    - when the user runs out of guesses
      - modal to display "unlucky"
*/
