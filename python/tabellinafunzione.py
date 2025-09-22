"""Scrivi una funzione tabellina che accetti un numero e stampi la sua
tabellina fino a 10"""
def tabellina(n):
    for i in range(1,11):
        print(f"{n*i}")
num = 2
tabellina(num)