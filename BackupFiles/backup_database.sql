-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: minicambio
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `backup`
--

DROP TABLE IF EXISTS `backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `backup` (
  `pk_backup` int(11) NOT NULL AUTO_INCREMENT,
  `data_backup` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_backup`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backup`
--

LOCK TABLES `backup` WRITE;
/*!40000 ALTER TABLE `backup` DISABLE KEYS */;
INSERT INTO `backup` VALUES (3,'2016-02-21 21:06:06'),(4,'2016-02-21 21:10:34'),(5,'2016-02-21 21:13:18'),(6,'2016-02-21 21:13:58'),(7,'2016-02-21 21:18:05'),(8,'2016-02-21 21:18:11'),(9,'2016-02-21 21:18:42'),(10,'2016-02-21 21:20:42'),(11,'2016-02-21 21:21:40'),(12,'2016-02-21 21:22:57'),(13,'2016-02-21 21:23:40'),(14,'2016-02-21 21:23:45'),(15,'2016-02-21 21:24:14'),(16,'2016-02-21 21:25:02'),(17,'2016-02-21 21:25:51');
/*!40000 ALTER TABLE `backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operazioni`
--

DROP TABLE IF EXISTS `operazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operazioni` (
  `pk_operazione` int(11) NOT NULL AUTO_INCREMENT,
  `data_op` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fk_valuta_entrata` int(11) NOT NULL,
  `importo_entrata` float NOT NULL,
  `fk_valuta_uscita` int(11) NOT NULL,
  `importo_uscita` float NOT NULL,
  `tasso` float NOT NULL,
  `cod_op` bigint(15) NOT NULL COMMENT 'anno+ mese + 9 numeri',
  `tipo_operazione` bit(1) NOT NULL COMMENT '0 Acquisto 1 Vendita',
  PRIMARY KEY (`pk_operazione`),
  UNIQUE KEY `cod_op` (`cod_op`),
  KEY `fk_valuta_entrata` (`fk_valuta_entrata`),
  KEY `fk_valuta_uscita` (`fk_valuta_uscita`),
  CONSTRAINT `operazione_valuta_entrata` FOREIGN KEY (`fk_valuta_entrata`) REFERENCES `valute` (`pk_valuta`),
  CONSTRAINT `operazione_valuta_uscita` FOREIGN KEY (`fk_valuta_uscita`) REFERENCES `valute` (`pk_valuta`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operazioni`
--

LOCK TABLES `operazioni` WRITE;
/*!40000 ALTER TABLE `operazioni` DISABLE KEYS */;
INSERT INTO `operazioni` VALUES (4,'2016-01-21 14:59:02',1,10,2,9.13242,1.095,201601000000000,''),(7,'2016-01-22 12:27:17',1,10,19,9.30233,1.075,201601000000001,''),(8,'2016-01-22 12:27:17',1,9.30233,2,10.0465,1.08,201601000000002,''),(9,'2016-01-22 12:28:02',2,9.30233,1,10.0465,1.08,201601000000003,''),(10,'2016-01-22 12:28:02',1,10,19,9.30233,1.075,201601000000004,''),(11,'2016-02-08 10:52:25',1,20,2,21.9,1.095,201602000000001,'\0'),(12,'2016-02-11 18:30:40',2,8121.11,1,7693.36,1.0556,201602000000002,''),(13,'2016-02-14 12:08:35',19,3,1,2.43309,1.233,201602000000003,''),(14,'2016-02-14 12:08:35',1,2.45,2,2.6803,1.094,201602000000004,'\0'),(15,'2016-02-14 12:14:10',1,4,2,4.38,1.095,201602000000005,'\0'),(16,'2016-02-14 12:15:38',2,2,1,1.86047,1.075,201602000000006,''),(17,'2016-02-14 12:16:35',1,23,2,25.185,1.095,201602000000007,'\0'),(18,'2016-02-14 12:19:14',2,12,1,11.1628,1.075,201602000000008,''),(19,'2016-02-14 12:20:33',2,43,1,40,1.075,201602000000009,''),(20,'2016-02-14 12:20:33',1,40,19,43.2,1.08,201602000000010,'\0'),(21,'2016-02-14 12:22:28',1,2,2,2.19,1.095,201602000000011,'\0'),(22,'2016-02-14 12:23:35',1,23,19,24.84,1.08,201602000000012,'\0'),(23,'2016-02-14 12:24:50',1,12,2,13.14,1.095,201602000000013,'\0'),(24,'2016-02-14 12:26:42',1,3,2,3.285,1.095,201602000000014,'\0'),(25,'2016-02-14 12:30:56',1,3,2,3.285,1.095,201602000000015,'\0'),(26,'2016-02-14 12:35:37',1,32,19,34.56,1.08,201602000000016,'\0'),(27,'2016-02-14 12:36:49',2,2,1,1.86047,1.075,201602000000017,''),(28,'2016-02-14 12:37:16',1,13,2,14.235,1.095,201602000000018,'\0'),(29,'2016-02-14 12:40:02',1,3,2,3.285,1.095,201602000000019,'\0'),(30,'2016-02-14 12:40:18',2,24,1,22.3256,1.075,201602000000020,''),(31,'2016-02-14 12:40:18',1,22.3256,19,24.1116,1.08,201602000000021,'\0'),(32,'2016-02-14 13:06:14',1,2,19,2.16,1.08,201602000000022,'\0'),(33,'2016-02-14 13:09:25',1,3,2,3.285,1.095,201602000000023,'\0'),(34,'2016-02-14 13:15:45',2,14,1,13.0233,1.075,201602000000024,''),(35,'2016-02-14 13:15:45',1,13.0233,19,14.0651,1.08,201602000000025,'\0'),(36,'2016-02-14 13:16:02',1,13,19,14.04,1.08,201602000000026,'\0'),(37,'2016-02-14 15:10:51',2,34,1,31.6279,1.075,201602000000027,''),(38,'2016-02-14 15:55:44',2,1040.8,1,968.186,1.075,201602000000028,''),(39,'2016-02-14 17:32:42',1,13,2,14.235,1.095,201602000000029,'\0'),(40,'2016-02-14 17:33:28',2,3,1,2.7907,1.075,201602000000030,'');
/*!40000 ALTER TABLE `operazioni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operazioni_oro`
--

DROP TABLE IF EXISTS `operazioni_oro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operazioni_oro` (
  `pk_op_oro` int(11) NOT NULL AUTO_INCREMENT,
  `cod_op_oro` bigint(15) NOT NULL,
  `data_op` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `grammi` float NOT NULL,
  `carati` float DEFAULT NULL,
  `prezzo` float NOT NULL,
  `totale` float NOT NULL,
  PRIMARY KEY (`pk_op_oro`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operazioni_oro`
--

LOCK TABLES `operazioni_oro` WRITE;
/*!40000 ALTER TABLE `operazioni_oro` DISABLE KEYS */;
INSERT INTO `operazioni_oro` VALUES (18,1,'2016-02-11 16:52:03',1,1,1,1),(19,2,'2016-02-11 18:29:03',1,1,1,1),(20,3,'2016-02-14 14:51:52',2.6666,2,45,120),(21,4,'2016-02-14 15:07:39',3,3,23,69),(23,5,'2016-02-14 15:11:46',2,13,44,88),(24,6,'2016-02-14 15:44:00',3,2,34,102),(25,7,'2016-02-14 15:44:56',24,1,34,816);
/*!40000 ALTER TABLE `operazioni_oro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tassi`
--

DROP TABLE IF EXISTS `tassi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tassi` (
  `pk_tasso` int(11) NOT NULL AUTO_INCREMENT,
  `fk_valuta_entrata` int(11) NOT NULL,
  `fk_valuta_uscita` int(11) NOT NULL,
  `valore` float NOT NULL,
  `tipo_operazione` bit(1) NOT NULL COMMENT '0 Acquisto 1 Vendita',
  PRIMARY KEY (`pk_tasso`),
  UNIQUE KEY `fk_valuta_entrata_3` (`fk_valuta_entrata`,`fk_valuta_uscita`),
  UNIQUE KEY `fk_valuta_entrata_4` (`fk_valuta_entrata`,`fk_valuta_uscita`),
  KEY `fk_valuta_entrata` (`fk_valuta_entrata`),
  KEY `fk_valuta_uscita` (`fk_valuta_uscita`),
  KEY `fk_valuta_entrata_2` (`fk_valuta_entrata`),
  KEY `fk_valuta_uscita_2` (`fk_valuta_uscita`),
  CONSTRAINT `tasso_valuta_entrata` FOREIGN KEY (`fk_valuta_entrata`) REFERENCES `valute` (`pk_valuta`),
  CONSTRAINT `tasso_valuta_uscita` FOREIGN KEY (`fk_valuta_uscita`) REFERENCES `valute` (`pk_valuta`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tassi`
--

LOCK TABLES `tassi` WRITE;
/*!40000 ALTER TABLE `tassi` DISABLE KEYS */;
INSERT INTO `tassi` VALUES (43,1,2,1.095,''),(44,2,1,1.074,'\0'),(45,1,19,1.08,''),(46,19,1,1.233,'\0'),(48,21,1,2.1,'\0'),(50,1,21,3.1,'');
/*!40000 ALTER TABLE `tassi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valute`
--

DROP TABLE IF EXISTS `valute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `valute` (
  `pk_valuta` int(11) NOT NULL AUTO_INCREMENT,
  `descrizione` varchar(255) NOT NULL,
  `simbolo` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`pk_valuta`),
  UNIQUE KEY `descrizione` (`descrizione`),
  UNIQUE KEY `simbolo` (`simbolo`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valute`
--

LOCK TABLES `valute` WRITE;
/*!40000 ALTER TABLE `valute` DISABLE KEYS */;
INSERT INTO `valute` VALUES (1,'Franco','CHF'),(2,'Euro','â‚¬'),(19,'Dollaro','$'),(21,'Prova','P'),(26,'fassooo','ff');
/*!40000 ALTER TABLE `valute` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-21 22:40:05
