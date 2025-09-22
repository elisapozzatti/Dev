"""Creare un programma che chieda all’utente un
numero intero positivo e stampi un conto alla rovescia da quel
numero fino a zero, incluso lo zero.
Se l’utente inserisce un valore non valido (non numerico o
negativo), il programma deve mostrare un messaggio di
errore."""
def rovescia(n): 
    while(n>=0):
        print(n)
        n -= 1
try:
    num = int(input("dimmi un numero intero positivo: "))
    if(num<0):
        print("inserisci un numero positivo")
    else:
        rovescia(num)
except(ValueError):
    print("inserisci un numero valido")
