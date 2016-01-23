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

$valuta = array();

if ($idVal){
    $query ="SELECT * FROM valute WHERE pk_valuta = '$idVal'";

    $result = mysqli_fetch_assoc(mysqli_query($conn, $query));
    $valuta['id'] = $result['pk_valuta'];
    $valuta['nome_valuta'] = $result['descrizione'];
    $valuta['simbolo_valuta'] = $result['simbolo'];
}

echo json_encode($valuta);
