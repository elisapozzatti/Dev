parola1 = input("inserisci una parola: ") #chiedo all'utente una parola
lettera1 = input("inserisci una lettera: ") #chiedo all'utente una lettera
lettera2 = input("inserisci un'altra lettera: ") #chiedo all'utente un'altra lettera

parola2 = parola1.replace(parola1[0], lettera1) 
#la prima lettera della parola diventa la prima lettera inserita dall'utente
parola2 = parola2.replace(parola1[len(parola1)-1], lettera2)
#l'ultima lettera della parola diventa la seconda lettera inserita dall'utente
print(f"la nuova parola è: {parola2}") #stampo il risultato