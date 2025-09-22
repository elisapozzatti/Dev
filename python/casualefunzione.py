"""Usa il modulo random per creare una funzione che generi un numero
casuale tra 1 e 100 e chieda all’utente di indovinarlo"""
import random
def casuale():
    numcasuale = random.randint(1, 100)
    tentativi = 0
    while True:
        tentativi += 1
        try:
            prova = int(input("Indovina un numero tra 1 e 100: "))
            if prova < numcasuale:
                print("Troppo basso! Riprova.")
            elif prova > numcasuale:
                print("Troppo alto! Riprova.")
            else:
                print(f"Congratulazioni! Hai indovinato il numero {numcasuale} in {tentativi} tentativi.")
                break
        except ValueError:
            print("Per favore, inserisci un numero valido.")
casuale()