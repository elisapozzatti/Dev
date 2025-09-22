#crea un dizionario vuoto, chiedere all'utente come si chiama e quanti anni ha e inserirli nel dizionario e richiedere all'utente il nome e aggiornarlo

utente = {}

utente["nome"] = input("inserisci il tuo nome: ")
utente["eta"] = int(input("inserisci la tua età: "))

print(utente)

utente["nome"] = input("riscrivi il tuo nome: ") 

print(utente)