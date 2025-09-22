import { useState } from 'react'
export function Post() {
    const [letter, setLetter] = useState("")
    return(
        <div className='Post'>
            <button onClick={() => setLetter((letter) => letter + "a")}>
                <p>Premi!</p>
                {letter}
            </button>
        </div>
    )
}