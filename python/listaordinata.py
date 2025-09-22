"""Creare un programma che chieda all’utente di
inserire una lista di numeri separati da spazi e verifichi se la
lista è ordinata in ordine crescente. Mostrare all’utente un messaggio che 
indica se la lista è ordinata o meno.
Verificare che tutti gli elementi della lista siano numeri. Se
non lo sono, mostrare un messaggio di errore."""
def ordine(lis):
    lista2 = lis[:]
    lista2.sort()
    if(lista2==lis
       ):
        print("la lista è ordinata")
    else:
        print("la lista non è ordinata")
lista = input("inserisci una lista di numeri separati da uno spazio: ")
try:
    lista = [int(x) for x in lista.split()]
    ordine(lista)
except(ValueError):
    print("c'è un errore! inserisci numeri validi divisi da uno spazio")
