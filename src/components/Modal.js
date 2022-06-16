import React from 'react'

export default function Modal({ isCorrect, turn, solution }) {

  const handleReload = () => {
    window.location.reload();
  }

  return (
    <div className='modal'>
      {isCorrect &&
        <div>
          <h1>You Win!</h1>
          <p className="solution">
            Solution: {solution}
          </p>
          <p>
            You found the solution in {turn} guesses :)
          </p>
          <button onClick={handleReload}>Play Again</button>
        </div>
      }

      {!isCorrect &&
        <div>
          <h1>Nevermind</h1>
          <p className="solution">
            Solution: {solution}
          </p>
          <p>
            Better luck next time :)
          </p>
          <button onClick={handleReload}>Play Again</button>
        </div>
      }
    </div>
  )
}
