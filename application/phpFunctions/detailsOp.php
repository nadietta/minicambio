<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */
ini_set("error_reporting", 0);
include("../../connessione.php");

if (isset($_POST['idOp'])){
    $idOp = $_POST['idOp'];
}
else{
    $idOp = "";
}

$operazione = array();

if ($idOp){
    $query ="SELECT tipo_operazione, DATE_FORMAT(data_op,'%d/%m/%Y') as data_op, v1.descrizione as valuta_entrata, importo_entrata,
            v2.descrizione as valuta_uscita, importo_uscita, tasso as optasso FROM operazioni, valute v1, valute v2
          WHERE fk_valuta_entrata = v1.pk_valuta AND  fk_valuta_uscita = v2.pk_valuta AND pk_operazione='$idOp'";

    $result = mysqli_fetch_assoc(mysqli_query($conn, $query));
    $operazione['tipo_op'] = $result['tipo_operazione'];
    $operazione['data_op'] = $result['data_op'];
    $operazione['valuta_entrata'] = $result['valuta_entrata'];
    $operazione['importo_entrata'] = $result['importo_entrata'];
    $operazione['valuta_uscita'] = $result['valuta_uscita'];
    $operazione['importo_uscita'] = $result['importo_uscita'];
    $operazione['optasso'] = $result['optasso'];
}

echo json_encode($operazione);
