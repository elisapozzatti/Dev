-- contents
INSERT INTO contents (name, type, duration, price, rent_duration)
VALUES
('serie1', 'serieTV', '', '', ''),
('serie2', 'serieTV', '', '', ''),
('film1', 'film', '5400', '', ''),
('film2', 'film', '7200', '2.99', '30'),
('live1', 'live', '', '', ''),
('serie3', 'serieTV', '', '', ''),
('serie4', 'serieTV', '', '', ''),
('serie5', 'serieTV', '', '', ''),
('serie6', 'serieTV', '', '', ''),
('serie7', 'serieTV', '', '', ''),
('film3', 'film', '7350', '5.99', '2'),
('film4', 'film', '7350', '5.99', '45'),
('live2', 'live', '', '', ''),
('live3', 'live', '', '', ''),
('live4', 'live', '', '', ''),
('live5', 'live', '', '', ''),
('Top Gun: Maverick', 'film', '7380', '6.99', '7'),
('Harry Potter e la pietra filosofale', 'film', '9420', '', ''),
('It', 'film', '11220', '7.99', ''),
('It ends with us', 'film', '7800', '13.99', ''),
('Oppenheimer', 'film', '10680', '4.99', '30')

-- castmembers
INSERT INTO castmembers (name, role)
VALUES
('Nome1', 'regista'),
('Nome2', 'regista'),
('Nome1', 'attore'),
('Nome2', 'attore'),
('Nome1', 'doppiatore'),
('Nome2', 'doppiatore')

-- content_castmembers
INSERT INTO contents_castmembers (id_cast, id_content)
VALUES 
(1, 1),
(1, 2),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(2, 3),
(2, 4),
(2, 11),
(2, 12),
(3, 3),
(4, 4),
(5, 7),
(6, 8)

-- contents_profiles
INSERT INTO contents_profiles (id_profile, id_content)
VALUES 
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(3, 5),
(4, 6),
(4, 7),
(5, 8),
(6, 9),
(5, 9),
(6, 15)

-- genres
INSERT INTO genres (name)
VALUES
('thriller')
('romantico')
('fantasy')
('horror')
('sport')
('anime')
('azione')

-- contents_genres
INSERT INTO contents_genres (name, id_content)
VALUES
('thriller', 1),
('romantico', 2),
('fantasy', 3),
('horror', 4),
('sport', 5),
('anime', 6),
('azione', 7),
('thriller', 8),
('romantico',9),
('fantasy', 10),
('horror', 11),
('anime', 12),
('sport', 13),
('sport', 14),
('sport', 15),
('sport', 16),
('fantasy', 1)
('azione', 17)
('fantasy', 18)
('horror', 19)
('romantico', 20)
('thriller', 21)


-- episodes
INSERT INTO episodes (name, description, duration, id_content)
VALUE
('episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '2400', '1' ),
('episodio2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '2400', '1' ),
('episodio3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '2400', '1' ),
('episodio4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '2400', '1' ),
('episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '1500', '2' ),
('episodio2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '1500', '2' ),
('episodio3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '1500', '2' ),
('episodio4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '1500', '2' ),
('episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '2400', '6' ),
('episodio2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '2400', '6' ),
('episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '2400', '7' ),
('episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '2400', '8' ),
('episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '1500', '2' ),
('episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '1500', '9' ),
('episodio2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '1500', '9' ),
('episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', '1500', '10' )

-- profiles
INSERT INTO profiles (name, email)
VALUES
('profilo1', 'example1@gmail.com'),
('profilo2', 'example1@gmail.com'),
('profilo1', 'example2@gmail.com'),
('profilo2', 'example2@gmail.com'),
('profilo1', 'example3@gmail.com'),
('profilo2', 'example3@gmail.com')

-- users
INSERT INTO users (email, password, name)
VALUES
('example1@gmail.com', '1234', 'user1'),
('example1@gmail.com', '1234', 'user2'),
('example2@gmail.com', '1234', 'user3')


--FASE 1

-- Scrivere la query per estrarre tutti i contenuti di tipo serieTV
SELECT * FROM `contents` WHERE type = 'serieTV';

-- Scrivere la query per estrarre tutti i contenuti di tipo film ma mostrare solo le colonne name e duration
SELECT name, duration FROM `contents` WHERE type = 'film';

-- Scrivere la query per estrarre tutti gli attori dall'elenco dei cast
SELECT * FROM `castmembers` WHERE role = 'attore';

-- Scrivere la query per estrarre la durata totale degli episodi di una singola serieTV (per esempio id_content = 1)
SELECT SUM(duration) FROM `episodes` WHERE id_content = 1;
SELECT id_content, SUM(duration) FROM `episodes` GROUP BY id_content; -- Estrae la somma di tutte le serieTV (suddivise)

-- Scrivere la query per estrarre la media della durata degli episodi di una singola serieTV (per esempio id_content = 1)
SELECT AVG(duration) FROM `episodes` WHERE id_content = 1;
SELECT id_content, AVG(duration) FROM `episodes` GROUP BY id_content; -- Estrae la media di tutte le serieTV (suddivise)
z
-- Dalla tabella dei contents_genres scrivere la query per estrarre tutti i generi di uno specifico contenuti (scegliere un id)
SELECT name FROM `contents_genres` WHERE id_content = 1;

-- Scrivere la query per estrarre tutti i contenuti di tipo live in ordine alfabetico di nome
SELECT * FROM `contents` WHERE type = 'live' ORDER BY name ASC;


--FASE 2

--Scrivere la query per estrarre tutti i nomi e il tipo dei contenuti che hanno Tarantino nel cast
SELECT contents.name, contents.type FROM `contents` 
INNER JOIN contents_castmembers ON contents.id = contents_castmembers.id_content 
INNER JOIN castmembers ON contents_castmembers.id_cast = castmembers.id 
WHERE castmembers.name = 'Tarantino';

--Scrivere la query per raggruppare tutti i contenuti per genere e di ogni genere stampare quanti contenuti ci sono
SELECT genres.name, COUNT(*) FROM `contents` 
INNER JOIN contents_genres ON contents.id = contents_genres.id_content 
INNER JOIN genres ON contents_genres.name = genres.name 
GROUP BY genres.name;

--Scrivere la query per raggruppare tutti i contenuti (di tipo film) per genere e di ogni genere stampare la media della durata dei contenuti
SELECT genres.name, AVG(contents.duration) FROM `contents` 
INNER JOIN contents_genres ON contents.id = contents_genres.id_content 
INNER JOIN genres ON contents_genres.name = genres.name 
WHERE contents.type = 'film' 
GROUP BY genres.name;


--FASE 3

--