#dizionario che contiene i dati di 3 studenti e stampa per tutti gli studenti se ha più meno o uguale 21 anni

studenti = [
    {"nome": "aronne", "eta": "23"},
    {"nome": "tommaso", "eta": "20"},
    {"nome": "andrea", "eta": "21"},
]

for studente in studenti:
    if studente["eta"]>"21":
        print(f"lo studente {studente["nome"]} ha più di 21 anni")
    elif studente["eta"]<"21":
        print(f"lo studente {studente["nome"]} ha meno di 21 anni")
    else:
        print(f"lo studente {studente["nome"]} ha 21 anni")