/*crea un array , inverti il suo ordine con una funzione*/
let array = [12, 13, 14, 15];
let arrayinvert = [];
/*function inverter(){
        let arrayinvert = array.reverse();
        return arrayinvert
}
console.log(array)
console.log(inverter())*/

function inverter(){
    for(let i=0; i<array.length; i++){
        arrayinvert[i] = array[array.length-1-i];
    }
    return arrayinvert;
}
console.log(array)
console.log(inverter())