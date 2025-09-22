"""Scrivi una funzione che accetti una lista di numeri e restituisca il valore
massimo, minimo e la media"""
def riepilogo(listanum):
    massimo = max(lista)
    minimo = min(lista)
    somma = sum(lista)
    conta = len(lista)
    media = somma / conta
    return massimo, minimo, media
lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = riepilogo(lista)
print("il massimo dei numeri è: ", result[0])
print("il minimo dei numeri è: ", result[1])
print("la media dei numeri è: ", result[2])