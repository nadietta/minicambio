<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */
ini_set("error_reporting", 0);
include("../../connessione.php");
$risultato = array();
if (isset($_POST['idTas'])){
    $idTas = $_POST['idTas'];
}
else{
    $idTas = "";
}

if (isset($_POST['valTasso'])){
    $valTasso = $_POST['valTasso'];
}
else{
    $valTasso = "";
}



if (isset($idTas) && isset($valTasso)){
    $query ="UPDATE TASSI SET valore = '$valTasso'
                    WHERE pk_tasso = '$idTas'";

    $retval = mysqli_query($conn, $query);
    if(! $retval ) {
        $risultato['errore']='Impossibile aggiornare i dati';
    } else{
    $risultato['messaggio']='Aggiornamento avvenuto con successo';}
}
echo json_encode($risultato);