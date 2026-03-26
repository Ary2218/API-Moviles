CREATE DATABASE  IF NOT EXISTS `dbappviajes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbappviajes`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: dbappviajes
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aerolineas`
--

DROP TABLE IF EXISTS `aerolineas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aerolineas` (
  `idaerolineas` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `limitepeso` double NOT NULL,
  `costokgexcedente` double NOT NULL,
  PRIMARY KEY (`idaerolineas`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aerolineas`
--

LOCK TABLES `aerolineas` WRITE;
/*!40000 ALTER TABLE `aerolineas` DISABLE KEYS */;
INSERT INTO `aerolineas` VALUES (1,'Aeromexico',150,10),(2,'AeroLinea SOAP',0,20),(3,'AeroLinea SOAP Numero 2',120,35),(4,'AeroLinea SOAP Numero 4',135,94.3),(5,'?',0,0),(6,'SoapUI',123123,123.32);
/*!40000 ALTER TABLE `aerolineas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mochila`
--

DROP TABLE IF EXISTS `mochila`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mochila` (
  `idMochila` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) DEFAULT NULL,
  `Peso` double DEFAULT NULL,
  PRIMARY KEY (`idMochila`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mochila`
--

LOCK TABLES `mochila` WRITE;
/*!40000 ALTER TABLE `mochila` DISABLE KEYS */;
INSERT INTO `mochila` VALUES (16,'Mochila Prueba',164.5),(17,'Mochila Prueba 2',41.2);
/*!40000 ALTER TABLE `mochila` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mochilaobjeto`
--

DROP TABLE IF EXISTS `mochilaobjeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mochilaobjeto` (
  `FK_Objeto` int NOT NULL,
  `FK_Mochila` int NOT NULL,
  KEY `idObjeto_idx` (`FK_Objeto`),
  KEY `FKMochila_idx` (`FK_Mochila`),
  CONSTRAINT `FKMochila` FOREIGN KEY (`FK_Mochila`) REFERENCES `mochila` (`idMochila`),
  CONSTRAINT `FKObjeto` FOREIGN KEY (`FK_Objeto`) REFERENCES `objeto` (`idObjeto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mochilaobjeto`
--

LOCK TABLES `mochilaobjeto` WRITE;
/*!40000 ALTER TABLE `mochilaobjeto` DISABLE KEYS */;
INSERT INTO `mochilaobjeto` VALUES (56,16),(57,16),(58,16),(59,17),(60,17),(63,16);
/*!40000 ALTER TABLE `mochilaobjeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objeto`
--

DROP TABLE IF EXISTS `objeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objeto` (
  `idObjeto` int NOT NULL AUTO_INCREMENT,
  `Peso` double DEFAULT NULL,
  `Cantidad` int DEFAULT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idObjeto`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objeto`
--

LOCK TABLES `objeto` WRITE;
/*!40000 ALTER TABLE `objeto` DISABLE KEYS */;
INSERT INTO `objeto` VALUES (56,30,3,'Mochila Prueba 2'),(57,10,2,'Objet'),(58,0.5,9,'Objetos'),(59,4,10,'Objetivo'),(60,0.2,6,'Cosa'),(61,5,10,'Objeto Prueba sss'),(62,5,10,'Objeto Prueba sss'),(63,5,10,'Objeto Prueba sss');
/*!40000 ALTER TABLE `objeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viaje`
--

DROP TABLE IF EXISTS `viaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viaje` (
  `idViaje` int NOT NULL AUTO_INCREMENT,
  `Destino` varchar(45) DEFAULT NULL,
  `PesoTotal` double DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  PRIMARY KEY (`idViaje`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viaje`
--

LOCK TABLES `viaje` WRITE;
/*!40000 ALTER TABLE `viaje` DISABLE KEYS */;
INSERT INTO `viaje` VALUES (4,'Acapulco',205.7,'2026-10-25');
/*!40000 ALTER TABLE `viaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viajemochilas`
--

DROP TABLE IF EXISTS `viajemochilas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viajemochilas` (
  `FK_Viaje` int NOT NULL,
  `FK_Mochila` int NOT NULL,
  KEY `idViaje_idx` (`FK_Viaje`),
  KEY `idMochila_idx` (`FK_Mochila`),
  CONSTRAINT `MochilaFK` FOREIGN KEY (`FK_Mochila`) REFERENCES `mochila` (`idMochila`),
  CONSTRAINT `ViajeFK` FOREIGN KEY (`FK_Viaje`) REFERENCES `viaje` (`idViaje`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viajemochilas`
--

LOCK TABLES `viajemochilas` WRITE;
/*!40000 ALTER TABLE `viajemochilas` DISABLE KEYS */;
INSERT INTO `viajemochilas` VALUES (4,16),(4,17);
/*!40000 ALTER TABLE `viajemochilas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'dbappviajes'
--

--
-- Dumping routines for database 'dbappviajes'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-26 12:02:33
