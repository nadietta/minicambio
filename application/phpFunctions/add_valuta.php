<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 17:12
 *
 *
 */

$risultato = array();
include "../../connessione.php";

if (isset($_POST['valNome'])){
    $nome_valuta = $_POST['valNome'];
}
else{
    $nome_valuta = "";
}

if (isset($_POST['valSimbolo'])){
    $simbolo_valuta = $_POST['valSimbolo'];
}
else{
    $simbolo_valuta = "";
}

//TODO: Controllare slashes e apici prima di scrivere sul db
if (isset($nome_valuta) && isset($simbolo_valuta)){
    $query = mysqli_query($conn, "INSERT INTO `valute`(pk_valuta, descrizione, simbolo) VALUES (NULL, '$nome_valuta','$simbolo_valuta')");
    if(!mysqli_affected_rows($conn)){
        $risultato['err']="Errore inserimento";
    }
}
echo json_encode($risultato);


