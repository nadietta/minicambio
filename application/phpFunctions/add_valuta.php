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

$risultato['inserimento']=-1;
$risultato['errore']='';
$risultato['messaggio']='';

//TODO: Controllare slashes e apici prima di scrivere sul db
if (isset($nome_valuta) && isset($simbolo_valuta)){
    $query = mysqli_query($conn, "INSERT INTO `valute`(pk_valuta, descrizione, simbolo) VALUES (NULL, '$nome_valuta','$simbolo_valuta')");
    $inserimento = mysqli_affected_rows($conn);

    $risultato['inserimento'] = $inserimento;

    if($inserimento > 0){
        $risultato['messaggio']="Inserimento avvenuto con successo";
    }
    else {
        //$risultato['msg']="Errore, riprovare";
        $errore = mysqli_errno($conn);
        if($errore=='1062'){
            $risultato['errore']="Impossibile inserire due volte la stessa Valuta";
            $risultato['messaggio']="Valuta esistente, puoi modificarla cliccando Modifica";
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


