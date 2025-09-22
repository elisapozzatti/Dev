/*4.	Ricomponi in ordine alfabetico le lettere di una stringa
a.	Crea una funzione, l’unico parametro è una stringa casuale tipo “vgbaer”
b.	L’output deve essere “abegrv”, ordinata in ordine alfabetico
c.	Cose da sapere e studiare:
i.	Usa il metodo delle string split()
ii.	Usa il metodo degli array sort()
*/

function ordina(array){
    return array.map(str => str.split("").sort().join(""));
}
let array = ["vgbaer", "zxyw", "hello"];
console.log(ordina(array))