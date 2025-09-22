/*·	con un prompt() chiedi all'utente un numero
·	Poi chiedine un altro
·	Chiedi con confirm() se il primo è maggiore del secondo
·	Alert() con true o false se è vero quello che dice
·	SENZA IF
    fai in modo che l'utente non possa inserire parole
*/

let num1 = prompt("inserisci un numero: ")
let num2 = prompt("inserisci un altro numero: ")


if(isNaN(num1) || isNaN(num2))
    alert("inserisci un numero")
else{
    dom = confirm("il primo numero è maggiore del secondo")
    console.log(dom)
    alert(Number(num1)>Number(num2) === dom)
}
