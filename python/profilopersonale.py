"""creare un programma che chieda all'utente di inserire alcune informazioni
personali e memorizzi questi dati in un dizionario.
poi deve mostrare il suo profilo completo e l'indirizzo mail"""
profilo = {
    "nome" : input("inserisci il tuo nome: "),
    "età" : input("inserisci la tua età: "),
    "città" : input("inserisci la tua città: "),
    "email" : input("inserisci la tua email: "),
}
print(profilo)
print(profilo["email"])