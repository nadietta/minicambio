<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 23/01/2016
 * Time: 17:02
 */
include "../../connessione.php";

if (isset($_POST['idVal'])){
    $idVal = $_POST['idVal'];
}
else{
    $idVal = "";
}


if (isset($idVal)){
    $query = "DELETE FROM VALUTE WHERE pk_valuta = '$idVal'";

    $retval = mysqli_query($conn, $query);
    if(! $retval ) {
        die('Impossibile Aggiornare i dati' . mysqli_error());
    }
}

echo $retval;