<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */

include("../../connessione.php");

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

//TODO: Controllare slashes e apici prima di scrivere sul db

if (isset($idTas) && isset($valTasso)){
    $query ="UPDATE TASSI SET valore = '$valTasso'
                    WHERE pk_tasso = '$idTas'";

    $retval = mysqli_query($conn, $query);
    if(! $retval ) {
        die('Impossibile Aggiornare i dati' . mysqli_error());
    }
    echo "Updated data successfully\n";
}
