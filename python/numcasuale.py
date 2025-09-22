import random
numero = random.randint(1, 100)
print(numero)

numlimite = 50

if(numero==numlimite):
    print("il numero è corretto")
else:
    if (numero > numlimite):
        print("il numero è più grande")
    else:
        if (numero < numlimite):
            print("il numero è più piccolo")