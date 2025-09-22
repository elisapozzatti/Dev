import Cards from './components/Cards';
function App() {
  const pets=["yago", "simba", "nala", "maia"];
  const cards = ["titolo1", "titolo2", "titolo3"];
  const sports = ["ciclismo", "atletica", "nuoto"];
  return (
    <>
      <ul>
          {pets.map((pet, index)=>(
            <li key={index}> {pet} </li>
          ))}
      </ul>
      {cards.map((card, index)=>(
        <h1 key={index}>{card}</h1>
      ))}
      {sports.map((sport, index)=>(
        <h3 jey={index}>{sport}</h3>
      ))}
    </>
  )
}

export default App;
