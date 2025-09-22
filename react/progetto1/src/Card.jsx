import { useState } from 'react'
export function Card() {
    const [count, setCount] = useState(0)
    return(
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
                <p>Press me! </p>
                {count}
            </button>
        </div>
    )
}