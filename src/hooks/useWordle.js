import { useState } from "react"


const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array.
  const [history, setHistory] = useState([]); // each guess is a string.
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}) // {a:'green', b:'yellow', c: 'grey'}
  const [errorState, setErrorState] = useState('');


  // format a guess into an array of letter objects.
  // example [{letter: 'a', color: 'yellow'}]
  const formatGuess = () => {
    // console.log('formatting guess', currentGuess);
    let solutionArray = [...solution];
    let fromattedGuess = [...currentGuess].map((l) => {
      return {key: l, color: 'grey'};
    })

    // find any letter that will have green colors
    fromattedGuess.forEach((l, i) => {
      if(solutionArray[i] === l.key) {
        fromattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    })

    fromattedGuess.forEach((l, i) => {
      if(solutionArray.includes(l.key) && l.color !== 'green') {
        fromattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    })

    return fromattedGuess;
  }


  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (fromattedGuess) => {
    if(currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = fromattedGuess;
      return newGuesses;
    })

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    })

    setTurn((prevTurn) => {
      return prevTurn + 1;
    })
    
    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys}

      fromattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if(l.color === 'green') {
          newKeys[l.key] = "green";
          return;
        }
        if(l.color === 'yellow' && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if(l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow'){
          newKeys[l.key] = "grey";
          return;
        }
      })
      return newKeys;
    })
    setCurrentGuess('');
  }


  // hadle keyup event & track current guess
  // if user presses enter, add the nw guess
  const handleKeyup = ({key}) => {

    if(key === "Enter") {
      // only add guess if turn is less than 5
      if(turn > 5) {
        setErrorState('All guesses are used');
        return;
      }
      // do not allow duplicate words
      if(history.includes(currentGuess)) {
        setErrorState('You already tried this word');
        return;
      }
      
      // check words is 5 character. 
      if(currentGuess.length !== 5) {
        setErrorState('Word must be 5 character long');
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    setErrorState('');

    if(key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      })
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if(currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        })
      }
    }
  }

  const handleKeypadKeys = (key) => {
    if (/^[A-Za-z]$/.test(key)) {
      if(currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        })
      }
    }

  }

  return {turn, currentGuess, guesses, isCorrect, usedKeys, errorState, handleKeyup, handleKeypadKeys}
}

export default useWordle;