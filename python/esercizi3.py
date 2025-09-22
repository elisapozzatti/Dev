## ESERCIZIO 1 ##
# Scrivere un programma che chieda all'utente un numero e stampi a schermo
# tutti i numeri da 1 fino al numero che ha inserito l'utente.

num = int(input("Inserisci un numero: "))
i = 0
while(i<=num):
    print(i)
    i += 1

## ESERCIZIO 2 ##
# Scrivere un programma che chieda all'utente un numero e stampi a schermo
# tutti i numeri dal numero che ha inserito l'utente fino ad 1.

num = int(input("Inserisci un numero: "))
i = num
while(i>=1):
    print(i)
    i -= 1

## ESERCIZIO 3 ##
# Scrivere un programma che scriva i numeri pari da 2 a 20.

i = 0
while i<=20:
    print(i)
    i += 2

## ESERCIZIO 4 ##
# Scrivere un programma che chieda all'utente di quale numero scrivere
# la tabellina, della tabellina stampare solo i primi 10 numeri
# Es. se l'utente inserisce il numero 5, si dovrà stampare a schermo:
# 5
# 10
# 15
# 20
# 25
# 30
# 35
# 40
# 45
# 50

num = int(input("inserisci un numero: "))
i = num
while i<=num*10:
    print(i)
    i += num

## ESERCIZIO 5 ##
# Scrivere un programma che chieda all'utente di indovinare un numero
# da 1 a 20, e continui a chiedere all'utente di indovinare il numero
# finchè il numero non è stato indovinato.
## IMPORTANTE
# Per questo esercizio copiare nelle prime due righe queste righe:

import random
indovina = random.randint(1, 20)

# Non vediamo ora nel dettaglio cosa fanno queste righe, ci basta sapere
# che dentro la variabile numero_da_indovinare ci sarà un numero casuale
# da 1 a 20.
num = 0
while(indovina!=num):
    num = int(input("inserisci un numero: "))
    if(indovina!=num):
        print("riprova")
print("HAI INDOVINATO")


## ESERCIZIO 7 ##
# Scrivere un programma che chieda all'utente un numero, stampare tanti
# dollari "$" uno sotto all'altro tante volte quanto è il numero inserito.
# Es.
# Dimmi un numero: 4
# $
# $
# $
# $


## ESERCIZIO 8 ##
# Scrivere un programma che chieda all'utente un numero, stampare tanti
# dollari "$" uno accanto all'altro tante volte quanto è il numero inserito.
# Es.
# Dimmi un numero: 4
# $$$$

num = int(input("inserisci un numero: "))
i = 0
while(i<num):
    print("$")
    i += 1
