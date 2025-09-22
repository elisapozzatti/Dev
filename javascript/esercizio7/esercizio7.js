/*trova gli elementi pari in un array*/
let array = [2, 3, 4, 6, 7, 9, 15]
let conta = 0
for(i=0; i<array.length; i++){
    if(array[i]%2==0){
        conta++
    }
}
console.log(conta)