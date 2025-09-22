/*Dato un array di oggetti che rappresentano persone con nome ed età, usa forEach per stampare una frase per ogni persona nel formato:
"Mario ha 25 anni."
```
const persone = [
  { nome: 'Gino', eta: 25 },
  { nome: 'Pino', eta: 30 },
  { nome: 'Luca', eta: 22 }
];
Usa forEach per stampare il messaggio*/

let persone = [
    {nome: "gino", eta: 25},
    {nome: "pino", eta: 30},
    {nome: "luca", eta: 22},
]
persone.forEach(persona => {
    console.log(`${persona.nome} ha ${persona.eta} anni.`)
});