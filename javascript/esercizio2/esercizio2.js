/*
QUIZ:
1. di che colore era il cavallo bianco di napoleone? 
bianco (true) giallo (false)
2. l'america è stata scoperta da paolo conte?
falso (true) vero (false)
3. nella pasta al tonno ci va il parmigiano?
falso (true) vero (false)
*/

let domanda1 = confirm("di che colore era il cavallo bianco di napoleone? bianco (true) giallo (false) ")
console.log(domanda1);

let domanda2 = confirm("l'america è stata scoperta da paolo conte? falso (true) vero (false)")
console.log(domanda2);

let domanda3 = confirm("nella pasta al tonno ci va il parmigiano? falso (true) vero (false)")
console.log(domanda3);

console.log(`hai fatto ${domanda1+domanda2+domanda3}/3 punti`)

/*altre opzioni:
let inc = 0
inc += domanda1 == true*/