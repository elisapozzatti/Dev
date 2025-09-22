## ESERCIZIO 1 ##
# Scrivere un programma che chieda all'utente un numero e stampi a schermo
# tutti i numeri da 1 fino al numero che ha inserito l'utente.

num = int(input("inserisci un numero: "))
i = 0
for i in range(1, num+1):
    print(i)

## ESERCIZIO 2 ##
# Scrivere un programma che chieda all'utente un numero e stampi a schermo
# tutti i numeri dal numero che ha inserito l'utente fino ad 1.

num = int(input("inserisci un numero: "))
i = 0
for i in range(num, 0, -1):
    print(i)

## ESERCIZIO 3 ##
# Scrivere un programma che scriva i numeri pari da 2 a 20.

for i in range(2, 21, 2):
    print(i)

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
i = 0
for i in range(num, num*11, num):
    print(i)

## ESERCIZIO 5 ##
# Scrivere un programma che, data questa lista:
lista_nomi = ["Giulia", "Chiara", "Vittoria", "Elisa"]
# scriva uno sotto l'altro i nomi.

for nome in lista_nomi:
    print(nome)

## ESERCIZIO 6 ##
# Scrivere un programma che, data questa lista:
lista_numeri = [5, 61, 8, 22, 12, 17, 2]
# stampi la media dei numeri.
i = 0
somma = 0
for numeri in lista_numeri:
    somma += lista_numeri[i]
    i += 1
media = somma / len(lista_numeri)
print(media)

## ESERCIZIO 7 ##
# Scrivere un programma che chieda all'utente un numero, stampare tanti
# dollari "$" uno sotto all'altro tante volte quanto è il numero inserito.
# Es.
# Dimmi un numero: 4
# $
# $
# $
# $

num = int(input("inserisci un numero: "))
i = 0
for i in range(num):
    print("$")

## ESERCIZIO 8 ##
# Scrivere un programma che chieda all'utente un numero, stampare tanti
# dollari "$" uno accanto all'altro tante volte quanto è il numero inserito.
# Es.
# Dimmi un numero: 4
# $$$$

num = int(input("inserisci un numero: "))
i = 0
for i in range(num):
    print("$", end="")

## ESERCIZIO 9 ##
# Scrivere un programma che chieda all'utente un numero, stampare un
# quadrato fatto di dollari "$" con la lunghezza del lato del numero
# inserito dall'utente.
# Es.
# Dimmi un numero: 4
# $$$$
# $$$$
# $$$$
# $$$$

num = int(input("inserisci un numero: "))
i = 0
for i in range(num):
    for y in range(num):
        print("$", end="")
    print()

## ESERCIZIO 10 ##
# Scrivere un programma che chieda all'utente un numero, stampare la
# cornice di un quadrato fatto di dollari "$" con la lunghezza del lato
# del numero inserito dall'utente.
# Es.
# Dimmi un numero: 4
# $$$$
# $  $
# $  $
# $$$$

num = int(input("inserisci un numero: "))
i = 0
for i in range(num):
    for y in range(num):
        if(i==0 or y==0 or i==num-1 or y==num-1):
            print("$", end="")
        else: 
            print(" ", end="")
    print()

## ESERCIZIO 11 ##
# Scrivere un programma che chieda all'utente un numero, stampare la
# cornice e le due diagonali di un quadrato fatto di dollari "$" con
# la lunghezza del lato del numero inserito dall'utente.
# Es.
# Dimmi un numero: 7
# $$$$$$$
# $$   $$
# $ $ $ $
# $  $  $
# $ $ $ $
# $$   $$
# $$$$$$$

num = int(input("inserisci un numero: "))
i = 0
for i in range(num):
    for y in range(num):
        if(i==0 or y==0 or i==num-1 or y==num-1 or i==y or i+y==num-1):
            print("$", end="")
        else: 
            print(" ", end="")
    print()