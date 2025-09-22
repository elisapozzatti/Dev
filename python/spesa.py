"""Creare un programma che gestisca una lista della
spesa. L’utente può aggiungere prodotti con quantità e
visualizzare la lista.
Consentire all’utente di aggiungere un prodotto con la sua quantità.
Se il prodotto è già presente nella lista, aggiornare la quantità.
Consentire all’utente di visualizzare l’intera lista.
Fornire un messaggio di errore per input non validi.
Terminare il programma quando l’utente lo richiede."""
spesa = []
while(True):
    try: 
        fine = str(input("vuoi aggiungere qualcosa alla lista della spesa? se no scrivi fine se vuoi terminare: "))
        if(fine=='fine'):
            break
        elif(fine=='si'):
            quantità = int(input("inserisci la quantità del prodotto che vuoi aggiungere: "))
            prodotto = str(input("inserisci il prodotto da aggiungere: "))
            trovato = False
            for item in spesa:
                if(item["prodotto"] == prodotto):
                    item["quantità"] += quantità
                    trovato = True
                    break
            if not trovato:
                nuovoprodotto = {"quantità": quantità, "prodotto": prodotto}
                spesa.append(nuovoprodotto)
    except(ValueError):
        print("inserisci un valore valido!")
for item in spesa:
    print(f"quantità: {item['quantità']} e prodotto: {item['prodotto']}")