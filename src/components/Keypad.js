import React, { useState } from 'react'
import { allLetters } from '../data/db';

export default function Keypad( {usedKeys, handleKeypadKeys} ) {
  const [letters] = useState( allLetters );
  

  return (
    <div className='keypad'>
      {letters && letters.map((l) => {
        const color = usedKeys[l.key];
        return (
          <div key={l.key} className={color} onClick={() => handleKeypadKeys(l.key)}>
            {l.key}
          </div>
        )
      })}
    </div>
  )
}
