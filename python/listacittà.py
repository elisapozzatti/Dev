"""chiedi all'utente di inserire i nomi di tre città che vorrebbe visitare 
e poi mostri la lista completa delle città, oltre all'ultima città inserita"""
città_da_visitare = []
città1 = input("inserisci il nome di una città che vorresti visitare: ")
città_da_visitare.append(città1)
città2 = input("inserisci il nome di una città che vorresti visitare: ")
città_da_visitare.append(città2)
città3 = input("inserisci il nome di una città che vorresti visitare: ")
città_da_visitare.append(città3)
print(città_da_visitare)
print(città_da_visitare[len(città_da_visitare)-1])