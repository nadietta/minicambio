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
  KEY `fk_valuta_entrata` (`fk_valuta_entrata`),
  KEY `fk_valuta_uscita` (`fk_valuta_uscita`),
  CONSTRAINT `operazione_valuta_entrata` FOREIGN KEY (`fk_valuta_entrata`) REFERENCES `valute` (`pk_valuta`),
  CONSTRAINT `operazione_valuta_uscita` FOREIGN KEY (`fk_valuta_uscita`) REFERENCES `valute` (`pk_valuta`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operazioni`
--

LOCK TABLES `operazioni` WRITE;
/*!40000 ALTER TABLE `operazioni` DISABLE KEYS */;
INSERT INTO `operazioni` VALUES (4,'2016-01-21 14:59:02',1,10,2,9.13242,1.095,201601000000000,''),(5,'2016-01-21 15:22:30',1,19,2,17.3516,1.095,201601000000001,''),(6,'2016-01-21 15:23:50',1,10,2,9.13242,1.095,201601000000002,''),(7,'2016-01-22 12:27:17',1,10,19,9.30233,1.075,201601000000003,''),(8,'2016-01-22 12:27:17',1,9.30233,2,10.0465,1.08,201601000000004,''),(9,'2016-01-22 12:28:02',2,9.30233,1,10.0465,1.08,201601000000005,''),(10,'2016-01-22 12:28:02',1,10,19,9.30233,1.075,201601000000006,''),(11,'2016-02-16 09:51:51',1,1,2,1.095,1.095,201602000000001,'\0'),(12,'2016-02-16 09:53:17',1,1,2,1.095,1.095,201602000000002,'\0'),(13,'2016-02-16 09:53:42',2,1,1,0.930233,1.075,201602000000003,''),(14,'2016-02-16 09:54:10',1,1,2,1.095,1.095,201602000000004,'\0'),(15,'2016-02-16 10:00:50',1,1,2,1.095,1.095,201602000000005,'\0'),(16,'2016-02-16 10:12:23',1,1,2,1.095,1.095,201602000000006,'\0'),(17,'2016-02-16 10:37:51',2,1,1,0.930233,1.075,201602000000007,''),(18,'2016-02-16 10:37:51',1,0.930233,19,1.00465,1.08,201602000000008,'\0'),(19,'2016-02-26 11:23:03',1,2,19,2.16,1.08,201602000000009,'\0'),(20,'2016-02-26 11:30:24',19,2,1,1.63,1.23,201602000000010,''),(21,'2016-02-26 11:30:24',1,1.63,2,1.78,1.095,201602000000011,'\0'),(22,'2016-02-26 11:37:10',1,1,2,1.09,1.095,201602000000012,'\0'),(23,'2016-02-26 11:38:45',1,1,19,1.08,1.08,201602000000013,'\0'),(24,'2016-02-26 11:39:18',2,1,1,0.93,1.075,201602000000014,''),(25,'2016-02-26 11:42:35',2,1,1,0.93,1.075,201602000000015,''),(26,'2016-02-26 11:44:29',1,2,19,2.16,1.08,201602000000016,'\0'),(27,'2016-02-26 11:46:29',2,2,1,1.86,1.075,201602000000017,''),(28,'2016-02-26 11:46:44',1,2,2,2.19,1.095,201602000000018,'\0'),(29,'2016-02-26 11:47:03',1,2,2,2.19,1.095,201602000000019,'\0'),(30,'2016-02-26 11:48:01',1,1,2,1.09,1.095,201602000000020,'\0'),(31,'2016-02-26 11:50:50',1,1,19,1.08,1.08,201602000000021,'\0'),(32,'2016-02-26 11:51:16',1,1,2,1.09,1.095,201602000000022,'\0'),(33,'2016-02-26 11:52:35',2,2,1,1.86,1.075,201602000000023,''),(34,'2016-02-26 11:52:35',1,1.86,19,2.01,1.08,201602000000024,'\0'),(35,'2016-02-26 11:53:15',2,2,1,1.86,1.075,201602000000025,'');
/*!40000 ALTER TABLE `operazioni` ENABLE KEYS */;
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
  KEY `fk_valuta_entrata` (`fk_valuta_entrata`),
  KEY `fk_valuta_uscita` (`fk_valuta_uscita`),
  KEY `fk_valuta_entrata_2` (`fk_valuta_entrata`),
  KEY `fk_valuta_uscita_2` (`fk_valuta_uscita`),
  CONSTRAINT `tasso_valuta_entrata` FOREIGN KEY (`fk_valuta_entrata`) REFERENCES `valute` (`pk_valuta`),
  CONSTRAINT `tasso_valuta_uscita` FOREIGN KEY (`fk_valuta_uscita`) REFERENCES `valute` (`pk_valuta`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tassi`
--

LOCK TABLES `tassi` WRITE;
/*!40000 ALTER TABLE `tassi` DISABLE KEYS */;
INSERT INTO `tassi` VALUES (43,1,2,1.095,''),(44,2,1,1.075,'\0'),(45,1,19,1.08,''),(46,19,1,1.23,'\0');
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
  `simbolo` varchar(5) NOT NULL,
  PRIMARY KEY (`pk_valuta`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valute`
--

LOCK TABLES `valute` WRITE;
/*!40000 ALTER TABLE `valute` DISABLE KEYS */;
INSERT INTO `valute` VALUES (1,'Franco','CHF'),(2,'Euro','euro'),(19,'Dollaro','$');
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

-- Dump completed on 2016-02-26 14:19:27
