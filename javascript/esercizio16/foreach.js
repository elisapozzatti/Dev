/*foreach*/

const saluti = ["ciao", "hello", "hola"];
const salutifunc = () => console.log("saluto");

saluti.forEach(salutifunc) /*la funzione viene eseguita per ogni elemento di saluti*/
/*se scrivessi item invece del nome della funzione dopo foreach mi uscirebbero gli elementi dell'array*/

/*arrow function anonima*/
saluti.forEach((item, i, arr) => {
    console.log(item);
})