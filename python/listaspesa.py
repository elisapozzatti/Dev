"""Creare un programma che gestisca una lista della spesa.
Requisiti:
L'utente deve poter aggiungere elementi alla lista della spesa uno alla
volta.
L'utente può rimuovere un elemento, specificando il nome dell'elemento
da rimuovere.
Alla fine, il programma deve mostrare la lista della spesa aggiornata."""
spesa = []
while(True):
    inserisci = input("vuoi aggiungere un elemento alla lista? ")
    if(inserisci == 'si'):
        aggiunta = input("cosa vuoi aggiungere? ")
        spesa.append(aggiunta)
        print("l'elemento è stato aggiunto")
    elif(inserisci == 'no'):
        break
    else: 
        print("per favore rispondi con si o no")
        continue
while(True):
    togliere = input("vuoi togliere un elemento dalla lista? ")
    if(togliere == 'si'):
        elimina = input("che elemento vuoi togliere dalla lista? ")
        spesa.remove(elimina)
        print("l'elemento è stato rimosso")
    elif(togliere == 'no'):
        break
    else: 
        print("per favore rispondi con si o no")
        continue
print("la tua lista della spesa: ")
print(spesa)
