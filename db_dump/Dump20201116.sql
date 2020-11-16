CREATE DATABASE  IF NOT EXISTS `booki` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `booki`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: booki
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `allowed_rooms`
--

DROP TABLE IF EXISTS `allowed_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allowed_rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building` varchar(255) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allowed_rooms`
--

LOCK TABLES `allowed_rooms` WRITE;
/*!40000 ALTER TABLE `allowed_rooms` DISABLE KEYS */;
INSERT INTO `allowed_rooms` VALUES (1,'Demovägen 1','Demovägen 1a',1),(2,'Demovägen 1','Demovägen 1b',1),(3,'Demovägen 1','Demovägen 1c',1),(4,'Demovägen 1','Demovägen 1d',1);
/*!40000 ALTER TABLE `allowed_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartmentmaster`
--

DROP TABLE IF EXISTS `apartmentmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartmentmaster` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building` varchar(45) NOT NULL,
  `apartment` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login_date` varchar(255) NOT NULL,
  `created_date` varchar(255) NOT NULL,
  `RFID_KEY` text,
  `company` varchar(255) NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'true',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartmentmaster`
--

LOCK TABLES `apartmentmaster` WRITE;
/*!40000 ALTER TABLE `apartmentmaster` DISABLE KEYS */;
INSERT INTO `apartmentmaster` VALUES (1,'Demovägen 1','1001','','$2y$10$1d8hHU120buqrqPhpXgpWOHQxNvXSpaf4ByRu240A3iloYLwW38je','2020-08-09 06:17:34','2019-11-03 18:48:21','','Demo Fastigheter','true'),(2,'Demovägen 1','1002','','$2y$10$LUzOrMHdvR2VLfJW5qfoo.lfEODJsWUvxOaYq.j1gq1YBnXaaI0ne','2020-03-22 22:30:36','2019-11-03 18:48:29','','Demo Fastigheter','true'),(3,'Demovägen 1','1003','','$2y$10$L2bY2hg3lAqOTDqLPuTb2.L9wm3ZxB0yeZA17hA70nNIVtqc1Y7Ca','2019-11-03 18:48:33','2019-11-03 18:48:33','','Demo Fastigheter','true'),(4,'Demovägen 1','1004','','$2y$10$.NCnBRigknePy9uTneSud.85JVSuPXgyic9gg.zjenzdODcmIVmwG','2019-11-03 18:48:37','2019-11-03 18:48:37','','Demo Fastigheter','true'),(5,'Demovägen 1','1005','','$2y$10$XQphcmPMFu4ZUBkfJAnOQOmabFRv4nfmLtCkQ9c7Che92TkH4.oyO','2019-11-03 18:48:40','2019-11-03 18:48:40','','Demo Fastigheter','true'),(6,'Demovägen 1','1006','','$2y$10$vXlfPj0DOtnDVZXwm6YWpeX3d0oDN/5obzXNgckao1LF2y5vql/lm','2019-11-03 18:48:43','2019-11-03 18:48:43','','Demo Fastigheter','true'),(7,'Demovägen 1','1007','','$2y$10$JtwPcO0kHVXmZyj5/vq4UuFBQEgsWSY0fd2ZbmkVy6D.r3Kd9rwzy','2019-11-03 18:48:46','2019-11-03 18:48:46','','Demo Fastigheter','true'),(8,'Demovägen 1','1008','','$2y$10$2R6jTcybCHTNknHNNc5jnumyFbDziLvV7VZpwwvQkB.jdJcJ.lkhy','2019-11-03 18:48:49','2019-11-03 18:48:49','','Demo Fastigheter','true'),(9,'Demovägen 1','1009','','$2y$10$IKVrVa0at1ffbDNNQ0XaquqH8jmnKyTdFbMkqWPhy4E8UrRIhg99e','2019-11-03 18:48:53','2019-11-03 18:48:53','','Demo Fastigheter','true'),(10,'Demovägen 1','1010','','$2y$10$5ODcyaqywmaR9xEUmkflHeHGT/pKuOebvdMa0Clgb8ix.TLcio9BK','2019-11-03 18:48:57','2019-11-03 18:48:57','','Demo Fastigheter','true'),(11,'Demovägen 1','1000','','$2y$10$foaBsEy3UaR823SOa6RLl.e./PYG.4Df2TKumh/a8sq0OR6VrQn4O','2019-11-05 09:02:30','2019-11-05 09:02:30','','Demo Fastigheter','true'),(12,'Demovägen 2','2002','','$2y$10$x0BNoCDlaNO/MegeHb0liO.U9ZplQWJzt4ZuT.7IMEPg7eo6ILhba','2020-03-24 17:50:58','2020-03-24 04:13:56','','Demo Fastigheter','true');
/*!40000 ALTER TABLE `apartmentmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rid` varchar(255) NOT NULL COMMENT 'Room Id',
  `building` varchar(255) NOT NULL COMMENT 'Building Adress',
  `apartment` varchar(255) NOT NULL COMMENT 'Apartment Number',
  `date` date NOT NULL,
  `tid` int NOT NULL COMMENT 'Timeslot Id',
  `time_booked` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Active, 0=Inactive',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,'1','2','3','2019-10-08',1,'2019-10-08 18:38:08',1),(2,'1','2','3','2019-10-08',2,'2019-10-08 15:39:15',1),(3,'1','2','3','2019-10-07',2,'2019-10-07 15:30:20',1),(4,'2','2','1','2019-10-24',1,'2019-10-23 04:06:58',1),(5,'1','2','1','2019-10-24',3,'2019-10-23 04:33:40',1),(6,'2','2','1','2019-10-26',1,'2019-10-23 04:47:03',1),(7,'2','2','1','2019-10-27',1,'2019-10-23 05:27:13',1),(8,'2','2','1','2019-10-25',1,'2019-10-23 05:29:10',1),(9,'1','2','1','2019-10-24',2,'2019-10-23 17:57:05',1),(10,'1','2','1','2019-10-23',2,'2019-10-23 17:58:13',1),(11,'1','2','2','2019-10-24',5,'2019-10-23 20:02:23',1),(12,'1','2','1','2019-10-25',2,'2019-10-27 22:45:05',1),(13,'1','2','1','2019-10-29',2,'2019-10-27 23:43:59',1),(14,'1','2','1','2019-10-28',2,'2019-10-27 23:52:31',1),(15,'1','1','2','2019-10-24',2,'2019-10-27 23:59:49',1),(16,'1','1','2','2019-10-25',2,'2019-10-29 19:03:23',1),(17,'1','1','2','2019-10-26',2,'2019-10-29 19:03:53',1),(18,'1','Demovägen 1','1001','2019-11-05',2,'2019-11-02',1),(19,'1','Demovägen 1','1001','2019-11-05',1,'2019-11-03 22:26:34',1),(20,'1','Demovägen 1','1001','2019-11-08',1,'2019-11-03 22:33:27',1),(21,'1','Demovägen 1','1002','2019-11-08',2,'2019-11-03 22:34:45',1),(22,'1','Demovägen 1','1002','2019-11-16',2,'2019-11-03 22:35:56',1),(23,'1','Demovägen 1','1002','2019-11-09',2,'2019-11-03 22:38:27',1),(24,'1','Demovägen 1','1002','2019-11-11',2,'2019-11-03 22:38:32',1),(25,'1','Demovägen 1','1002','2019-11-07',2,'2019-11-03 22:38:44',1),(26,'1','Demovägen 1','1002','2019-11-06',2,'2019-11-03 22:38:51',1),(27,'1','Demovägen 1','1002','2019-11-05',2,'2019-11-03 22:39:07',1),(28,'1','Demovägen 1','1001','2019-11-11',1,'2019-11-03 22:39:28',1),(29,'1','Demovägen 1','1002','2019-11-13',2,'2019-11-03 23:20:45',1),(30,'1','Demovägen 1','1002','2019-11-20',2,'2019-11-03 23:25:00',1),(31,'1','Demovägen 1','1001','2019-11-10',2,'2019-11-04 17:25:59',1),(32,'1','Demovägen 1','1001','2019-11-14',2,'2019-11-05 09:06:03',1),(33,'1','Demovägen 1','1001','2019-11-06',2,'2019-11-05 12:50:28',1),(34,'1','Demovägen 1','1001','2019-11-06',4,'2019-11-06 11:02:25',1),(35,'1','Demovägen 1','1001','2019-11-06',6,'2019-11-06 11:02:42',1),(36,'1','Demovägen 1','1001','2019-11-06',6,'2019-11-06 11:02:56',1),(37,'1','Demovägen 1','1001','2019-11-06',5,'2019-11-06 11:03:07',1),(38,'1','Demovägen 1','1001','2019-11-07',3,'2019-11-06 12:09:36',1),(39,'1','Demovägen 1','1001','2019-11-07',8,'2019-11-06 12:09:45',1),(40,'1','Demovägen 1','1001','2019-11-07',5,'2019-11-06 12:13:22',1),(41,'1','Demovägen 1','1001','2019-11-07',7,'2019-11-06 12:13:27',1),(42,'1','Demovägen 1','1001','2019-11-07',6,'2019-11-06 14:37:03',1),(43,'1','Demovägen 1','1001','2019-11-07',4,'2019-11-06 14:37:18',1),(44,'1','Demovägen 1','1001','2019-11-08',3,'2019-11-06 14:37:41',1),(45,'1','Demovägen 1','1001','2019-11-08',5,'2019-11-06 14:45:12',1),(46,'1','Demovägen 1','1001','2019-11-08',6,'2019-11-06 14:45:55',1),(47,'1','Demovägen 1','1001','2019-11-08',4,'2019-11-06 14:49:59',1),(48,'1','Demovägen 1','1001','2019-11-06',7,'2019-11-06 15:24:59',1),(49,'1','Demovägen 1','1001','2019-11-08',7,'2019-11-06 17:45:11',1),(50,'1','Demovägen 1','1001','2019-11-08',8,'2019-11-06 17:45:33',1),(51,'1','Demovägen 1','1001','2019-11-09',3,'2019-11-06 17:46:23',1),(52,'1','Demovägen 1','1001','2019-11-16',3,'2019-11-06 19:22:10',1),(53,'1','Demovägen 1','1001','2019-11-16',4,'2019-11-06 19:22:31',1),(54,'1','Demovägen 1','1001','2019-11-09',2,'2019-11-06 20:11:12',1),(55,'1','Demovägen 1','1001','2019-11-09',3,'2019-11-06 20:18:18',1),(66,'1','Demovägen 1','1001','2019-11-22',1,'2019-11-06 20:34:40',1),(67,'1','Demovägen 1','1001','2019-11-09',4,'2019-11-06 20:35:06',1),(68,'0','Demovägen 1','1001','2019-11-13',2,'2019-11-11 21:45:59',1),(69,'0','Demovägen 1','1001','2019-11-13',3,'2019-11-11 21:46:10',1),(70,'1','Demovägen 1','1001','2019-11-13',5,'2019-11-13 12:26:13',1),(71,'1','Demovägen 1','1001','2019-11-14',5,'2019-11-13 12:36:38',1),(72,'1','Demovägen 1','1002','2019-11-14',6,'2019-11-13 12:36:56',1),(73,'1','Demovägen 1','1002','2019-11-14',3,'2019-11-13 12:37:00',1),(74,'1','Demovägen 1','1006','2019-11-14',1,'2019-11-13 12:37:07',1),(75,'0','Demovägen 1','1001','2019-11-14',1,'2019-11-13 21:15:31',1),(76,'Demovägen 1a','Demovägen 1','1001','2019-11-14',3,'2019-11-13 21:17:42',1),(77,'1','Demovägen 1','1001','2019-11-15',2,'2019-11-14 20:06:48',1),(78,'1','Demovägen 1','1001','2019-11-14',7,'2019-11-14 20:22:30',1),(79,'1','Demovägen 1','1001','2019-11-17',1,'2019-11-16 20:37:16',1),(80,'1','Demovägen 1','1001','2019-11-17',2,'2019-11-16 20:37:22',1),(81,'1','Demovägen 1','1001','2019-11-17',3,'2019-11-16 20:37:28',1),(82,'1','Demovägen 1','1001','2019-11-18',1,'2019-11-16 20:37:33',1),(83,'1','Demovägen 1','1001','2019-11-21',2,'2019-11-18 00:57:07',1),(84,'1','Demovägen 1','1001','2019-11-20',3,'2019-11-18 11:02:50',1),(85,'1','Demovägen 1','1001','2019-11-19',1,'2019-11-18 16:15:02',1),(86,'1','Demovägen 1','1001','2019-11-22',2,'2019-11-18 17:41:22',1),(87,'1','Demovägen 1','1001','2019-11-20',4,'2019-11-19 11:22:10',1),(88,'1','Demovägen 1','1001','2019-11-19',8,'2019-11-19 19:38:59',1),(89,'1','Demovägen 1','1001','2019-11-27',2,'2019-11-20 13:22:26',1),(90,'1','Demovägen 1','1001','2019-11-25',2,'2019-11-22 14:59:22',1),(91,'1','Demovägen 1','1001','2019-11-29',3,'2019-11-22 15:20:03',1),(92,'1','Demovägen 1','1001','2019-11-22',3,'2019-11-24 23:51:28',1),(93,'1','Demovägen 1','1001','2019-11-21',3,'2019-11-25 01:48:04',1),(94,'1','Demovägen 1','1001','2019-11-30',6,'2019-11-30 14:58:51',1),(95,'1','Demovägen 1','1001','2019-12-05',5,'2019-12-05 10:45:01',1),(96,'1','Demovägen 1','1001','2019-11-23',2,'2019-12-08 00:29:07',1),(97,'1','Demovägen 1','1001','2019-11-23',3,'2019-12-08 00:29:12',1),(98,'1','Demovägen 1','1001','2019-11-23',8,'2019-12-08 00:29:19',1),(99,'1','Demovägen 1','1001','2020-01-31',5,'2020-01-30 10:40:09',1),(100,'1','Demovägen 1','1001','2020-01-31',6,'2020-01-30 10:40:20',1),(101,'Demovägen 1a','Demovägen 1','1001','2020-01-30',5,'2020-01-30 10:57:03',1),(102,'1','Demovägen 1','1001','2020-02-09',6,'2020-02-09 15:38:55',1),(103,'1','Demovägen 1','1001','2020-02-09',8,'2020-02-09 15:41:35',1),(104,'1','Demovägen 1','1001','2020-03-31',5,'2020-02-13 12:25:04',1),(105,'1','Demovägen 1','1001','2020-01-30',6,'2020-02-13 12:25:13',1),(106,'1','Demovägen 1','1001','2020-02-13',8,'2020-02-13 13:43:44',1),(107,'1','Demovägen 1','1001','2020-02-14',2,'2020-02-13 14:07:37',1),(108,'1','Demovägen 1','1001','2020-02-13',7,'2020-02-13 16:39:05',1),(109,'1','Demovägen 1','1001','2020-01-31',8,'2020-02-13 16:39:49',1),(110,'1','Demovägen 1','1001','2020-02-23',1,'2020-02-22 17:54:58',1),(111,'1','Demovägen 1','1001','2020-02-29',1,'2020-02-22 17:55:14',1),(112,'1','Demovägen 1','1001','2020-02-22',7,'2020-02-22 18:03:36',1),(113,'1','Demovägen 1','1001','2020-02-23',7,'2020-02-23 15:34:40',1),(114,'1','Demovägen 1','1001','2020-02-23',8,'2020-02-23 15:34:58',1),(115,'1','Demovägen 1','1001','2020-02-27',1,'2020-02-23 15:35:57',1),(116,'1','Demovägen 1','1001','2020-02-25',2,'2020-02-24 14:26:45',1),(117,'1','Demovägen 1','1002','2020-02-27',1,'2020-02-24 14:41:07',1),(118,'1','Demovägen 1','1002','2020-02-27',7,'2020-02-24 15:00:19',1),(119,'1','Demovägen 1','1002','2020-02-25',5,'2020-02-24 15:32:39',1),(120,'1','Demovägen 1','1002','2020-02-25',7,'2020-02-24 15:45:43',1),(121,'1','Demovägen 1','1001','2020-03-21',1,'2020-03-14 18:53:53',1),(122,'1','Demovägen 1','1001','2020-03-14',8,'2020-03-14 18:54:01',1),(123,'1','Demovägen 1','1001','2020-03-21',3,'2020-03-21 04:27:50',1),(124,'1','Demovägen 1','1001','2020-03-21',6,'2020-03-21 04:38:51',1),(125,'1','Demovägen 1','1001','2020-03-28',8,'2020-03-21 04:39:02',1),(126,'1','Demovägen 1','1001','0000-00-00',8,'2020-03-21 07:11:36',1),(127,'1','Demovägen 1','1001','0000-00-00',7,'2020-03-21 07:13:38',1),(128,'1','Demovägen 1','1001','2020-03-22',6,'2020-03-21 07:14:44',1),(129,'1','Demovägen 1','1001','2020-03-22',8,'2020-03-21 07:15:29',1),(130,'1','Demovägen 1','1001','2020-03-31',6,'2020-03-21 07:18:51',1),(131,'1','Demovägen 1','1001','2020-03-26',7,'2020-03-21 07:28:21',1),(132,'1','Demovägen 1','1001','2020-03-21',8,'2020-03-21 07:29:06',1),(133,'1','Demovägen 1','1001','2020-03-23',6,'2020-03-23 08:33:12',1),(134,'1','Demovägen 1','1001','2020-03-24',6,'2020-03-24 09:28:31',1),(135,'1','Demovägen 1','1001','2020-03-24',7,'2020-03-24 09:30:03',1),(136,'1','Demovägen 1','1001','2020-03-24',8,'2020-03-24 09:31:44',1),(137,'1','Demovägen 2','2002','2020-03-26',8,'2020-03-24 09:46:29',1),(138,'1','Demovägen 1','1001','2020-03-25',8,'2020-03-24 17:42:03',1),(139,'1','Demovägen 2','2002','2020-03-19',2,'2020-03-24 17:51:19',1),(140,'1','Demovägen 1','1001','2020-03-27',8,'2020-03-27 20:04:14',1),(141,'1','Demovägen 1','1001','2020-03-28',4,'2020-03-27 20:16:50',1),(142,'1','Demovägen 1','1001','2020-04-01',5,'2020-04-01 09:14:51',1),(143,'1','Demovägen 1','1001','2020-04-05',3,'2020-04-05 05:00:41',1),(144,'1','Demovägen 1','1001','2020-04-19',8,'2020-04-19 16:20:39',1),(145,'1','Demovägen 1','1001','2020-04-19',7,'2020-04-19 16:20:45',1),(146,'1','Demovägen 1','1001','2020-04-22',2,'2020-04-19 16:46:17',1),(147,'1','Demovägen 1','1001','2020-05-27',5,'2020-05-06 08:46:08',1),(148,'1','Demovägen 1','1001','2020-07-21',7,'2020-07-21 17:58:57',1),(149,'1','Demovägen 1','1001','2020-07-22',5,'2020-07-21 18:04:19',1);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `building_messages`
--

DROP TABLE IF EXISTS `building_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `building_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `date` date NOT NULL,
  `company` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building_messages`
--

LOCK TABLES `building_messages` WRITE;
/*!40000 ALTER TABLE `building_messages` DISABLE KEYS */;
INSERT INTO `building_messages` VALUES (1,'Demovägen 1','Test1','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','2019-11-21','Demo Comp'),(2,'Demovägen 1','Test2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus dictum at tempor commodo ullamcorper a. Fringilla est ullamcorper eget nulla facilisi etiam. Vulputate odio ut enim blandit. Arcu odio ut sem nulla pharetra diam sit amet nisl. Vitae suscipit tellus mauris a diam maecenas sed. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Orci ac auctor augue mauris augue neque. Semper eget duis at tellus at. Duis at tellus at urna condimentum mattis pellentesque id nibh. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Ac ut consequat semper viverra nam libero. Aliquam purus sit amet luctus. Auctor neque vitae tempus quam pellentesque nec nam aliquam.','2019-11-22','Demo Comp'),(3,'Demovägen 1','Test3','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus dictum at tempor commodo ullamcorper a. Fringilla est ullamcorper eget nulla facilisi etiam. Vulputate odio ut enim blandit. Arcu odio ut sem nulla pharetra diam sit amet nisl. Vitae suscipit tellus mauris a diam maecenas sed. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Orci ac auctor augue mauris augue neque. Semper eget duis at tellus at. Duis at tellus at urna condimentum mattis pellentesque id nibh. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Ac ut consequat semper viverra nam libero. Aliquam purus sit amet luctus. Auctor neque vitae tempus quam pellentesque nec nam aliquam.','2019-11-22','Demo Comp'),(4,'Demovägen 1','Test4','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus dictum at tempor commodo ullamcorper a. Fringilla est ullamcorper eget nulla facilisi etiam. Vulputate odio ut enim blandit. Arcu odio ut sem nulla pharetra diam sit amet nisl. Vitae suscipit tellus mauris a diam maecenas sed. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Orci ac auctor augue mauris augue neque. Semper eget duis at tellus at. Duis at tellus at urna condimentum mattis pellentesque id nibh. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Ac ut consequat semper viverra nam libero. Aliquam purus sit amet luctus. Auctor neque vitae tempus quam pellentesque nec nam aliquam.','2019-11-22','Demo Comp'),(5,'Demovägen 1','Test5','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus dictum at tempor commodo ullamcorper a. Fringilla est ullamcorper eget nulla facilisi etiam. Vulputate odio ut enim blandit. Arcu odio ut sem nulla pharetra diam sit amet nisl. Vitae suscipit tellus mauris a diam maecenas sed. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Orci ac auctor augue mauris augue neque. Semper eget duis at tellus at. Duis at tellus at urna condimentum mattis pellentesque id nibh. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Ac ut consequat semper viverra nam libero. Aliquam purus sit amet luctus. Auctor neque vitae tempus quam pellentesque nec nam aliquam.','2019-11-22','Demo Comp');
/*!40000 ALTER TABLE `building_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buildingmaster`
--

DROP TABLE IF EXISTS `buildingmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buildingmaster` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Active, 0=Inactive',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buildingmaster`
--

LOCK TABLES `buildingmaster` WRITE;
/*!40000 ALTER TABLE `buildingmaster` DISABLE KEYS */;
INSERT INTO `buildingmaster` VALUES (1,'Demovägen 1','Demo Company',1),(2,'Demovägen 2','Demo JustIn',1),(3,'Alpha','Plus Tulsi',1);
/*!40000 ALTER TABLE `buildingmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyuser`
--

DROP TABLE IF EXISTS `companyuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companyuser` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '1',
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `permission` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyuser`
--

LOCK TABLES `companyuser` WRITE;
/*!40000 ALTER TABLE `companyuser` DISABLE KEYS */;
INSERT INTO `companyuser` VALUES ('vall395@gmail.com','$2a$10$OJoG9QQaYaTFOVQCnqLhf.Hhe2x.zIt08aXqBP9lgp/do3oyW8Ple','Demo Fastigheter','Valdemar','Johannesson',1,1,'2020-11-09 02:44:37','2020-11-09 02:44:37',NULL);
/*!40000 ALTER TABLE `companyuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faultreporting`
--

DROP TABLE IF EXISTS `faultreporting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faultreporting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rid` int NOT NULL,
  `machine` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `broke_date` varchar(50) NOT NULL,
  `broke_time` varchar(50) NOT NULL,
  `broke_error` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Active, 0=Inactive',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faultreporting`
--

LOCK TABLES `faultreporting` WRITE;
/*!40000 ALTER TABLE `faultreporting` DISABLE KEYS */;
/*!40000 ALTER TABLE `faultreporting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company` varchar(255) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `type` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Demo Company','Demovägen 1a',1,1),(2,'Demo Company','Demovägen 1b',1,1),(3,'Demo Company','Demovägen 1c',1,1),(4,'Demo Company','Demovägen 1d',1,1);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomtypemaster`
--

DROP TABLE IF EXISTS `roomtypemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomtypemaster` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Active, 0=Inactive',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomtypemaster`
--

LOCK TABLES `roomtypemaster` WRITE;
/*!40000 ALTER TABLE `roomtypemaster` DISABLE KEYS */;
INSERT INTO `roomtypemaster` VALUES (1,'Heavy',1),(2,'Normal',1),(3,'Sauna',1);
/*!40000 ALTER TABLE `roomtypemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('_c_jMLSm2X5JsLqqj4yra0nZtGK-P0_J',1605454514,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"email\":\"vall395@gmail.com\",\"password\":\"$2a$10$OJoG9QQaYaTFOVQCnqLhf.Hhe2x.zIt08aXqBP9lgp/do3oyW8Ple\",\"company\":\"Demo Fastigheter\",\"firstname\":\"Valdemar\",\"lastname\":\"Johannesson\",\"isAdmin\":1,\"isVerified\":1,\"create_time\":\"2020-11-09T02:44:37.000Z\",\"update_time\":\"2020-11-09T02:44:37.000Z\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeslotmaster`
--

DROP TABLE IF EXISTS `timeslotmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeslotmaster` (
  `id` int NOT NULL AUTO_INCREMENT,
  `building` varchar(45) NOT NULL,
  `room_id` varchar(45) NOT NULL,
  `start_time` varchar(50) NOT NULL,
  `end_time` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Active, 0=Inactive',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeslotmaster`
--

LOCK TABLES `timeslotmaster` WRITE;
/*!40000 ALTER TABLE `timeslotmaster` DISABLE KEYS */;
INSERT INTO `timeslotmaster` VALUES (1,'Demovägen 1','Demovägen 1a','00:00','03:00',1),(2,'Demovägen 1','Demovägen 1a','03:00','06:00',1),(3,'Demovägen 1','Demovägen 1a','06:00','09:00',1),(4,'Demovägen 1','Demovägen 1a','09:00','12:00',1),(5,'Demovägen 1','Demovägen 1a','12:00','15:00',1),(6,'Demovägen 1','Demovägen 1a','15:00','18:00',1),(7,'Demovägen 1','Demovägen 1a','18:00','21:00',1),(8,'Demovägen 1','Demovägen 1a','21:00','00:00',1);
/*!40000 ALTER TABLE `timeslotmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `token` varchar(45) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,'vall395@gmail.com','a76dddb774365fda83e06fd9983657af','2020-11-09 02:26:10'),(2,'vall395@gmail.com','b57323a92ef12f46cd715a5955e46c04','2020-11-09 02:44:37');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bid` int NOT NULL,
  `aid` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login_date` varchar(50) NOT NULL,
  `created_date` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Active, 0=Inactive',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,2,1,'test1@gmail.com','$2y$10$ZovydtqFjnFIYIg8e7JyaeQDrjVYOjMgo/j7QmVXfK6EIS0ILqISC','2019-10-23 04:03:59','2019-10-07 13:48:56',1),(2,1,2,'test2@gmail.com','$2y$10$iwDgNNpQY3vcYnvcrxhENOpihsl6v06Wjwu8FzeBOstQynyMSAOAS','2019-10-27 23:59:42','2019-10-07 19:26:19',1),(3,2,3,'test3@gmail.com','$2y$10$A.CH4HuPEqGuhZPCHtsiCutvorpSkfcqLJ5b3fWX7SIGP2F.aJ5d6','2019-10-07 19:32:48','2019-10-07 19:32:48',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-16 13:31:51
