"""Creare un sistema di prenotazione posti per un cinema, con gestione delle sale e dei posti.
Requisiti Specifici
Classe Sala con:1.
Nome
Numero di file
Posti per fila
Mappa dei posti occupati/liberi
Classe Cinema per:2.
Gestire multiple sale
Effettuare prenotazioni
Metodi per:3.
Inizializzare la sala
Prenotare un posto
Visualizzare lo stato dei posti
Gestire correttamente l'occupazione dei posti4.
Implementare controlli sulla disponibilità"""
class sala:
    def __init__(self, nome, numfile, postifila):
        self.nome = nome
        self.numfile = numfile
        self.postifila = postifila
        self.mappa = [[True for _ in range(postifila)] for _ in range(numfile)]
    def __str__(self):
        statoposti = ""
        for fila in self.mappa:
            statoposti += " | ".join(["disponibile" if posto else "occupato" for posto in fila]) + "\n"
        return f"nome: {self.nome}, numero di file: {self.numfile}, numero di posti per fila: {self.postifila}, disponibilità dei posti: \n {statoposti}"
    def prenotazione(self, fila, posto):
        if self.mappa[fila][posto] == True:
            self.mappa[fila][posto] = False
            print(f"il posto {posto+1} nella fila {fila+1} è stato prenotato con successo")
        else:
            print(f"il posto {posto+1} nella fila {fila+1} è già occupato")
class cinema:
    def __init__(self):
        self.cinema = []
    def aggiungisala(self, sala):
        self.cinema.append(sala)
    def prenota(self):
        nomesala = input("per quale sala vuoi prenotare? ")
        sala = None
        for s in self.cinema:
            if s.nome == nomesala:
                sala = s
                break
        if sala is None:
            print(f"{nomesala} non trovata")
            return
        try:
            fila = int(input(f"in quale fila vuoi prenotare? la sala ne ha {sala.numfile}"))
            posto = int(input(f"in quale posto vuoi prenotare? la fila ne ha {sala.postifila}"))
        except ValueError:
            print("input non valido")
            return
        if fila < 0 or fila>= sala.numfile or posto < 0 or posto >= sala.postifila:
            print("fila o posti non validi")
            return
        sala.prenotazione(fila, posto)
    def statoposti(self):
        for sala in self.cinema:
            print(sala)

#esempio di utilizzo

#inseriamo delle sale
sala1 = sala("sala 1", 3, 4)
sala2 = sala("sala 2", 4, 5)
sala3 = sala("sala 3", 5, 6)

#creiamo un cinema
cinema = cinema()

#inseriamo le sale al cinema
cinema.aggiungisala(sala1)
cinema.aggiungisala(sala2)
cinema.aggiungisala(sala3)

#visualizza stato iniziale delle sale
cinema.statoposti()

#prenotazione di un posto
cinema.prenota()

#visualizza la prenotazione
sala.prenotazione()

#visualizza stato delle sale dopo la prenotazione
cinema.statoposti()