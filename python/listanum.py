#crea una lista di 10 numeri, partendo dalla lista, sovrascrivere ogni numero col suo doppio

numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for numero in numeri:
    numero = numero*2
print(numeri)

i = 0
for i in range(len(numeri)):
    numeri[i] = numeri[i]*2
print(numeri)

numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
i = 0
while(i<len(numeri)):
    numeri[i] = numeri[i]*2
    i += 1
print(numeri)
    