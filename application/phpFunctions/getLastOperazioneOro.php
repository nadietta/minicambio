<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 07/02/2016
 * Time: 20:26
 */
ini_set("error_reporting", 0);
include("../../connessione.php");
$datascelta=$_POST['datascelta'];
$data = DateTime::createFromFormat('d/m/Y H:i', $datascelta);
$timestamp=$data->format('Y-m-d H:i');
$query ="SELECT max(cod_op_oro) AS ultimaop FROM `operazioni_oro` WHERE data_op <='$timestamp'";
if($result = mysqli_fetch_assoc(mysqli_query($conn, $query))) {
    $lastOp = ($result['ultimaop']+1);
} else 1;

echo $lastOp;