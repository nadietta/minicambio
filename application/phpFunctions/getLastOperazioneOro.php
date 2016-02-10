<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 07/02/2016
 * Time: 20:26
 */
include("../../connessione.php");

$query ="SELECT max(cod_op_oro) AS ultimaop FROM `operazioni_oro`";
$result = mysqli_fetch_assoc(mysqli_query($conn, $query));
$lastOp = $result['ultimaop'];

echo $lastOp;