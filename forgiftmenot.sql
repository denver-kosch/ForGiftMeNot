-- MySQL dump 10.13  Distrib 9.2.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: forgiftmenot
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Gifts`
--

DROP TABLE IF EXISTS `Gifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gifts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gifts`
--

LOCK TABLES `Gifts` WRITE;
/*!40000 ALTER TABLE `Gifts` DISABLE KEYS */;
/*!40000 ALTER TABLE `Gifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListGifts`
--

DROP TABLE IF EXISTS `ListGifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListGifts` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `list` int NOT NULL,
  `gift` int NOT NULL,
  PRIMARY KEY (`list`,`gift`),
  KEY `gift` (`gift`),
  CONSTRAINT `listgifts_ibfk_1` FOREIGN KEY (`list`) REFERENCES `Lists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `listgifts_ibfk_2` FOREIGN KEY (`gift`) REFERENCES `Gifts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListGifts`
--

LOCK TABLES `ListGifts` WRITE;
/*!40000 ALTER TABLE `ListGifts` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListGifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Lists`
--

DROP TABLE IF EXISTS `Lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Lists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner` (`owner`),
  CONSTRAINT `lists_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lists`
--

LOCK TABLES `Lists` WRITE;
/*!40000 ALTER TABLE `Lists` DISABLE KEYS */;
INSERT INTO `Lists` VALUES (1,2,'Alice\'s Christmas','Christmas 2025','2025-06-11 03:25:35','2025-06-11 03:25:35'),(2,1,'Reading List','Books Bob wants','2025-06-11 03:25:35','2025-06-11 03:25:35'),(3,3,'Carol\'s Home Needs','Furniture, kitchen stuff','2025-06-11 03:25:35','2025-06-11 03:25:35'),(4,2,'Alice\'s Birthday','Gifts for Alice','2025-06-11 03:25:35','2025-06-11 03:25:35'),(5,1,'Bob\'s Tech','Gadgets and tech','2025-06-11 03:25:35','2025-06-11 03:25:35');
/*!40000 ALTER TABLE `Lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLists`
--

DROP TABLE IF EXISTS `UserLists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserLists` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user` int NOT NULL,
  `list` int NOT NULL,
  PRIMARY KEY (`user`,`list`),
  KEY `list` (`list`),
  CONSTRAINT `userlists_ibfk_1` FOREIGN KEY (`user`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userlists_ibfk_2` FOREIGN KEY (`list`) REFERENCES `Lists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLists`
--

LOCK TABLES `UserLists` WRITE;
/*!40000 ALTER TABLE `UserLists` DISABLE KEYS */;
INSERT INTO `UserLists` VALUES ('2025-06-11 03:25:35','2025-06-11 03:25:35',1,3),('2025-06-11 03:25:35','2025-06-11 03:25:35',1,4),('2025-06-11 03:25:35','2025-06-11 03:25:35',2,1),('2025-06-11 03:25:35','2025-06-11 03:25:35',3,5);
/*!40000 ALTER TABLE `UserLists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNum` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'bob','$2b$10$8I0xW7cqO/2I..SnsxsQLeRBIfD2xrD.UhSmmhSG8tIPYlmM8SFsy','Bob','Brown','bob@example.com','1234567890',1,0,'2025-06-11 03:25:35','2025-11-30 01:27:47'),(2,'alice','$2b$10$8I0xW7cqO/2I..SnsxsQLeRBIfD2xrD.UhSmmhSG8tIPYlmM8SFsy','Alice','Anderson','alice@example.com','1234567890',1,0,'2025-06-11 03:25:35','2025-06-11 03:25:35'),(3,'carol','$2b$10$8I0xW7cqO/2I..SnsxsQLeRBIfD2xrD.UhSmmhSG8tIPYlmM8SFsy','Carol','Clark','carol@example.com','1234567892',1,1,'2025-06-11 03:25:35','2025-06-11 03:25:35');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-26 19:32:26
