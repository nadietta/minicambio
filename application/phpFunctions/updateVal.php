<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */

include("../../connessione.php");

if (isset($_POST['idVal'])){
    $idVal = $_POST['idVal'];
}
else{
    $idVal = "";
}

if (isset($_POST['valNome'])){
    $valNome = $_POST['valNome'];
}
else{
    $valNome = "";
}

if (isset($_POST['valSimbolo'])){
    $valSimbolo = $_POST['valSimbolo'];
}
else{
    $valSimbolo = "";
}

//TODO: Controllare slashes e apici prima di scrivere sul db

if (isset($idVal) && isset($valNome) && isset($valSimbolo)){
    $query ="UPDATE VALUTE SET descrizione = '$valNome', simbolo = '$valSimbolo'
                    WHERE pk_valuta = '$idVal'";

    $retval = mysqli_query($conn, $query);
    if(! $retval ) {
        die('Impossibile Aggiornare i dati' . mysqli_error());
    }
    echo "Updated data successfully\n";
}
