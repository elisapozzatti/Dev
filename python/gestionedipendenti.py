"""Sviluppare un sistema per gestire i dipendenti di un'azienda, calcolando gli stipendi in base
a ruoli e competenze.
Requisiti Specifici:
Classe base Dipendente con:
Nome
Cognome
Stipendio base
Classi specializzate:
Programmatore con bonus per linguaggi
Manager con bonus per dimensione team
Classe Azienda per:
Gestire l'insieme dei dipendenti
Calcolare e stampare gli stipendi
4.Implementare calcolo stipendio con bonus
5.Utilizzare ereditarietà e metodi di calcolo personalizzati"""
class dipendente:
    def __init__(self, nome, cognome, stipendio):
        self.nome = nome
        self.cognome = cognome
        self.stipendio = stipendio
    def __str__(self):
        return f"nome: {self.nome}, cognome: {self.cognome}, stipendio: {self.stipendio}"
class programmatore(dipendente):
    def __init__(self, nome, cognome, stipendio, bonuslinguaggi):
        super().__init__(nome, cognome, stipendio)
        self.bonuslinguaggi = bonuslinguaggi
    def __str__(self):
        return f"{super().__str__()}, bonus: {self.bonuslinguaggi}"
class manager(dipendente):
    def __init__(self, nome, cognome, stipendio, bonusteam):
        super().__init__(nome, cognome, stipendio)
        self.bonusteam = bonusteam
    def __str__(self):
        return f"{super().__str__()}, bonus: {self.bonusteam}"
class azienda:
    def __init__(self):
        self.dipendenti = []
    def aggiungidip(self, dipendente):
        self.dipendenti.append(dipendente)
    def calcolo(self):
        for dipendente in self.dipendenti:
            if isinstance(dipendente, programmatore):
                stipendioplus = dipendente.stipendio + dipendente.bonuslinguaggi
                print(f"{dipendente}, stipendio maggiorato: {stipendioplus}")
            elif isinstance(dipendente, manager):
                stipendioplus = dipendente.stipendio + dipendente.bonusteam
                print(f"{dipendente}, stipendio maggiorato: {stipendioplus}")
            else:
                print(f"{dipendente}")

#esempio di utilizzo

#inserisco tre dipendenti
dip1 = dipendente("elisa", "pozzatti", 1200)
dip2 = programmatore("luna", "gasparini", 1300, 300)
dip3 = manager("martina", "pozzatti", 1600, 500)

#creiamo un'azienda
azienda = azienda()
azienda.aggiungidip(dip1)
azienda.aggiungidip(dip2)
azienda.aggiungidip(dip3)

#mostro i dipendenti con anche lo stipendio maggiorato del bonus
azienda.calcolo()