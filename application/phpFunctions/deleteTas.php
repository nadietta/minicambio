<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 23/01/2016
 * Time: 17:02
 */
include "../../connessione.php";

if (isset($_POST['idTas'])){
    $idTas = $_POST['idTas'];
}
else{
    $idTas = "";
}


if (isset($idTas)){
    $query = "DELETE FROM TASSI WHERE pk_tasso = '$idTas'";

    $retval = mysqli_query($conn, $query);
    if(! $retval ) {
        die('Impossibile Aggiornare i dati' . mysqli_error());
    }
}