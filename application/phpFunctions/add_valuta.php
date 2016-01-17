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

$nome_valuta="";
$simbolo_valuta="";
$nome_valuta=$_POST['nome_valuta'];
$simbolo_valuta=$_POST['simbolo_valuta'];


$query = mysqli_query($conn, "INSERT INTO `valute`(`pk_valuta`, `descrizione`, `simbolo`)
VALUES (NULL, '$nome_valuta','$simbolo_valuta')");
if(mysqli_affected_rows($conn)){
    $risultato['msg']="Inserimento avventuo con successo";
}
else $risultato['msg']="Errore, riprovare";


echo json_encode($risultato);


