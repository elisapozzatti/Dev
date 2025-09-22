#inizializzazione lista dei libri della biblioteca
def __init__(self):
    #credo la lista di dizionari
    self.listalibri = [
        {"titolo": "", "autore": "", "anno_pubblicazione": "", "disponibile": ""}
    ]
#creazione funzione per aggiungere un libro alla biblioteca
def aggiungi_libro(self):
    #inserimento delle informazioni del nuovo libro
    nuovo_libro = {
        "titolo": input("inserisci il titolo del libro: "),
        "autore": input("inserisci l'autore del libro: "),
        "anno_pubblicazione": input("inserisci l'anno di pubblicazione del libro: "),
        "disponibile": "true"
    }
    #aggiungo il libro alla lista dei libri della biblioteca
    self.listalibri.append(nuovo_libro)
#creazione funzione per rimuovere un libro dalla biblioteca
def rimuovi_libro(self):
    #chiedo il titolo del libro da rimuovere
    libro_da_rimuovere = input("qual è il titolo del libro da rimuovere? ")
    #se il libro è presente nella lista lo elimino
    for libro in self.listalibri:
        if(self.listalibri["titolo"] == libro_da_rimuovere):
            self.listalibri.pop(libro)
    #altrimenti avviso l'utente che il libro non è presente
    else:
        print("il libro non è presente nella biblioteca")
#creazione funzione di ricerca di un libro nella biblioteca
def cerca_libro(self):
    #chiedo il titolo del libro da cercare
    libro_da_cercare = input("inserisci il titolo del libro da cercare: ")
    #se il libro è presente nella lista stampo le sue informazioni
    for libro in self.listalibri:
        if(self.listalibri["titolo"] == libro_da_cercare):
            print(self.listalibri[libro])
        #altrimenti avviso l'utente che il libro non è presente 
        else:
            print("il libro cercato non è presente nella libreria")
#creazione funzione di prestito di un libro della biblioteca
def prestito_libro(self):
    #chiedo il titolo del libro che vorrebbe in prestito l'utente
    libro_da_prestare = input("inserisci il titolo del libro che vorresti in prestito: ")
    