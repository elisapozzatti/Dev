"""Creare un programma che funzioni come una
calcolatrice e permetta all’utente di eseguire operazioni
matematiche (+, -, *, /) su due numeri.
Chiedere all’utente quale operazione desidera eseguire.
Consentire solo le operazioni +, -, *, / e fornire un messaggio di errore
per operazioni non valide.
Chiedere all’utente di inserire due numeri.
Gestire divisioni per zero mostrando un errore specifico.
Continuare a chiedere operazioni finché l’utente non digita “fine”"""
try:
    while(True):
        a = int(input("inserisci un numero: "))
        b = int(input("inserisci un altro numero: "))
        operazione = input("inserisci l'operazione che vuoi eseguire (scrivere fine per terminare): ")
        if (operazione not in ['+', '-', '*', '/']):
            print("inserisci un'operazione valida")
        if(operazione=='fine'):
            break
        if(operazione=='+'):
            somma = a+b
            print(somma)
        elif(operazione=='-'):
            differenza = a-b
            print(differenza)
        elif(operazione=='*'):
            moltiplicazione = a*b
            print(moltiplicazione)
        else:
            divisione = a/b
            print(divisione)
except(ZeroDivisionError):
    print("errore! non si può dividere per zero!")