<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 07/02/2016
 * Time: 20:26
 */
ini_set("error_reporting", 0);
include("../../connessione.php");

//$query ="SELECT max(pk_backup) AS id, data_backup FROM `backup`";
$query = "SELECT pk_backup as id, data_backup from backup ORDER BY pk_backup DESC LIMIT 1";

if($result = mysqli_fetch_assoc(mysqli_query($conn, $query))){
    $lastBackup = $result['id'];
    $dataBackup = $result['data_backup'];
}

echo $dataBackup;