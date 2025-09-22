"""Creare un programma che gestisca i membri (nome, età, città, preferenza
genere letterario) e i libri letti da un club di
lettura (titolo, autore, anno, genere). Gli utenti inseriranno i dettagli di due membri 
e due libri letti dal club. 
Salvare le informazioni di ciascun membro in un dizionario e inserirle in una lista membri.
Salvare ogni libro in una tupla e inserire le tuple in una lista libri.
Creare un set generi_club che contenga tutti i generi letterari preferiti dai membri e quelli
dei libri letti.
Il programma deve poi fornire un riepilogo completo 
e verificare alcune informazioni specifiche: Mostrare:
La lista completa dei membri del club.
I dettagli del primo libro inserito.
Tutti i generi letterari presenti nel club."""
membri = [
    {"nome": "", "età": 0, "città": "", "generepreferito": ""},
    {"nome": "", "età": 0, "città": "", "generepreferito": ""}
]
membri[0]["nome"] = input("inserisci il nome del membro: ")
membri[0]["età"] = int(input("inserisci l'età del membro: "))
membri[0]["città"] = input("inserisci la città del membro: ")
membri[0]["generepreferito"] = input("inserisci il genere preferito del membro: ")

membri[1]["nome"] = input("inserisci il nome del membro: ")
membri[1]["età"] = int(input("inserisci l'età del membro: "))
membri[1]["città"] = input("inserisci la città del membro: ")
membri[1]["generepreferito"] = input("inserisci il genere preferito del membro: ")

listalibri = [
    {"titolo": "", "autore": "", "anno": 0, "genere": ""},
    {"titolo": "", "autore": "", "anno": 0, "genere": ""}
]

listalibri[0]["titolo"] = input("inserisci il titolo del primo libro: ")
listalibri[0]["autore"] = input("inserisci l'autore del primo libro: ")
listalibri[0]["anno"] = input("inserisci l'anno di pubblicazione del primo libro: ")
listalibri[0]["genere"] = input("inserisci il genere del primo libro: ")

listalibri[1]["titolo"] = input("inserisci il titolo del secondo libro: ")
listalibri[1]["autore"] = input("inserisci l'autore del secondo libro: ")
listalibri[1]["anno"] = input("inserisci l'anno di pubblicazione del secondo libro: ")
listalibri[1]["genere"] = input("inserisci il genere del secondo libro: ")

for membro in membri:
    print(membro)

print(listalibri[0])

genericlub = set()
for membro in membri:
    genericlub.add(membro["generepreferito"])
for libro in listalibri:
    genericlub.add(libro["genere"])

print(genericlub)
