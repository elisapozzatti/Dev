/*Dato un array di oggetti che rappresenta una lista di cani, stampare in pagina una card, per ognuno di essi.*/

const dogs = [
  {
    name: 'Buddy',
    breed: 'Golden Retriever',
    image: 'https://placedog.net/640/480?random',
  },
  {
    name: 'Luna',
    breed: 'Siberian Husky',
    image: 'https://placedog.net/640/480?random',
  },
  {
    name: 'Rocky',
    breed: 'Bulldog',
    image: 'https://placedog.net/640/480?random',
  },
  {
    name: 'Molly',
    breed: 'Dachshund',
    image: 'https://placedog.net/640/480?random',
  },
  {
    name: 'Max',
    breed: 'Border Collie',
    image: 'https://placedog.net/640/480?random',
  },
  {
    name: 'Daisy',
    breed: 'Poodle',
    image: 'https://placedog.net/640/480?random',
  },
];

dogs.forEach((cane)=>{
    const card = document.createElement('div')
    card.className = 'card'

    const name = document.createElement('h2')
    name.className = 'name'
    name.textContent = cane.name

    const breed = document.createElement('h4')
    breed.className = 'breed'
    breed.textContent = cane.breed

    const img = document.createElement('img')
    img.className = 'img'
    img.src = cane.image

    document.body.appendChild(card)
    card.style.border = "4px solid black"
    card.style.width = "20%"
    card.style.margin = "10px"
    card.style.display = "flex"
    card.style.flexDirection = "column"
    card.style.alignItems = "center"
    card.appendChild(name)
    name.style.margin = "10px"
    card.appendChild(breed)
    breed.style.margin = "10px"
    card.appendChild(img)
    img.style.height = "100px"
    img.style.width = "100px"
    img.style.margin = "10px"
})