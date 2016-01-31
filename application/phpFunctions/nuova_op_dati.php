<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */

include("../../connessione.php");
$id_franco=1;
//$valuta_da="2";
//$valuta_a="19";
$tasso="";
$valuta_da=$_POST['valuta_da'];
$valuta_a=$_POST['valuta_a'];
//$cod="201602";
$cod=$_POST['cod'];
$risultato=array();
$tipo_op=-1;
if($id_franco==$valuta_da){
    $tipo_op=0;
}
if($id_franco==$valuta_a){
    $tipo_op=1;
}

$risultato['tipo_op']=$tipo_op;
if($tipo_op!='-1') {
    $query = "SELECT tassi.valore as tasso, tassi.tipo_operazione as tipo
              FROM tassi
              WHERE tassi.fk_valuta_entrata= $valuta_da AND tassi.fk_valuta_uscita= $valuta_a ";

    $results_db = mysqli_affected_rows($conn);

    if ($result = mysqli_query($conn, $query)) {
        $row = $result->fetch_row();
        $risultato['tasso'] = $row[0];

        //  $risultato['tipo_op']=$row[1];
    }
}
else{

    $query = "SELECT tassi.valore as tasso, tassi.tipo_operazione as tipo, descrizione as descrizione
              FROM tassi, valute
              WHERE tassi.fk_valuta_entrata= $valuta_da AND tassi.fk_valuta_uscita=$id_franco AND valute.pk_valuta=$valuta_da";

    $results_db = mysqli_affected_rows($conn);

    if ($result = mysqli_query($conn, $query)) {
        $row = $result->fetch_row();
        $risultato['tasso'] = $row[0];
        $risultato['valuta_1']= $row[2];

    }
    $query = "SELECT tassi.valore as tasso, tassi.tipo_operazione as tipo,  descrizione as descrizione
              FROM tassi, valute
              WHERE tassi.fk_valuta_entrata=$id_franco AND tassi.fk_valuta_uscita= $valuta_a
              AND valute.pk_valuta=$valuta_a";

    $results_db = mysqli_affected_rows($conn);

    if ($result = mysqli_query($conn, $query)) {
        $row = $result->fetch_row();
        $risultato['tasso_due'] = $row[0];
        $risultato['valuta_2']= $row[2];


    }



}

    $query_cod = " SELECT cod_op, SUBSTRING(cod_op,7,9) as cod_2
              FROM operazioni
              WHERE SUBSTRING(cod_op,1,6) = '$cod'
              ORDER BY pk_operazione DESC LIMIT 1";
    $result_2 = mysqli_query($conn, $query_cod);
    $row_2 = $result_2->fetch_row();
    $cod_r = $row_2['0'];
    $cod_2 = $row_2['1'];

    if ($cod_r == null) {

        $defCod = $cod;

        $cod = (string)$defCod . "000000001";
        $cod_2 = (string)$defCod . "000000002";

    }
    else {
        //$cod=(($cod_r));
        $n = (intval($cod_2));
        $n++;
        $n_2=$n+1;
        $num = (string)$n;
        $seconda_op = (string)$n_2;
        $cod_2=$cod;
        for ($i = strlen($num); $i < 9; $i++) {
            $cod .= '0';

        }
        for ($i = strlen($seconda_op); $i < 9; $i++) {
            $cod_2 .= '0';

        }
        $cod .= $num;
        $cod_2=$cod_2.''.$seconda_op;
        // $cod++;
        //$cod=(string)$cod;
    }
    $risultato['cod_op'] = $cod;
    $risultato['cod_op_2'] = $cod_2;

$risultato['msg'] = 'ok';
echo json_encode($risultato); //se vuoi stampare ok non hai bisogno del json_encode, quello � solo per passare dati strutturati
