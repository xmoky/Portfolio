-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-01-2024 a las 13:20:43
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pacofiestas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catering`
--

CREATE TABLE `catering` (
  `CIFEmpresa` varchar(10) NOT NULL,
  `NombreEmpresa` varchar(40) DEFAULT NULL,
  `Menu` enum('opción1','opción2','opción3','opción4','opción5') DEFAULT NULL,
  `Zona` varchar(30) DEFAULT NULL,
  `NumComensales` int(11) DEFAULT NULL,
  `Precio` double DEFAULT NULL,
  `Observaciones` varchar(50) DEFAULT NULL,
  `Disponibilidad` date DEFAULT NULL,
  `Puntos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coches`
--

CREATE TABLE `coches` (
  `id` int(11) NOT NULL,
  `Matricula` varchar(8) NOT NULL,
  `Marca` varchar(20) DEFAULT NULL,
  `Modelo` varchar(40) DEFAULT NULL,
  `PrecioHora` double DEFAULT NULL,
  `NumPlazas` tinyint(4) DEFAULT NULL,
  `Opciones` varchar(40) DEFAULT NULL,
  `Zona` varchar(30) DEFAULT NULL,
  `Disponibilidad` date DEFAULT NULL,
  `Puntos` int(2) DEFAULT NULL,
  `categorias` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `coches`
--

INSERT INTO `coches` (`id`, `Matricula`, `Marca`, `Modelo`, `PrecioHora`, `NumPlazas`, `Opciones`, `Zona`, `Disponibilidad`, `Puntos`, `categorias`) VALUES
(8, '5645GTV', 'AUDI', 'A3', 10, 5, 'AC', 'MADRID', '2023-12-28', 10, 'compacto'),
(10, '8989GTY', 'bmwrt', 'serie 2', 34, 5, 'AC', 'madrid', '0000-00-00', NULL, NULL),
(11, '9909GTY', 'mercedes', 'clase a', 89, 5, 'AC', 'marruecos\n', '2024-01-17', NULL, NULL),
(12, '8989GT7', 'bmw', 'serie 2', 89, 5, 'AC', 'madrid', '2024-01-11', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entretenimiento`
--

CREATE TABLE `entretenimiento` (
  `ID` int(11) NOT NULL,
  `Oficio` enum('mago','cómico','dj','stripper') DEFAULT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  `Precio` double DEFAULT NULL,
  `Observaciones` varchar(50) DEFAULT NULL,
  `Zona` varchar(30) DEFAULT NULL,
  `Disponibilidad` date DEFAULT NULL,
  `Puntos` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entretenimiento`
--

INSERT INTO `entretenimiento` (`ID`, `Oficio`, `Descripcion`, `Precio`, `Observaciones`, `Zona`, `Disponibilidad`, `Puntos`) VALUES
(1, '', 'Mago ilusionista', 50, 'Magia increíble', 'Centro', '2024-02-01', 5),
(4, 'stripper', 'Stripper profesional', 120, 'Show sensual', 'Oeste', '2024-04-05', 8),
(5, 'mago', 'Mago de close-up', 60, 'Trucos asombrosos', 'Este', '2024-05-20', 7),
(6, 'cómico', 'Cómico improvisador', 35, 'Humor espontáneo', 'Centro', '2024-06-15', 5),
(7, 'dj', 'DJ profesional para fiestas', 90, 'Ambiente garantizado', 'Norte', '2024-07-10', 6),
(8, 'stripper', 'Stripper sensual y elegante', 150, 'Show cautivador', 'Sur', '2024-08-05', 9),
(9, 'mago', 'Mago especializado en magia de salón', 70, 'Magia para todos', 'Oeste', '2024-09-20', 8),
(10, 'cómico', 'Cómico con humor inteligente', 45, 'Risas garantizadas', 'Este', '2024-10-15', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Dni` varchar(10) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Contraseña` varchar(6) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Puntos` int(3) DEFAULT NULL,
  `Fotografia` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Dni`, `Nombre`, `Apellido`, `FechaNacimiento`, `Email`, `Contraseña`, `Telefono`, `Puntos`, `Fotografia`) VALUES
('', '', '', '0000-00-00', '', '', '', 0, NULL),
('09445707K', 'dqwdqdqwd', 'qwdqdfqdq', '2023-11-01', 'qdqdfqdqdqd', '123456', '123456789', 0, NULL),
('24941517H', 'egerge', 'gwqegweg', '2023-11-09', 'wegegegeg', '123456', '123456789', 0, NULL),
('24989798E', 'fwfwefwfw', 'qfwfwfwfwefw', '1933-11-08', 'fwwefwgfwregfwg', '123456', '123456789', 0, NULL),
('29447413F', 'jaime', 'dasdfasd', '2023-11-09', 'gwfgwgwg', '123456', '123456789', 0, NULL),
('29900597E', 'JUAN', 'VILLA', '2023-11-07', 'juan@gmail.com', '123456', '678906543', 0, NULL),
('31401570S', 'fwefwef', 'wfwfwfwfwf', '2023-11-08', 'wfwfwfwfwfwfwf', '123456', '999999999', 0, NULL),
('32670000H', 'ewfwqf', 'wefwfwf', '2023-11-01', 'wfwfwfw', '123456', '123456789', 0, NULL),
('34283034Q', 'ewrfewrf', 'efwefwefw', '2023-11-09', 'fwfwfwfw', '123456', '234567656', 0, NULL),
('36178170K', 'jaiem', 'jurin', '2023-11-16', 'jurin@gmail.com', '123456', '653425634', 0, NULL),
('36468100J', 'cwsgvbsdg', 'gbdgbdbd', '2023-11-15', 'bdbdgbdbdb', '123456', '222222222', 0, NULL),
('41482621M', 'dscvaavsvs', 'vcafcavava', '2023-11-09', 'awafgsagfsfvs<', '123456', '234567890', 0, NULL),
('51505879R', 'JAIEN', 'EWFWFWF', '2023-11-09', 'WFWFWF', '123456', '123456789', 0, NULL),
('53245407Q', 'dqwdqdqwd', 'qwdqdfqdq', '2023-11-01', 'qdqdfqdqdqd', '123456', '123456789', 0, NULL),
('54241545R', 'JAIEN', 'EWFWFWF', '2023-11-09', 'WFWFWF', '123456', '123456789', 0, NULL),
('55127147B', 'JAIEN', 'EWFWFWF', '2023-11-09', 'WFWFWF', '123456', '123456789', 0, NULL),
('98340687R', 'jaime', 'jnasdihsd', '2023-11-08', 'dasjghdasjhdsahd', '123456', '635242314', 0, NULL),
('[object HT', '', '', '0000-00-00', '', '', '', 0, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `catering`
--
ALTER TABLE `catering`
  ADD PRIMARY KEY (`CIFEmpresa`);

--
-- Indices de la tabla `coches`
--
ALTER TABLE `coches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `entretenimiento`
--
ALTER TABLE `entretenimiento`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `coches`
--
ALTER TABLE `coches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `entretenimiento`
--
ALTER TABLE `entretenimiento`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
