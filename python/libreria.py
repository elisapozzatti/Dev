"""Creare un programma che gestisca un piccolo catalogo di libri.
L’utente deve inserire le seguenti informazioni di due libri: Titolo, Autore, 
Anno di pubblicazione e Genere e il programma deve mostrare
il catalogo completo e le informazioni del secondo libro."""
catalogo = {
    "titolo" : [input("inserisci il titolo di un libro: "), input("inserisci il titolo di un libro: ")],
    "autore" : [input("inserisci l'autore del libro: "), input("inserisci l'autore del libro: ")],
    "anno" : [input("inserisci l'anno di pubblicazione del libro: "), input("inserisci l'anno di pubblicazione del libro: ")],
    "genere" : [input("inserisci il genere del libro: "), input("inserisci il genere del libro: ")]
}
print(catalogo)
print(catalogo["titolo"][1])
print(catalogo["autore"][1])
print(catalogo["anno"][1])
print(catalogo["genere"][1])
