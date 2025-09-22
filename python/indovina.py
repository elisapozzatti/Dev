"""Creare un gioco in cui il computer sceglie un
numero casuale tra 1 e 100, e l’utente deve indovinarlo.
Il programma deve scegliere casualmente un numero tra 1 e 100.
L’utente deve inserire un numero come tentativo.
Se l’utente inserisce un numero al di fuori dell’intervallo o un valore non
numerico, deve essere mostrato un messaggio di errore.
Fornire un feedback (“Troppo alto” o “Troppo basso”) fino a quando
l’utente non indovina il numero.
Terminare il gioco quando il numero è indovinato"""
import random
n = random.randint(1, 100)
conta = 0
while(True):
    try:
        tentativo = int(input("prova a indovinare il numero: "))
        if(tentativo<1 or tentativo>100):
            print("inserisci un numero compreso tra 1 e 100!")
        else: 
            if(n>tentativo):
                print("il numero è più grande!")
                conta += 1
            if(n<tentativo):
                print("il numero è più piccolo!")
                conta += 1
            if(n==tentativo):
                print(f"hai indovinato in {conta} tentativi!!")
                break
    except(ValueError):
        print("inserisci un numero valido!")