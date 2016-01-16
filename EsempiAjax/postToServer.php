<?php
/**
 * Created by PhpStorm.
 * User: Nadia
 * Date: 16/01/2016
 * Time: 11:26
 */
$risultato = array();

if (isset($_POST['selectedOption'])){
    $selectedOption = $_POST['selectedOption'];
}
else{
    $selectedOption = "";
}

if (isset($_POST['altroValore'])){
    $altroValore = $_POST['altroValore'];
}
else{
    $altroValore = "";
}

if ($selectedOption && $altroValore){
    $risultato['altro'] = $altroValore;
    $risultato['mySelect'] = "";

    //Ci fai query o quello che vuoi e li assegni. Io li assegno a cazzo :-)
    switch ($selectedOption){
        case '1':
            $risultato['mySelect'] = "Primo Valore";
            break;
        case '2':
            $risultato['mySelect'] = "Secondo Valore";
            break;
        case '3':
            $risultato['mySelect'] = "Terzo Valore";
            break;
        default:
            $risultato['mySelect'] = "Primo Valore";
    }
}

echo json_encode($risultato);