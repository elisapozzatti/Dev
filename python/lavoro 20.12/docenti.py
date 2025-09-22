class Docenti:
    def __init__(self, nome, cognome, cod_docente, email, materia):
        self.nome = nome
        self.cognome = cognome
        self.cod_docente = cod_docente
        self.email = email
        self.materia = materia
        self.stipendio = 1900
        self.ore = 0
        self.corsi = []



    def aggiungi_docente_corso(self, corso):
        self.corsi.append(corso)
        print(f"Il docente {self.nome} {self.cognome} è stato aggiunto al corso: {corso}")

    def conta_ore(self, corso, ore):    
        self.ore += ore
        print(f"\nIl docente {self.nome} {self.cognome} ha insegnato per un totale di {self.ore} ore")
        print(f"Abbiamo aggiunto {ore} ore nel corso {corso} per il docente {self.nome} {self.cognome}\n")


    def calcola_compenso(self):
        if self.ore <= 0:
            print(f"Il docente {self.nome} {self.cognome} non ha delle ore assegnate!!! Inserisci un numero di ore valido!!")
            return
        self.bonus = self.ore * 50
        self.stipendio += self.bonus
        print(f"Lo stipendio totale di {self.nome} {self.cognome} è di: {self.stipendio}€")