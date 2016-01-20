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

$valuta_da="";
$valuta_a="";
$tasso="";
$valuta_da=$_POST['valuta_da'];
$valuta_a=$_POST['valuta_a'];
$tasso=$_POST['tasso'];

$query = mysqli_query($conn,
            "INSERT INTO `tassi`(pk_tasso, fk_valuta_entrata, fk_valuta_uscita, valore, tipo_operazione)
                    VALUES(NULL, $valuta_da,$valuta_a,$tasso,'')");
if(mysqli_affected_rows($conn)){
    $risultato['msg']="Inserimento avventuo con successo";
}
else $risultato['msg']="Errore, riprovare";

echo json_encode($risultato);


