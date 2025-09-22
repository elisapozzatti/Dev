import './App.css'
import { Loghi, titolo } from './Loghi'
import { Card } from "./Card"
import { Post } from "./Post"

function App() {
  return (
    <>
      <Loghi></Loghi>
      <h1>{ titolo }</h1>
      <Card></Card>
      <Post></Post>
      <p>
        Viva Vite + React, best team ever!!!
      </p>
    </>
  )
}

export default App
