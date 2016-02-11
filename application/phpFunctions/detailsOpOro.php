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

$operazione = array();

if ($idOp){
    $query ="SELECT * FROM operazioni_oro WHERE pk_op_oro= '$idOp'";

    $row = mysqli_fetch_assoc(mysqli_query($conn, $query));

    $operazione['data_op']=$row['data_op'];
    $operazione['cod_op_oro']=$row['cod_op_oro'];
    $operazione['prezzo']=$row['prezzo'];
    $operazione['carati']=$row['carati'];
    $operazione['grammi']=$row['grammi'];
    $operazione['totale']=$row['totale'];
}

echo json_encode($operazione);
