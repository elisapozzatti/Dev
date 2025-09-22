/*3.	Piramide
a.	Fai uscire il seguente pattern nella console usando SOLO LOOPS.
*
**
***
****
*****
*/

for(i=0; i<5; i++){
    let riga = " "
    for(j=1; j<=i; j++){
    riga += "*"
    }
console.log(riga)
}