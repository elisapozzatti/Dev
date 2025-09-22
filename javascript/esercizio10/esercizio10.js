/*2.	Riordina i numeri che l’utente fornisce
a.	Chiedi all’utente per 3 volte un numero utilizzando prompt()
b.	Crea un array e inserisci ciascun numero al suo interno -> [n1, n2, n3]
c.	Crea una funzione che ordina in maniera crescente i numeri di un array. Questa funziona avrà un solo argomento: l’array da riordinare.
d.	Se l’utente scrive una parola e non un numero il codice manda a monte tutto e bisogna ricaricare la pagine per ricominciare.
e.	Al termine dovrà comparire una finestra che mostra l’array riordinato (usando alert() )
*/

let array = []
for(i=0; i<3; i++){
    let num = Number(prompt("inserisci un numero: "))
    if (isNaN(num)) break
    array.push(num)
}
function ordina(array){
    return array.sort((a, b) => a - b);
}
alert(ordina(array))