## Esercizio 1
# Scrivere un programma che chiede all'utente di inserire un numero e stampa
# "Il numero è positivo" se il numero è maggiore di zero, altrimenti stampa
# "Il numero è negativo".

num = int(input("inserisci un numero: "))
if(num>0):
    print("Il numero è positivo")
else:
    print("Il numero è negativo")

## Esercizio 2
# Scrivere un programma che chiede all'utente di inserire due numeri e stampa
# "Il primo numero è maggiore" se il primo numero è maggiore del secondo,
# "Il secondo numero è maggiore" se il secondo numero è maggiore del primo,
# altrimenti stampa "I numeri sono uguali".

num1 = int(input("inserisci un numero: "))
num2 = int(input("inserisci un numero: "))
if num1>num2:
    print("Il primo numero è maggiore del secondo")
elif num2>num1:
    print("Il secondo numero è maggiore del secondo")
else:
    print("I numeri sono uguali")

## Esercizio 3
# Scrivere un programma che chiede all'utente di inserire una stringa e
# stampa "La stringa è vuota" se la stringa è vuota, altrimenti stampa
# "La stringa non è vuota".

stringa = str(input("inserisci una stringa: "))

if stringa=="":
    print("la stringa è vuota")
else:
    print("la stringa non è vuota")

## Esercizio 4
# Scrivere un programma che chiede all'utente di inserire un numero e stampa
# "Il numero è pari" se il numero è pari, altrimenti stampa "Il numero è dispari".

num = int(input("inserisci un numero: "))
if num%2==0:
    print("il numero è pari")
else:
    print("il numero è dispari")

## Esercizio 5
# Scrivere un programma che chiede all'utente di inserire un numero e stampa
# "Il numero è compreso tra 1 e 10" se il numero è compreso tra 1 e 10, altrimenti
# stampa "Il numero non è compreso tra 1 e 10".

num = int(input("inserisci un numero: "))
if num>=1 and num>=10:
    print("il numero è compreso tra 1 e 10")
else:
    print("il numero non è compreso tra 1 e 10")

## Esercizio 6
# Scrivere un programma che chieda all'utente di inserire un numero intero.
# Se il numero è maggiore di 10, stampare "Il numero è maggiore di 10".
# Se il numero è uguale a 10, stampare "Il numero è uguale a 10".
# Se il numero è minore di 10, stampare "Il numero è minore di 10".

num = int(input("inserisci un numero: "))
if num>10:
    print("il numero è maggiore di 10")
elif num<10:
    print("il numero è minore di 10")
else:
    print("il numero è 10")

## Esercizio 7
# Scrivere un programma che chieda all'utente di inserire un numero che sia come
# un voto, se il voto è compreso tra 6 e 10 stampare "Il voto è sufficiente",
# se il voto è minore di 6 stamapre "Il voto è insufficiente", se il voto è
# maggiore di 10 o minore di 1 stampare "Il numero non è valido".

num = int(input("inserisci un numero: "))
if num>10:
    print("il voto non è valido")
elif num<10 and num>6:
    print("il voto è sufficiente")
else:
    print("il voto è insufficiente")

## Esercizio 8
# Scrivere un programma che chieda all'utente di inserire 2 numeri.
# Poi chieda all'utente di inserire una delle 4 operazioni "+,-,*,/".
# Il programma deve stampare l'operazione e il risultato dell'operazione.

num1 = int(input("inserisci un numero: "))
num2 = int(input("inserisci un numero: "))
op = input("inserisci operazione: ")
if op=="somma" or op== "+":
    print(num1+num2)
elif op=="differenza" or op== "-":
    print(num1-num2)
elif op=="moltiplicazione" or op== "*":
    print(num1*num2)
elif op=="divisione" or op== "/":
    print(num1/num2)
else:
    print("numeri o operazione non validi")

## Esercizio 9
# Scrivere un programma che chieda all'utente di inserire un numero.
# Controllare se il numero è positivo o negativo e stamparlo. Se il numero è
# positivo controllare se il numero è pari o dispari e stamparlo a schermo.

num = int(input("Inserisci un numero: "))
if num>0:
    print("Il numero è positivo")
    if num%2==0:
        print("il numero è pari")
    else:
        print("il numero è dispari")
else:
    print("il numero è negativo")