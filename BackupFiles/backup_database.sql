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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operazioni`
--

LOCK TABLES `operazioni` WRITE;
/*!40000 ALTER TABLE `operazioni` DISABLE KEYS */;
INSERT INTO `operazioni` VALUES (6,'2016-02-25 20:29:03',19,1,1,0.81103,1.233,201602000000001,'');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operazioni_oro`
--

LOCK TABLES `operazioni_oro` WRITE;
/*!40000 ALTER TABLE `operazioni_oro` DISABLE KEYS */;
INSERT INTO `operazioni_oro` VALUES (24,1,'2016-02-14 15:44:00',3,2,34,102),(25,2,'2016-02-14 15:44:56',24,1,34,816),(26,3,'2016-02-23 21:57:47',1,1,1,1),(27,4,'2016-02-26 20:21:18',2,2,2,4),(28,5,'2016-02-26 20:21:27',2,3,2,4),(29,6,'2016-02-26 20:21:38',3,3,3,9);
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

-- Dump completed on 2016-02-26 23:38:44
