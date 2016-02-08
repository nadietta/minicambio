<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 23/01/2016
 * Time: 17:02
 */
include "../../connessione.php";

if (isset($_POST['idOp'])){
    $idOp = $_POST['idOp'];
}
else{
    $idOp = "";
}

$retval = false;

if (isset($idOp)){

    $querySelect = "SELECT cod_op FROM OPERAZIONI WHERE pk_operazione = '$idOp'";
    $resultSelect = mysqli_fetch_assoc(mysqli_query($conn, $querySelect));
    $codOp = $resultSelect['cod_op'];

    if ($codOp){

        mysqli_begin_transaction();

        $queryDelete = "DELETE FROM operazioni WHERE pk_operazione = '$idOp'";
        $queryUpdate = "UPDATE operazioni SET cod_op = cod_op-1 WHERE cod_op > '$codOp' AND SUBSTRING(cod_op,1,6) = SUBSTRING('$codOp',1,6)";

        $retvalDelete = mysqli_query($conn, $queryDelete);
        $retvalUpdate = mysqli_query($conn, $queryUpdate);

        if ($retvalDelete && $retvalUpdate){
            mysqli_commit();
            $retval = true;
            $risultato['messaggio']="Cancellazione avvenuta con successo";
        }
        else{
            mysqli_rollback();
            $risultato['errore']="Errore, riprovare";
        }
    }

}

echo $retval;