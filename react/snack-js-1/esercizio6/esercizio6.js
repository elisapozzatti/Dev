/*Segui le istruzioni qui sotto. Se necessario, sfrutta il destructuring.
```
const studenti = [
  { nome: "Anna", eta: 17 },
  { nome: "Marco", eta: 22 },
  { nome: "Laura", eta: 19 },
  { nome: "Giorgio", eta: 16 }
];

// 1. Filtra solo gli studenti maggiorenni e salva il risultato in una variabile
// 2. Per ogni maggiorenne stampa in console "Lo studente <nome-studente> è maggiorenne."*/

const studenti = [
    { nome: "Anna", eta: 17 },
    { nome: "Marco", eta: 22 },
    { nome: "Laura", eta: 19 },
    { nome: "Giorgio", eta: 16 }
];

let maggiorenni = studenti.filter((studente)=>{
    return studente.eta>=18
});

maggiorenni.forEach((studente)=>{
    console.log(`lo studente ${studente.nome} è maggiorenne`); 
});