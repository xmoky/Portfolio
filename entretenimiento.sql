-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-01-2024 a las 00:14:44
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `entretenimiento`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `idCompra` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `cantidadComprada` int(11) DEFAULT NULL,
  `fechaCompra` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consolas`
--

CREATE TABLE `consolas` (
  `idConsola` int(11) NOT NULL,
  `nombreConsola` varchar(50) NOT NULL,
  `potenciaCPU` varchar(50) DEFAULT NULL,
  `potenciaGPU` varchar(50) DEFAULT NULL,
  `compania` varchar(50) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `unidadesDisponibles` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consolas`
--

INSERT INTO `consolas` (`idConsola`, `nombreConsola`, `potenciaCPU`, `potenciaGPU`, `compania`, `precio`, `unidadesDisponibles`) VALUES
(1001, 'Xbox one', '3,4', '2,5', 'Microsoft', 199.00, 5),
(1002, 'Xbox Series X', '3,8', '3,0', 'Microsoft', 449.00, 11),
(1003, 'Xbox Series S', '3,5', '2,7', 'Microsoft', 229.00, 18),
(1004, 'Switch', '2,8', '1,9', 'Nintendo', 299.00, 44),
(1005, 'Switch Lite', '2,8', '1,9', 'Nintendo', 199.00, 23),
(1006, 'PS4', '3,0', '2,6', 'Sony', 150.00, 7),
(1007, 'PS5 Digital', '4,4', '3,5', 'Sony', 449.00, 49),
(1008, 'PS5 con lector', '4,4', '3,5', 'Sony', 499.00, 89);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `idJuego` int(11) NOT NULL,
  `nombreJuego` varchar(100) NOT NULL,
  `companiaDesarrolladora` varchar(50) DEFAULT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `puntuacionMetacritic` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `unidadesDisponibles` int(11) DEFAULT NULL,
  `idConsola` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`idJuego`, `nombreJuego`, `companiaDesarrolladora`, `genero`, `puntuacionMetacritic`, `precio`, `unidadesDisponibles`, `idConsola`) VALUES
