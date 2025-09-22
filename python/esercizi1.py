# 1) scrivi a schermo il testo "Sono riuscito a fare il primo esercizio!"
# 2) crea una variabile con il tuo nome e "printa" il contenuto
# 3) crea la variabile anno_nascita = "1995" e stampa il tipo della variabile
# 4) crea le variabili mio_nome, mia_eta e mio_anno_nascita e scrivine il contenuto e il tipo
# 5) Scrivi un programma che chieda all'utente il suo nome e scriva
#    a schermo "Il mio nome è " e il nome inserito
# 6) Scrivi un programma che chieda all'utente in che anno siamo e
#    il suo anno di nascita e che scriva quanti anni compierà l'utente
#    quest'anno
# 7) Scrivi un programma che chieda all'utente la base e l'altezza di
#    un triangolo e scriva l'area del triangolo
# 8) Scrivi un programma che chieda all'utente 3 numeri e scriva la media
#    dei 3 numeri

print("Sono riuscito a fare il primo esercizio!")

nome = "Elisa"
print(nome)

anno_nascita = "1995"
print(anno_nascita)

mio_nome = "Elisa"
mio_anno_nascita = "2004"
mia_eta = "20"
print(mio_nome, mio_anno_nascita, mia_eta)
print(type(mio_nome), type(mio_anno_nascita), type(mia_eta))

print(f"il mio nome è {nome}")

anno = int(input("In che anno siamo?"))
eta = int(input("Quando sei nato?"))
print(anno-eta)

base = int(input("inserisci la base"))
altezza = int(input("inserisci l'altezza"))
print(base*altezza/2)

num1 = int(input("inserisci un numero: "))
num2 = int(input("inserisci un numero: "))
num3 = int(input("inserisci un numero: "))
somma = num1 + num2 + num3
media = somma/3
print(media)