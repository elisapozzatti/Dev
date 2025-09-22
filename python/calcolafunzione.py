"""Crea una funzione calcola che accetti due numeri e restituisca sia la loro
somma che la loro differenza"""
def calcola(a, b):
    somma = a+b
    differenza = a-b
    return somma, differenza
num1 = 8
num2 = 4
result = calcola(num1, num2)
print("la somma dei due numeri è: ", result[0])
print("la differenza dei due numeri è: ", result[1])
