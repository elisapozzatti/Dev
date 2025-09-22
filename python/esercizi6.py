## Esercizio 1 ##
# Scrivere un programma che chieda in input all'utente il suo nome,
# la sua data di nascita e la sua mail e salvi queste informazioni in
# un dizionario

dizionario = {}
dizionario["nome"] = str(input("inserisci nome: "))
dizionario["nascita"] = int(input("inserisci anno di nascita: "))
dizionario["mail"] = str(input("inserisci mail: "))
print(dizionario)


## Esercizio 2 ##
# Scrivi un programma che, partendo dal dizionario dell'esercizio precedente
# stampi le informazioni sia in formato di testo:
#Mi chiamo <nome>, sono nato il <data_nascita> e la mia mail è <email>
# sia così:
#Nome: <nome>
#Data di nascita: <data_nascita>
#Email: <email>

print(f"nome: {dizionario['nome']}")
print(f"nascita: {dizionario['nascita']}")
print(f"mail: {dizionario['mail']}")
print(f"mi chiamo {dizionario['nome']}, sono nata nel {dizionario['nascita']} e la mia mail: {dizionario['mail']}")

## Esercizio 4 ##
# Scrivi un programma che, partendo da questo dizionario:
diz_alunni = {
    "Antonio": {
        "eta": 17,
        "artisti_preferiti": {
                "Nirvana": {
                    "album_preferiti": {
                        "Nevermind": {
                            "canzone_preferita": "In Bloom"
                            },
                        "In Utero": {
                            "canzone_preferita": "Heart-Shaped Box"
                            }
                        }
                    },
                "Miles Davis": {
                    "album_preferiti": {
                        "Kind of Blue": {
                            "canzone_preferita": "So What"
                            },
                        "Birth Of The Cool": {
                            "canzone_preferita": "Move"
                            }
                        }
                    }
                }
            }
        }
# Stampi il titolo della canzone preferita dell'album Kind of Blue
# di Miles Davis di Antonio

print(diz_alunni["Antonio"]["artisti_preferiti"]["Miles Davis"]["album_preferiti"]["Kind of Blue"]["canzone_preferita"])

## Esercizio 4 ##
# Scrivi un programma che, partendo dal dizionario dell'esercizio precedente,
# modifichi la canzone preferita dell'album Kind of Blue in "All Blues"

diz_alunni["Antonio"]["artisti_preferiti"]["Miles Davis"]["album_preferiti"]["Kind of Blue"]["canzone_preferita"] = "All Blues"
print(diz_alunni)

## Esercizio 5 ##
# Scrivi un programma che, partendo dal dizionario dell'esercizio precedente,
# elimini Miles Davis dagli artisti preferiti

del diz_alunni["Antonio"]["artisti_preferiti"]["Miles Davis"]
print(diz_alunni)

## Esercizio 6 ##
# Scrivi un programma che, partendo da una lista, mi scriva un dizionario
# delle frequenze che contenga come chiave il valore della lista e come
# valore quante volte appare quell'elemento all'interno della lista

nomi_citta = ["Berlino",
              "Stoccolma",
              "Barcellona",
              "Stoccolma",
              "Milano",
              "Barcellona",
              "Stoccolma",
              "Berlino",
              "Stoccolma"
              ]

diz = {}
for citta in nomi_citta:
    if citta in diz:
        diz[citta] += 1
    else:
        diz[citta] = 1
print(diz)