<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */
ini_set("error_reporting", 0);
include("../../connessione.php");

if (isset($_POST['idTas'])){
    $idTas = $_POST['idTas'];
}
else{
    $idTas = "";
}

$tasso = array();

if ($idTas){
    $query ="SELECT * FROM tassi WHERE pk_tasso = '$idTas'";

    $result = mysqli_fetch_assoc(mysqli_query($conn, $query));
    $tasso['id'] = $result['pk_tasso'];
    $tasso['valutada'] = $result['fk_valuta_entrata'];
    $tasso['valutaa'] = $result['fk_valuta_uscita'];
    $tasso['tasso'] = $result['valore'];
}

echo json_encode($tasso);
