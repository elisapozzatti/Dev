"""Sviluppare un sistema di gestione biblioteca che consenta di:
Aggiungere nuovi libri al catalogo
Effettuare prestiti e restituzioni
Tracciare lo stato dei libri
Requisiti Specifici
Classe Libro con attributi: Titolo, Autore, ISBN, Stato (disponibile/non disponibile)1.
2.Classe Biblioteca con metodi:
Aggiungere un libro al catalogo
Prestare un libro a un utente
Restituire un libro
Mostrare l'elenco dei libri
3.Implementare la gestione dei prestiti
4.Gestire lo stato di disponibilità dei libri
5.Utilizzare metodi speciali come __str__"""
class libro:
    def __init__(self, titolo, autore, isbn):
        self.titolo = titolo
        self.autore = autore
        self.isbn = isbn
        self.stato = 'disponibile'
    def __str__(self):
        return f"titolo: {self.titolo}, autore: {self.autore}, isbn: {self.isbn}, stato: {self.stato}"
    def cambiastato(self, nuovostato):
        self.stato = nuovostato
class biblioteca:
    def __init__(self):
        self.catalogo = []
    def aggiungi(self, libro):
        self.catalogo.append(libro)
    def prestito(self, isbn):
        for libro in self.catalogo:
            if(libro.stato == 'disponibile'):
                libro.cambiastato('non disponibile')
                print(f"il libro '{libro.titolo}' è stato prestato")
                return
            else:
                print(f"il libro '{libro.titolo}' non è disponibile")
                return
        print("libro non trovato nel catalogo")
    def restituzione(self, isbn):
        for libro in self.catalogo:
            if(libro.isbn == isbn):
                if(libro.stato == 'non disponibile'):
                    libro.cambiastato('disponibile')
                    print(f"il libro '{libro.titolo}' è stato restituito")
                    return
                else:
                    print(f"il libro '{libro.titolo}' non è stato prestato")
                    return
        print("libro non trovato nel catalogo")
    def mostracatalogo(self):
        if not self.catalogo:
            print("il catalogo è vuoto")
        else:
            for libro in self.catalogo:
                print(libro)

#esempio di utilizzo

#creiamo alcuni libri
libro1 = libro("1984", "george orwell", "9780451524935")
libro2 = libro("il nome della rosa", "umberto eco", "9788845922207")
libro3 = libro("harry potter", "j.k. rowling", "9780747532743")

#creiamo una biblioteca
biblioteca = biblioteca()

#aggiungiamo i libri al catalogo
biblioteca.aggiungi(libro1)
biblioteca.aggiungi(libro2)
biblioteca.aggiungi(libro3)

#mostriamo il catalogo
print("catalogo della biblioteca: ")
biblioteca.mostracatalogo()

#prestiamo un libro
print("prestito del libro '1984")
biblioteca.prestito("9780451524935")

#mostriamo il nuovo catalogo
print("catalogo della biblioteca dopo il prestito: ")
biblioteca.mostracatalogo()

#restituiamo il libro
print("restituzione del libro '1984'")
biblioteca.restituzione("9780451524935")

#mostriamo il nuovo catalogo
print("catalogo della biblioteca dopo la restituzione: ")
biblioteca.mostracatalogo()