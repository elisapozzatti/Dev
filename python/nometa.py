#dizionario che contiene i dati di 3 studenti e stampa per tutti gli studenti "mi chiamo "nome" e ho "tot" anni"

studenti = [
    {"nome": "aronne", "eta": "23"},
    {"nome": "tommaso", "eta": "20"},
    {"nome": "andrea", "eta": "22"},
]

for studente in studenti:
    print(f"mi chiamo {studente["nome"]} e ho {studente["eta"]} anni")