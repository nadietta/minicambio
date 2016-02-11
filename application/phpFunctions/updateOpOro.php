<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */

include("../../connessione.php");

if (isset($_POST['idOp'])){
    $idOp = $_POST['idOp'];
}
else{
    $idOp = "";
}

$formData = $_POST['formData'];

function unserializeForm($str) {
    $returndata = array();
    $strArray = explode("&", $str);
    $i = 0;
    foreach ($strArray as $item) {
        $array = explode("=", $item);
        $returndata[$array[0]] = $array[1];
    }
    return $returndata;
}

if(isset($formData))
{
    $risultato = unserializeForm($formData);
    $operazione = $risultato['operazione'];
    $grammi = $risultato['grammi'];
    $karati = $risultato['karati'];
    $prezzo = $risultato['prezzo'];
    $franchi = $risultato['franchi'];
    $query = mysqli_query($conn,
        "UPDATE  `operazioni_oro` SET grammi=$grammi, karati=$karati, prezzo=$prezzo, totale=$franchi WHERE pk_op_oro = $idOp;"
                );
    if(mysqli_affected_rows($conn)){
        $risultato['messaggio']="Modifica avvenuta con successo";
    }
    else {
        $risultato['errore']="Errore, riprovare";


    }
}
else{
    $risultato = array();
    $risultato['errore'] = "Errore dati Form";
}

echo json_encode($risultato);
