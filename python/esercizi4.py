## Esercizio 1 ##
# Scrivi un programma che chieda due numeri all'utente ed inseriscili in
# una lista, poi stampare la lista.

lista = []
el1 = input("inserisci: ")
el2 = input("inserisci: ")
lista.append(el1)
lista.append(el2)
print(lista)

## Esercizio 2 ##
# Scrivere un programma che chieda all'utente 6 film e li aggiunga ad una lista

lista = []
i= 0
while i<6:
    film = input("inserisci film: ")
    lista.append(film)
    i += 1
print(lista)

## Esercizio 3 ##
# Scrivi un programma che, data una lista di numeri, stampi la media dei
# numeri presenti nella lista

lista = [1, 4, 6, 7, 9]
i = 0
somma = 0
while i<len(lista):
    somma += lista[i]
    i += 1
media = somma / len(lista)
print(media)

## Esercizio 4 ##
# Scrivi un programma che, partendo da una lista di numeri interi positivi,
# fornisca in output il numero più grande della lista, ovviamente cambiando
# la lista di numeri il programma deve funzionare sempre

lista = [1, 4, 5, 8, 7, 4, 9, 15]
max = 0
for numero in lista:
    if numero>max:
        max = numero
print(max)

## Esercizio 5 ##
# Scrivi un programma che, partendo da una lista di numeri interi,
# stampi solo i numeri pari presenti all'interno della lista

lista = [1, 4, 5, 8, 7, 4, 9, 15]
for numero in lista:
    if numero%2==0:
        print(numero)

## Esercizio 6 ##
# Scrivi un programma che, partendo da una lista di numeri interi positivi,
# crei un'altra lista e ci metta gli stessi numeri della lista di partenza
# ma ordinati in ordine crescente.

lista = [1, 4, 5, 8, 7, 4, 9, 15]
lista_ordinata = []
while len(lista)>0:
    min = lista[0]
    min_i = 0
    count_pos = 0
    while count_pos < len(lista):
        if lista[count_pos] < min:
            min = lista[count_pos]
            min_i = count_pos
            
        count_pos = count_pos + 1
        
    del lista[min_i]
    lista_ordinata.append(min)

print(lista_ordinata)