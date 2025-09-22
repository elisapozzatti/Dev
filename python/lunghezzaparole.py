#creea una lista con 5 parole e stampa la lunghezza delle 5 parole

array = ["ciao", "mela", "bici", "pizza", "gatto"]

array2 = []
i = 0
for i in range(5):
    array2.append(len(array[0]))
    i += 1

print(f"{array[0]}: {array2[0]}, {array[1]}: {array2[1]}, {array[2]}: {array2[2]}, {array[3]}: {array2[3]}, {array[4]}: {array2[4]},")


