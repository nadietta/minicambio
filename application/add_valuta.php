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
/**
include "../connessione.php";
$nome_valuta="";
$simbolo_valuta="";
$nome_valuta=$_POST['nome_valuta'];
$simbolo_valuta=$_POST['simbolo_valuta'];
print("nome_valiuta".$nome_valuta);

$query = mysqli_query($conn, "INSERT INTO valute VALUE (null, $nome_valuta,$simbolo_valuta)");
if(mysqli_affected_rows($conn)){
    $msg="Inserimento avventuo con successo";
}
else $msg="Errore, riprovare";
echo $msg;**/
$risultato[msg]="ok";
echo json_encode($risultato);


