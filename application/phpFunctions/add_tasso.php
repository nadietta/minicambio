<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 17:12
 *
 *
 */
ini_set("error_reporting", 0);
$risultato = array();

include "../../connessione.php";
$id_franco=1;
$valuta_da="";
$valuta_a="";
$tasso="";
$valuta_da=$_POST['valuta_da'];
$valuta_a=$_POST['valuta_a'];
$tasso=$_POST['tasso'];
$tipo_op=-1;

if($id_franco==$valuta_da){
 $tipo_op=1;
}
if($id_franco==$valuta_a){
    $tipo_op=0;
}

$risultato['inserimento']=-1;
$risultato['errore']='';
$risultato['messaggio']='';

if (isset($valuta_da) && isset($valuta_a) && isset($tasso) && ($tipo_op != -1)){
    $query = mysqli_query($conn,
        "INSERT INTO `tassi`(pk_tasso, fk_valuta_entrata, fk_valuta_uscita, valore, tipo_operazione)
                    VALUES(NULL, $valuta_da,$valuta_a,$tasso,$tipo_op)");

    $inserimento = mysqli_affected_rows($conn);
    $risultato['inserimento'] = $inserimento;

    if($inserimento > 0){
        $risultato['messaggio']="Inserimento avvenuto con successo";
    }
    else {
        $errore = mysqli_errno($conn);
        if($errore=='1062'){
            $risultato['errore']="Impossibile inserire due volte un tasso per le stesse valute";
            $risultato['messaggio']="Tasso esistente, puoi modificarlo cliccando Modifica";
        }
        else{
            $risultato['errore']='Errore';
            $risultato['messaggio']='Errore';
        }
    }
}
else{
    $risultato['errore']='Errore variabili in Ingresso';
    $risultato['messaggio']='Variabili Mancanti';
}

echo json_encode($risultato);