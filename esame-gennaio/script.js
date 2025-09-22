const dateInput = document.querySelector(".date")
const titleInput = document.querySelector(".title")
const descriptionInput = document.querySelector(".description")

const data = {}

dateInput.addEventListener("change", (e)=>{
    data.date = e.target.value
})

titleInput.addEventListener("change", (e)=>{
    data.title = e.target.value
})

descriptionInput.addEventListener("change", (e)=>{
    data.description = e.target.value
})

const container = document.createElement('div')
document.querySelector(".tasks").appendChild(container)

const button = document.querySelector(".button")

button.addEventListener("click", ()=>createCard(data))

function createCard(obj){
    const card = document.createElement('div')
    card.className = 'card'

    const date = document.createElement('h2')
    date.className = 'cardDate'
    date.textContent = obj.date

    const title = document.createElement('h1')
    title.className = 'cardTitle'
    title.textContent = obj.title

    const description = document.createElement('h5')
    description.className = 'cardDescription'
    description.textContent = obj.description

    const x = document.createElement('div')
    x.className = 'x'
    x.textContent = 'X'

    x.addEventListener('click', () => {
        card.remove();
    });

    card.appendChild(date)
    card.appendChild(title)
    card.appendChild(description)
    card.appendChild(x)

    container.appendChild(card)

    card.style.justifyContent = "center"
    card.style.marginLeft = "20px"
    card.style.marginRight = "20px"
}