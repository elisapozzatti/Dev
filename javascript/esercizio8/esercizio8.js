/*Trova il secondo valore più grande*/
let array = [1, 5, 22, 34, 55, 68, 77, 89]
let max = 0
let secondmax = 0
for(i=0; i<array.length; i++){
    if(array[i]>max){
        max = array[i]
    }
}
for(i=0; i<array.length; i++){
    if(array[i]>secondmax && array[i]<max){
        secondmax = array[i]
    }
}
console.log(secondmax)