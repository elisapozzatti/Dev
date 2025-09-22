"""Creare un sistema di gestione veicoli che permetta di:
Rappresentare diversi tipi di veicoli
Calcolare chilometri percorsi
Mostrare dettagli specifici per ogni tipo di veicolo
Requisiti Specifici
Classe base Veicolo con:
Marca
Modello
Anno
Chilometri percorsi
2.Classi derivate:
Auto con numero di porte
Moto con cilindrata
3.Implementare metodo guida() per aggiornare km
4.Utilizzare ereditarietà e polimorfismo
5.Sovrascrivere il metodo di stampa dei dettagli"""
class veicoli:
    def __init__(self, marca, modello, anno, km):
        self.marca = marca
        self.modello = modello
        self.anno = anno
        self.km = km
    def __str__(self):
        return f"marca: {self.marca}, modello: {self.modello}, anno: {self.anno}, km: {self.km}"
    def guida(self, kmplus):
        self.kmplus = kmplus
        if(self.anno>2015):
            self.km = self.km - self.kmplus 
        else: 
            self.km = self.km + self.kmplus     
class auto(veicoli):
    def __init__(self, marca, modello, anno, km, porte):
        super().__init__(marca, modello, anno, km)
        self.porte = porte
    def __str__(self):
        return f"{super().__str__()}, numero di porte: {self.porte}"
class moto(veicoli):
    def __init__(self, marca, modello, anno, km, cilindrata):
        super().__init__(marca, modello, anno, km)
        self.cilindrata = cilindrata
    def __str__(self):
        return f"{super().__str__()}, cilindrata: {self.cilindrata}"
#esempio di utilizzo

#inseriamo alcuni veicoli
veicolo1 = auto("fiat", "500", 2010, 100100, 3)
veicolo2 = auto("hyunday", "gets", 2005, 120000, 5)
veicolo3 = auto("ford", "puma", 2020, 50500, 5)
veicolo4 = moto("bmw", "roadster", 2018, 80000, "50cc")

#inseriamo i km da aggiungere se la macchina è vecchia o da togliere se non è cosi vecchia
veicolo1.guida(10000)
veicolo2.guida(10000)
veicolo3.guida(10000)
veicolo4.guida(10000)

#dati aggiornati
print(veicolo1)
print(veicolo2)
print(veicolo3)
print(veicolo4)