lista_utenti=[]
def aggiungi_utente():
    nome=input("inserisci il nome: ")
    cognome=input("inserisci il cognome: ")
    utente = {
        "nome": nome,
        "cognome": cognome,
        "libri": []
    }
    lista_utenti.append(utente)

def utente():
    print(f"1. Aggiungi utente ")
    print(f"2. Visualizza utenti ")
    print(f"3. Rimuovi utente ")
    print(f"4. Esci ")

def rimuovi_utente():
    nome = input("Inserisci il nome dell'utente che vuoi eliminare: ")
    cognome = input("Inserisci il cognome dell'utente da eliminare: ")
    trovato = False
    for i in range(len(lista_utenti)):
        if lista_utenti[i]['nome'] == nome and lista_utenti[i]['cognome'] == cognome:
            del lista_utenti[i]
            print(f"Utente {nome} {cognome} rimosso.")
            trovato = True
            break
    if not trovato:
        print("Utente non trovato.")

utente()
in_utente=int(input("inserisci che operazione vuoi fare: "))
while in_utente != 4:
    if in_utente==1:
        aggiungi_utente()
    elif in_utente==2:
        for i in range(len(lista_utenti)):
            print(f"nome: {lista_utenti[i]['nome']} cognome: {lista_utenti[i]['cognome']}")
    elif in_utente==3:
       rimuovi_utente()
    utente()
    in_utente=int(input("inserisci che operazione vuoi fare: "))
