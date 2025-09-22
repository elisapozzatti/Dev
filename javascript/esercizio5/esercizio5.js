/*chiedo all'utente tre numeri e buttali in un array e stampa il più alto*/
let array = [];
let max = 0;
for(i=0; i<3; i++){
    let num = Number(prompt("inserisci un numero"))
    array.push(num)
}
for(i=0; i<array.length; i++){
    if(array[i]>max){
        max = array[i]
    }
}
console.log("il numero più alto è: ", max)