(4, 'The Legend of Zelda: Breath of the Wild', 'Nintendo', 'Aventura', 96, 59.99, 999, 1004),
(5, 'Super Mario Odyssey', 'Nintendo', 'Plataformas', 97, 59.99, 800, 1004),
(6, 'Animal Crossing: New Horizons', 'Nintendo', 'Simulación', 90, 59.99, 1000, 1004),
(7, 'Mario Kart 8 Deluxe', 'Nintendo', 'Carreras', 92, 59.99, 800, 1004),
(8, 'Splatoon 2', 'Nintendo', 'Disparos', 83, 59.99, 1000, 1004),
(9, 'Super Smash Bros. Ultimate', 'Nintendo', 'Lucha', 93, 59.99, 800, 1004),
(10, 'Luigi’s Mansion 3', 'Nintendo', 'Aventura', 86, 59.99, 1000, 1004),
(11, 'Pokémon Sword and Shield', 'Game Freak', 'RPG', 80, 59.99, 800, 1004),
(12, 'Fire Emblem: Three Houses', 'Intelligent Systems', 'RPG', 89, 59.99, 1000, 1004),
(13, 'The Legend of Zelda: Link’s Awakening', 'Nintendo', 'Aventura', 87, 59.99, 800, 1004),
(14, 'The Legend of Zelda: Breath of the Wild', 'Nintendo', 'Aventura', 96, 59.99, 1000, 1005),
(15, 'Super Mario Odyssey', 'Nintendo', 'Plataformas', 97, 59.99, 800, 1005),
(16, 'Animal Crossing: New Horizons', 'Nintendo', 'Simulación', 90, 59.99, 1000, 1005),
(17, 'Mario Kart 8 Deluxe', 'Nintendo', 'Carreras', 92, 59.99, 800, 1005),
(18, 'Splatoon 2', 'Nintendo', 'Disparos', 83, 59.99, 1000, 1005),
(19, 'Super Smash Bros. Ultimate', 'Nintendo', 'Lucha', 93, 59.99, 800, 1005),
(20, 'Luigi’s Mansion 3', 'Nintendo', 'Aventura', 86, 59.99, 1000, 1005),
(21, 'Pokémon Sword and Shield', 'Game Freak', 'RPG', 80, 59.99, 800, 1005),
(22, 'Fire Emblem: Three Houses', 'Intelligent Systems', 'RPG', 89, 59.99, 1000, 1005),
(23, 'The Legend of Zelda: Link’s Awakening', 'Nintendo', 'Aventura', 87, 59.99, 800, 1005),
(24, 'Bloodborne', 'FromSoftware', 'Acción RPG', 92, 19.99, 1000, 1006),
(25, 'God of War', 'Santa Monica Studio', 'Acción Aventura', 94, 19.99, 800, 1006),
(26, 'The Last of Us Part II', 'Naughty Dog', 'Acción Aventura', 93, 19.99, 1000, 1006),
(27, 'Uncharted 4: A Thief’s End', 'Naughty Dog', 'Acción Aventura', 93, 19.99, 800, 1006),
(28, 'Horizon Zero Dawn', 'Guerrilla Games', 'Acción RPG', 89, 19.99, 1000, 1006),
(29, 'Spider-Man', 'Insomniac Games', 'Acción Aventura', 87, 19.99, 800, 1006),
(30, 'Persona 5', 'Atlus', 'RPG', 93, 19.99, 1000, 1006),
(31, 'Final Fantasy VII Remake', 'Square Enix', 'RPG', 87, 19.99, 800, 1006),
(32, 'Resident Evil 2', 'Capcom', 'Survival Horror', 91, 19.99, 1000, 1006),
(33, 'Monster Hunter: World', 'Capcom', 'Acción RPG', 90, 19.99, 800, 1006),
(34, 'Elden Ring', 'FromSoftware', 'Acción RPG', 97, 69.99, 1000, 1007),
(35, 'God of War: Ragnarok', 'Santa Monica Studio', 'Acción Aventura', 96, 69.99, 800, 1007),
(36, 'Demon’s Souls', 'Bluepoint Games', 'Acción RPG', 92, 69.99, 1000, 1007),
(37, 'Ratchet & Clank: Rift Apart', 'Insomniac Games', 'Plataformas', 88, 69.99, 800, 1007),
(38, 'Returnal', 'Housemarque', 'Roguelike', 86, 69.99, 1000, 1007),
(39, 'Resident Evil Village', 'Capcom', 'Survival Horror', 84, 69.99, 800, 1007),
(40, 'Final Fantasy XVI', 'Square Enix', 'RPG', 90, 69.99, 1000, 1007),
(41, 'Horizon Forbidden West', 'Guerrilla Games', 'Acción RPG', 88, 69.99, 800, 1007),
(42, 'Gran Turismo 7', 'Polyphony Digital', 'Carreras', 89, 69.99, 1000, 1007),
(43, 'Deathloop', 'Arkane Studios', 'Acción Aventura', 88, 69.99, 800, 1007),
(44, 'Elden Ring', 'FromSoftware', 'Acción RPG', 97, 69.99, 1000, 1008),
(45, 'God of War: Ragnarok', 'Santa Monica Studio', 'Acción Aventura', 96, 69.99, 800, 1008),
(46, 'Demon’s Souls', 'Bluepoint Games', 'Acción RPG', 92, 69.99, 1000, 1008),
(47, 'Ratchet & Clank: Rift Apart', 'Insomniac Games', 'Plataformas', 88, 69.99, 800, 1008),
(48, 'Returnal', 'Housemarque', 'Roguelike', 86, 69.99, 1000, 1008),
(49, 'Resident Evil Village', 'Capcom', 'Survival Horror', 84, 69.99, 800, 1008),
(50, 'Final Fantasy XVI', 'Square Enix', 'RPG', 90, 69.99, 1000, 1008),
(51, 'Horizon Forbidden West', 'Guerrilla Games', 'Acción RPG', 88, 69.99, 800, 1008),
(52, 'Gran Turismo 7', 'Polyphony Digital', 'Carreras', 89, 69.99, 1000, 1008),
(53, 'Deathloop', 'Arkane Studios', 'Acción Aventura', 88, 69.99, 800, 1008),
(54, 'Halo Infinite', '343 Industries', 'FPS', 87, 59.99, 999, 1001),
(55, 'Forza Horizon 5', 'Playground Games', 'Carreras', 92, 59.99, 800, 1001),
(56, 'Fable', 'Playground Games', 'RPG', 90, 59.99, 1000, 1001),
(57, 'Hellblade II: Senua’s Saga', 'Ninja Theory', 'Acción Aventura', 88, 59.99, 800, 1001),
(58, 'State of Decay 3', 'Undead Labs', 'Survival Horror', 85, 59.99, 1000, 1001),
(59, 'The Elder Scrolls VI', 'Bethesda Game Studios', 'RPG', 90, 59.99, 800, 1001),
(60, 'Avowed', 'Obsidian Entertainment', 'RPG', 88, 59.99, 1000, 1001),
(61, 'Everwild', 'Rare', 'Aventura', 85, 59.99, 800, 1001),
(62, 'S.T.A.L.K.E.R. 2', 'GSC Game World', 'FPS', 87, 59.99, 1000, 1001),
(63, 'Psychonauts 2', 'Double Fine Productions', 'Plataformas', 88, 59.99, 800, 1001),
(64, 'Halo Infinite', '343 Industries', 'FPS', 87, 59.99, 1000, 1002),
(65, 'Forza Horizon 5', 'Playground Games', 'Carreras', 92, 59.99, 800, 1002),
(66, 'Fable', 'Playground Games', 'RPG', 90, 59.99, 1000, 1002),
(67, 'Hellblade II: Senua’s Saga', 'Ninja Theory', 'Acción Aventura', 88, 59.99, 800, 1002),
(68, 'State of Decay 3', 'Undead Labs', 'Survival Horror', 85, 59.99, 1000, 1002),
(69, 'The Elder Scrolls VI', 'Bethesda Game Studios', 'RPG', 90, 59.99, 800, 1002),
(70, 'Avowed', 'Obsidian Entertainment', 'RPG', 88, 59.99, 1000, 1002),
(71, 'Everwild', 'Rare', 'Aventura', 85, 59.99, 800, 1002),
(72, 'S.T.A.L.K.E.R. 2', 'GSC Game World', 'FPS', 87, 59.99, 1000, 1002),
(73, 'Psychonauts 2', 'Double Fine Productions', 'Plataformas', 88, 59.99, 800, 1002),
(74, 'Halo Infinite', '343 Industries', 'FPS', 87, 59.99, 1000, 1003),
(75, 'Forza Horizon 5', 'Playground Games', 'Carreras', 92, 59.99, 800, 1003),
(76, 'Fable', 'Playground Games', 'RPG', 90, 59.99, 1000, 1003),
(77, 'Hellblade II: Senua’s Saga', 'Ninja Theory', 'Acción Aventura', 88, 59.99, 800, 1003),
(78, 'State of Decay 3', 'Undead Labs', 'Survival Horror', 85, 59.99, 1000, 1003),
(79, 'The Elder Scrolls VI', 'Bethesda Game Studios', 'RPG', 90, 59.99, 800, 1003),
(80, 'Avowed', 'Obsidian Entertainment', 'RPG', 88, 59.99, 1000, 1003),
(81, 'Everwild', 'Rare', 'Aventura', 85, 59.99, 800, 1003),
(82, 'S.T.A.L.K.E.R. 2', 'GSC Game World', 'FPS', 87, 59.99, 1000, 1003),
(83, 'Psychonauts 2', 'Double Fine Productions', 'Plataformas', 88, 59.99, 800, 1003);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `esAdmin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `contrasena`, `esAdmin`) VALUES
(1, 'administrador', 'administrador', 1),
(2, 'jaime', 'jaime', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`idCompra`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `consolas`
--
ALTER TABLE `consolas`
  ADD PRIMARY KEY (`idConsola`);

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`idJuego`),
  ADD KEY `idConsola` (`idConsola`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idCompra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `consolas`
--
ALTER TABLE `consolas`
  MODIFY `idConsola` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1010;

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `idJuego` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`);

--
-- Filtros para la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD CONSTRAINT `juegos_ibfk_1` FOREIGN KEY (`idConsola`) REFERENCES `consolas` (`idConsola`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
