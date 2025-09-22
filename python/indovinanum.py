#l'utente deve indovinare un numero tra 1 e 50  e continua a chiedere finchè non indovina

import random

indovina = random.randint(1, 50)
tentativi = 0

while(True):
    num = int(input("indovina un numero tra 1 e 50: "))
    if(num > indovina):
        print("hai sbagliato, il numero è più piccolo")
        tentativi += 1
    elif(num < indovina):
        print("hai sbagliato, il numero è più grande")
        tentativi += 1
    else:
        print(f"hai indovinato in {tentativi} tentativi")
        break