/*crea un array e inverti l'ordine usando foreach*/

const arr = ["ciao", "hello", "hola"]
const invertedarr = []

arr.forEach((item, i) => {
    invertedarr[arr.length-1-i] = item
})

console.log(invertedarr)