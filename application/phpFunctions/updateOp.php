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
if (isset($_POST['idOp'])){
    $idOp = $_POST['idOp'];
}
else{
    $idOp = "";
}

if (isset($_POST['tassoOperazione'])){
    $tassoOperazione = $_POST['tassoOperazione'];
}
else{
    $tassoOperazione = "";
}

if (isset($_POST['entrataOperazione'])){
    $entrataOperazione = $_POST['entrataOperazione'];
}
else{
    $entrataOperazione = "";
}

if (isset($_POST['uscitaOperazione'])){
    $uscitaOperazione = $_POST['uscitaOperazione'];
}
else{
    $uscitaOperazione = "";
}

//TODO: Controllare slashes e apici prima di scrivere sul db

if (isset($idOp) && isset($tassoOperazione) && isset($entrataOperazione) && isset($uscitaOperazione)){
    $query ="UPDATE OPERAZIONI SET importo_entrata = '$entrataOperazione', importo_uscita = '$uscitaOperazione', tasso = '$tassoOperazione'
                    WHERE pk_operazione = '$idOp'";

    $retval = mysqli_query($conn, $query);
    if(! $retval ) {
        $risultato['errore']='Impossibile aggiornare i dati';
    } else{
    $risultato['messaggio']='Aggiornamento avvenuto con successo';}
}
echo json_encode($risultato);