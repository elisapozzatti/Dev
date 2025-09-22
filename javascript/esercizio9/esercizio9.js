/*1.	Conta le volte che l’utente preme Ok e Cancel
a.	Per 5 volte consecutive fai comparire la finestrella che chiede “Ok” e “Cancel” ( usando confirm() )
b.	Hint: usa un ciclo for per eseguire questa operazione N volte
c.	Alla fine fai comparire con alert() la finestrella che dice quante volta l’utente ha cliccato su Ok e quante su Cancel
*/

let cok = 0
let ccancel = 0
for(i=0; i<5; i++){
    let conf = confirm("scegli")
    if(conf) cok++
    else ccancel++
}
alert(cok)
alert(ccancel)