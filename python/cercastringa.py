#cerca una stringa in un array e di all'utente se quella stringa esiste o no nella lista

array = ["ciao", "mela", "bici", "pizza", "gatto", "anguria", "albero", "anatroccolo"]
stringa = input("che parola vuoi cercare? ")
if stringa in array:
    print("la stringa è presente nella lista")
else:
    print("la parola non è presente nella lista")

for stringa in array:
    if stringa.lower().startswith("a"):
        print(stringa)