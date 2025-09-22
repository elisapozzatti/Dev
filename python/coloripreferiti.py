"""Creare un programma che consenta all'utente di
inserire tre colori preferiti e poi visualizzare la lista completa dei
colori inseriti e il primo colore.
Requisiti:
Chiedere all'utente di inserire il proprio colore preferito tre volte e
aggiungere ogni colore alla lista colori_preferiti.
Alla fine, mostrare:
La lista completa dei colori preferiti.
Il primo colore inserito."""
colori_preferiti = []
colore1 = input("inserisci il tuo primo colore preferito: ") #chiede il primo colore preferito
colore2 = input("inserisci il tuo secondo colore preferito: ") #chiede il secondo colore preferito
colore3 = input("inserisci il tuo terzo colore preferito: ") #chiede il terzo colore preferito
colori_preferiti.append(colore1) #aggiunge il primo colore alla lista
colori_preferiti.append(colore2) #aggiunge il secondo colore alla lista
colori_preferiti.append(colore3) #aggiunge il terzo colore alla lista
print(colori_preferiti) #stampa la lista
print(colori_preferiti[0]) #stampa il primo colore della lista