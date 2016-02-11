<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 23/01/2016
 * Time: 17:02
 */
include "../../connessione.php";
ini_set("error_reporting", 0);
if (isset($_POST['idOp'])){
    $idOp = $_POST['idOp'];
}
else{
    $idOp = "";
}

$retval = false;

if (isset($idOp)){

    $querySelect = "SELECT cod_op_oro FROM OPERAZIONI_ORO WHERE pk_op_oro = '$idOp'";
    $resultSelect = mysqli_fetch_assoc(mysqli_query($conn, $querySelect));
    $codOp = $resultSelect['cod_op_oro'];

    if ($codOp){

        mysqli_begin_transaction();

        $queryDelete = "DELETE FROM operazioni_oro WHERE pk_op_oro = '$idOp'";
        $queryUpdate = "UPDATE operazioni_oro SET cod_op_oro = cod_op_oro-1 WHERE cod_op_oro > '$codOp'";

        $retvalDelete = mysqli_query($conn, $queryDelete);
        $retvalUpdate = mysqli_query($conn, $queryUpdate);

        if ($retvalDelete && $retvalUpdate){
            mysqli_commit();
            $retval = true;
            $risultato['messaggio']="Cancellazione avvenuta con successo";
            mysqli_close($conn);
        }
        else{
            mysqli_rollback();
            $risultato['errore']="Errore, riprovare";
        }
    }

}

echo $retval;