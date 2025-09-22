-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Dic 13, 2024 alle 12:10
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amazon prime`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `castmembers`
--

CREATE TABLE `castmembers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `castmembers`
--

INSERT INTO `castmembers` (`id`, `name`, `role`) VALUES
(1, 'Tarantino', 'regista'),
(2, 'Nolan', 'regista'),
(3, 'Timothée Chalamet', 'attore'),
(4, 'Zendaya', 'attore'),
(5, 'Pannofino', 'doppiatore'),
(6, 'Insegno', 'doppiatore');

-- --------------------------------------------------------

--
-- Struttura della tabella `contents`
--

CREATE TABLE `contents` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(15) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` float NOT NULL,
  `rent_duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `contents`
--

INSERT INTO `contents` (`id`, `name`, `type`, `duration`, `price`, `rent_duration`) VALUES
(1, 'Breaking Bad', 'serieTV', 0, 0, 0),
(2, 'The100', 'serieTV', 0, 0, 0),
(3, 'Interstellar', 'film', 5400, 0, 0),
(4, 'Wonder', 'film', 7200, 2.99, 30),
(5, 'Atalanta - Real Madrid', 'live', 0, 0, 0),
(6, 'Suits', 'serieTV', 0, 0, 0),
(7, 'Prison Break', 'serieTV', 0, 0, 0),
(8, 'Peaky Blinders', 'serieTV', 0, 0, 0),
(9, 'Dragon Ball', 'serieTV', 0, 0, 0),
(10, 'The Witcher', 'serieTV', 0, 0, 0),
(11, 'Saw', 'film', 7350, 5.99, 2),
(12, 'Cocainorso', 'film', 7350, 5.99, 45),
(13, 'Juventus - Manchester City', 'live', 0, 0, 0),
(14, 'Milan - Stella Rossa', 'live', 0, 0, 0),
(15, 'Bayer Leverkusen - Inter', 'live', 0, 0, 0),
(16, 'Benfica - Bologna', 'live', 0, 0, 0),
(17, 'Top Gun: Maverick', 'film', 7380, 6.99, 7),
(18, 'Harry Potter e la pietra filosofale', 'film', 9420, 0, 0),
(19, 'It', 'film', 11220, 7.99, 0),
(20, 'It ends with us', 'film', 7800, 13.99, 0),
(21, 'Oppenheimer', 'film', 10680, 4.99, 30);

-- --------------------------------------------------------

--
-- Struttura della tabella `contents_castmembers`
--

