<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 07/02/2016
 * Time: 20:26
 */
ini_set("error_reporting", 0);
include("../../connessione.php");

$query ="SELECT max(cod_op) AS ultimaop FROM `operazioni`";
if($result = mysqli_fetch_assoc(mysqli_query($conn, $query))){
$lastOp = $result['ultimaop'];} else $lastOp=-1;

echo $lastOp;