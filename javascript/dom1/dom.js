console.log(document);
console.log(window);

const cards = [];

const titolo = document.getElementById('titolone')
console.log(titolo)
titolo.style.backgroundColor = 'Blue';
titolo.textContent = 'BELLA CIAO';
titolo.style.borderRadius = '4px';
titolo.style.textAlign = 'center';

const div = document.createElement('div')
document.body.appendChild(div)
div.style.backgroundColor = 'Red';
div.style.display = 'flex';
div.style.gap = '10px';
div.style.margin = '10px';
div.style.justifyContent = 'center';
div.style.borderRadius = '4px';

const card = document.createElement('div')
div.appendChild(card)
card.textContent = 'la mia card';
card.style.borderRadius = '4px';
card.style.backgroundColor = 'Lightgrey';
card.style.height = '150px';
card.style.width = '100px';
card.style.display = 'flex';
card.style.justifyContent = 'center';
card.style.alignItems = 'Center';
card.style.margin = '10px';
cards.push(card);

const card2 = document.createElement('div')
div.appendChild(card2)
card2.textContent = 'la mia card2';
card2.style.borderRadius = '4px';
card2.style.backgroundColor = 'Lightgrey';
card2.style.height = '150px';
card2.style.width = '100px';
card2.style.display = 'flex';
card2.style.justifyContent = 'center';
card2.style.alignItems = 'Center';
card2.style.margin = '10px';
cards.push(card2);

const card3 = document.createElement('div')
div.appendChild(card3)
card3.textContent = 'la mia card3';
card3.style.borderRadius = '4px';
card3.style.backgroundColor = 'Lightgrey';
card3.style.height = '150px';
card3.style.width = '100px';
card3.style.display = 'flex';
card3.style.justifyContent = 'center';
card3.style.alignItems = 'Center';
card3.style.margin = '10px';
cards.push(card3);

const card4 = document.createElement('div')
div.appendChild(card4)
card4.textContent = 'la mia card4';
card4.style.borderRadius = '4px';
card4.style.backgroundColor = 'Lightgrey';
card4.style.height = '150px';
card4.style.width = '100px';
card4.style.display = 'flex';
card4.style.justifyContent = 'center';
card4.style.alignItems = 'Center';
card4.style.margin = '10px';
cards.push(card4);

const div2 = document.createElement('div')
document.body.appendChild(div2)
div2.style.display = 'flex';
div2.style.gap = '5px';
div2.style.margin = '10px';
div2.style.justifyContent = 'end';

const crea = document.createElement('div')
div2.appendChild(crea)
crea.textContent = 'crea';
crea.style.borderRadius = '4px';
crea.style.backgroundColor = 'Lightgrey';
crea.style.height = '50px';
crea.style.width = '100px';
crea.style.display = 'flex';
crea.style.justifyContent = 'center';
crea.style.alignItems = 'Center';
crea.style.margin = '10px';

crea.addEventListener('click', creacard);
function creacard(){
    const nuovacard = document.createElement('div')
    div.appendChild(nuovacard)
    nuovacard.textContent = 'nuovacard';
    nuovacard.style.borderRadius = '4px';
    nuovacard.style.backgroundColor = 'Lightgrey';
    nuovacard.style.height = '150px';
    nuovacard.style.width = '100px';
    nuovacard.style.display = 'flex';
    nuovacard.style.justifyContent = 'center';
    nuovacard.style.alignItems = 'Center';
    nuovacard.style.margin = '10px';

    cards.push(nuovacard);
}

const elimina = document.createElement('div')
div2.appendChild(elimina)
elimina.textContent = 'elimina';
elimina.style.borderRadius = '4px';
elimina.style.backgroundColor = 'Lightgrey';
elimina.style.height = '50px';
elimina.style.width = '100px';
elimina.style.display = 'flex';
elimina.style.justifyContent = 'center';
elimina.style.alignItems = 'Center';
elimina.style.margin = '10px';

elimina.addEventListener('click', eliminacard);
function eliminacard(){
    if(cards.length>0){
        const lastcard = cards.pop();
        lastcard.remove();
    }
}

titolo.addEventListener('click', gestore);
function gestore(){
    titolo.style.color = 'White';
}

const dateInput = document.querySelector(".dateInput");
const titleInput = document.querySelector(".titleInput");
const descriptionInput = document.querySelector(".descriptionInput");
const button = document.querySelector(".button")

let cardData = {}

dateInput.addEventListener("change", (e)=>{
    cardData.date = e.target.value
});

titleInput.addEventListener("change", (e)=>{
    cardData.title = e.target.value
});

descriptionInput.addEventListener("change", (e)=>{
    cardData.description = e.target.value
});

const containerCards = document.createElement('div')
document.body.appendChild(containerCards)

button.addEventListener("click", () =>createCard(cardData));

function createCard(obj){
    const container = document.createElement('div')
    container.className = 'container'

    const containerXDate = document.createElement('div')
    containerXDate.className = 'containerXDate'

    const date = document.createElement('h2')
    date.className = 'cardDate'
    date.textContent = obj.date

    const x = document.createElement('div')
    x.className = 'divX'
    x.textContent = 'X'

    x.addEventListener('click', () => {
        container.remove();
    })

    const title = document.createElement('h1')
    title.className = 'cardTitle'
    title.textContent = obj.title

    const description = document.createElement('h4')
    description.className = 'cardDescription'
    description.textContent = obj.description

    container.appendChild(containerXDate)
    containerXDate.appendChild(date)
    containerXDate.appendChild(x)
    container.appendChild(title)
    container.appendChild(description)
    containerCards.appendChild(container)
}