CREATE TABLE `contents_castmembers` (
  `id_cast` int(11) NOT NULL,
  `id_content` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `contents_castmembers`
--

INSERT INTO `contents_castmembers` (`id_cast`, `id_content`) VALUES
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
(6, 8);

-- --------------------------------------------------------

--
-- Struttura della tabella `contents_genres`
--

CREATE TABLE `contents_genres` (
  `name` varchar(20) NOT NULL,
  `id_content` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `contents_genres`
--

INSERT INTO `contents_genres` (`name`, `id_content`) VALUES
('thriller', 1),
('fantasy', 3),
('horror', 4),
('sport', 5),
('anime', 6),
('azione', 7),
('thriller', 8),
('romantico', 9),
('fantasy', 10),
('horror', 11),
('anime', 12),
('sport', 13),
('sport', 14),
('sport', 15),
('sport', 16),
('fantasy', 1),
('azione', 17),
('fantasy', 18),
('horror', 19),
('romantico', 20),
('thriller', 21);

-- --------------------------------------------------------

--
-- Struttura della tabella `contents_profiles`
--

CREATE TABLE `contents_profiles` (
  `id_profile` int(11) NOT NULL,
  `id_content` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `contents_profiles`
--

INSERT INTO `contents_profiles` (`id_profile`, `id_content`) VALUES
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
(6, 15);

-- --------------------------------------------------------

--
-- Struttura della tabella `episodes`
--

CREATE TABLE `episodes` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `duration` int(11) NOT NULL,
  `id_content` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `episodes`
--

INSERT INTO `episodes` (`id`, `name`, `description`, `duration`, `id_content`) VALUES
(1, 'episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 2400, 1),
(2, 'episodio2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 2400, 1),
(3, 'episodio3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 2400, 1),
(4, 'episodio4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 2400, 1),
(5, 'episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 1500, 2),
(6, 'episodio2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 1500, 2),
(7, 'episodio3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 1500, 2),
(8, 'episodio4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 1500, 2),
(9, 'episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 2400, 6),
(10, 'episodio2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 2400, 6),
(11, 'episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 2400, 7),
(12, 'episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 2400, 8),
(13, 'episodio5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 1500, 2),
(14, 'episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 1500, 9),
(15, 'episodio2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 1500, 9),
(16, 'episodio1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mi lectus, dictum sit amet tortor.', 1500, 10);

-- --------------------------------------------------------

--
-- Struttura della tabella `genres`
--

CREATE TABLE `genres` (
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `genres`
--

INSERT INTO `genres` (`name`) VALUES
('anime'),
('azione'),
('fantasy'),
('horror'),
('romantico'),
('sport'),
('thriller');

-- --------------------------------------------------------

--
-- Struttura della tabella `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `profiles`
--

INSERT INTO `profiles` (`id`, `name`, `email`) VALUES
(1, 'Iacopo', 'example1@gmail.com'),
(2, 'Bambini', 'example1@gmail.com'),
(3, 'Francesco', 'example2@gmail.com'),
(4, 'Simone', 'example2@gmail.com'),
(5, 'Cassandra', 'example3@gmail.com'),
(6, 'Valeria', 'example3@gmail.com');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`email`, `password`, `name`) VALUES
('example1@gmail.com', '1234', 'Iacopo'),
('example2@gmail.com', '1234', 'Francesco'),
('example3@gmail.com', '1234', 'Cassandra');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `castmembers`
--
ALTER TABLE `castmembers`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `contents_castmembers`
--
ALTER TABLE `contents_castmembers`
  ADD KEY `id_cast` (`id_cast`),
  ADD KEY `id_content` (`id_content`);

--
-- Indici per le tabelle `contents_genres`
--
ALTER TABLE `contents_genres`
  ADD KEY `id_content` (`id_content`),
  ADD KEY `name` (`name`);

--
-- Indici per le tabelle `contents_profiles`
--
ALTER TABLE `contents_profiles`
  ADD KEY `id_profile` (`id_profile`),
  ADD KEY `id_content` (`id_content`);

--
-- Indici per le tabelle `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_content` (`id_content`);

--
-- Indici per le tabelle `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`name`);

--
-- Indici per le tabelle `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `castmembers`
--
ALTER TABLE `castmembers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `contents`
--
ALTER TABLE `contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT per la tabella `episodes`
--
ALTER TABLE `episodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT per la tabella `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `contents_castmembers`
--
ALTER TABLE `contents_castmembers`
  ADD CONSTRAINT `contents_castmembers_ibfk_1` FOREIGN KEY (`id_cast`) REFERENCES `castmembers` (`id`),
  ADD CONSTRAINT `contents_castmembers_ibfk_2` FOREIGN KEY (`id_content`) REFERENCES `contents` (`id`);

--
-- Limiti per la tabella `contents_genres`
--
ALTER TABLE `contents_genres`
  ADD CONSTRAINT `contents_genres_ibfk_1` FOREIGN KEY (`id_content`) REFERENCES `contents` (`id`),
  ADD CONSTRAINT `contents_genres_ibfk_2` FOREIGN KEY (`name`) REFERENCES `genres` (`name`);

--
-- Limiti per la tabella `contents_profiles`
--
ALTER TABLE `contents_profiles`
  ADD CONSTRAINT `contents_profiles_ibfk_1` FOREIGN KEY (`id_profile`) REFERENCES `profiles` (`id`),
  ADD CONSTRAINT `contents_profiles_ibfk_2` FOREIGN KEY (`id_content`) REFERENCES `contents` (`id`);

--
-- Limiti per la tabella `episodes`
--
ALTER TABLE `episodes`
  ADD CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`id_content`) REFERENCES `contents` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
