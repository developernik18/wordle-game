import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle( {solution} ) {
  const {currentGuess, handleKeyup, 
          guesses, isCorrect, 
          turn, usedKeys, 
          handleKeypadKeys, errorState} = useWordle(solution);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      console.log('unlucky, out of guesses');
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn]);


  return (
    <>
      {/* <div>Solution - {solution}</div> */}
      {/* <div>Current guess -  {currentGuess}</div> */}
      {errorState && <div className='errormsg'> {errorState} </div>}
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} handleKeypadKeys={handleKeypadKeys}/>
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </>

  )
}
