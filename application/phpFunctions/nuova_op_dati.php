<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 15/01/2016
 * Time: 20:49
 */

include("../../connessione.php");
$id_franco=1;
$valuta_da="";
$valuta_a="";
$tasso="";
$valuta_da=$_POST['valuta_da'];
$valuta_a=$_POST['valuta_a'];
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

$query ="SELECT tassi.valore as tasso, tassi.tipo_operazione as tipo
              FROM tassi
              WHERE tassi.fk_valuta_entrata= $valuta_da AND tassi.fk_valuta_uscita= $valuta_a ";

$results_db=mysqli_affected_rows($conn);

if ($result =  mysqli_query($conn,$query)) {
    $row = $result->fetch_row();
    $risultato['tasso']=$row[0];
  //  $risultato['tipo_op']=$row[1];
}


$query_cod =" SELECT cod_op, SUBSTRING(cod_op,7,9) as cod_2
              FROM operazioni
              WHERE SUBSTRING(cod_op,1,6) = '$cod'
              ORDER BY pk_operazione DESC LIMIT 1";
$result_2 =  mysqli_query($conn,$query_cod);
$row_2 = $result_2->fetch_row();
$cod_r=$row_2['0'];
$cod_2=$row_2['1'];

if($cod_r ==null){

    $cod=(string)$cod."000000001";


}else {
    //$cod=(($cod_r));
    $n=(intval($cod_2));
    $n++;
    $num=(string)$n;
    for($i=strlen($num); $i<9;$i++){
        $cod.='0';

    }
    $cod.=$num;
   // $cod++;
    //$cod=(string)$cod;
}
$risultato['msg']='ok';
$risultato['cod_op']=$cod;


echo json_encode($risultato); //se vuoi stampare ok non hai bisogno del json_encode, quello è solo per passare dati strutturati
