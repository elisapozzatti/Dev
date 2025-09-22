#con questo dizionario stampare per ogni studente la media dei suoi voti

studenti = [
    {
        "nome": "aronne", 
        "eta": "23", 
        "voti": [6, 7, 7, 9]
     },
    {
        "nome": "tommaso", 
        "eta": "20", 
        "voti": [5, 8, 4, 6]
    },
    {
        "nome": "andrea", 
        "eta": "21", 
        "voti": [4, 9, 10, 7]
    },
]
somma = 0

for studente in studenti:
    for voto in studente["voti"]:
        somma += voto
    media = somma / len(studente["voti"])
    somma = 0
    print(f"la media dei voti di {studente["nome"]} è {media}")