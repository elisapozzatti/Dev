#crea una lista con 5 elementi dello stesso genere come 5 animali, 5 film ecc e scrivili in 3 modalità:
#usa un ciclo for scorrendo gli elementi
#usa un ciclo for con in range
#usa un ciclo while

animali = ["gatto", "cane", "cavallo", "delfino", "balena"]

for elemento in animali:
    print(elemento)

i = 0
for i in range(len(animali)):
    print(animali[i])

i = 0
while i<len(animali):
    print(animali[i])
    i += 1
